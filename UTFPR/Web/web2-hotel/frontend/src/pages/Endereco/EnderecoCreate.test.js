import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EnderecoCreate from "./EnderecoCreate";
import api from "../../services/api";
// Não importe BrowserRouter aqui se você for mockar o módulo completo

// Mock do módulo de API para controlar as respostas das requisições
jest.mock("../../services/api");

// Mock do useNavigate para evitar erros de navegação em testes
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("EnderecoCreate", () => {
  // Limpa os mocks antes de cada teste para garantir que não haja interferência entre eles
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza o formulário de cadastro de endereço", () => {
    render(
      <Router>
        <EnderecoCreate />
      </Router>
    );

    expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Complemento/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cadastrar/i })
    ).toBeInTheDocument();
  });

  test("permite preencher os campos do formulário", () => {
    render(
      <Router>
        <EnderecoCreate />
      </Router>
    );

    const cepInput = screen.getByLabelText(/CEP/i);
    const numeroInput = screen.getByLabelText(/Número/i);
    const complementoInput = screen.getByLabelText(/Complemento/i);

    fireEvent.change(cepInput, { target: { value: "12345-678" } });
    fireEvent.change(numeroInput, { target: { value: "123" } });
    fireEvent.change(complementoInput, { target: { value: "Apto 101" } });

    expect(cepInput).toHaveValue("12345-678");
    expect(numeroInput).toHaveValue("123");
    expect(complementoInput).toHaveValue("Apto 101");
  });

  test("chama a API e navega para a lista de endereços em caso de sucesso", async () => {
    // Simula uma resposta de sucesso da API
    api.post.mockResolvedValueOnce({ data: {} });

    render(
      <Router>
        <EnderecoCreate />
      </Router>
    );

    const cepInput = screen.getByLabelText(/CEP/i);
    const numeroInput = screen.getByLabelText(/Número/i);
    const complementoInput = screen.getByLabelText(/Complemento/i);
    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });

    fireEvent.change(cepInput, { target: { value: "12345-678" } });
    fireEvent.change(numeroInput, { target: { value: "123" } });
    fireEvent.change(complementoInput, { target: { value: "Apto 101" } });

    fireEvent.click(submitButton);

    // Espera até que a chamada da API seja resolvida
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith("/endereco", {
        cep: "12345-678",
        numero: "123",
        complemento: "Apto 101",
      });
      // Verifica se a navegação foi chamada corretamente
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/endereco/list");
    });
  });

  test("exibe um alerta em caso de erro na chamada da API", async () => {
    // Simula uma resposta de erro da API
    api.post.mockRejectedValueOnce(new Error("Erro de teste"));
    // Mocka a função alert para capturar o que é exibido
    jest.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <Router>
        <EnderecoCreate />
      </Router>
    );

    const cepInput = screen.getByLabelText(/CEP/i);
    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });

    fireEvent.change(cepInput, { target: { value: "12345-678" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(1);
      // Verifica se o alerta foi chamado com a mensagem correta
      expect(window.alert).toHaveBeenCalledWith("Erro ao cadastrar endereço.");
    });
  });
});
