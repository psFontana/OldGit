import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api"; // Caminho corrigido: removido '.js' se não for necessário ou ajustado conforme a estrutura real

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // Função assíncrona para lidar com o envio do formulário de login.
  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página.
    try {
      // Envia uma requisição POST para o endpoint de login do backend com email e senha.
      const response = await api.post("/usuario/login", { email, senha });

      // Salva o token JWT recebido do backend no localStorage.
      localStorage.setItem("token", response.data.token);

      // Salva o perfil do usuário recebido do backend no localStorage.
      // Esta é a linha crucial que foi adicionada/modificada.
      localStorage.setItem("perfil", response.data.perfil); // <-- Adicionado: Salva o perfil

      // Redireciona o usuário para a página Home após o login bem-sucedido.
      navigate("/Home");
    } catch (error) {
      // Em caso de erro (ex: credenciais inválidas, erro de rede), exibe um alerta.
      // É uma boa prática logar o erro no console para depuração.
      console.error("Erro no login:", error);
      alert("Login falhou. Verifique seu e-mail e senha.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "25rem" }} className="rounded-lg shadow-lg">
        {" "}
        {/* Adicionado classes de estilo */}
        <Card.Header className="bg-primary text-white rounded-t-lg">
          {" "}
          {/* Estilo para o cabeçalho */}
          <h5 className="mb-0 text-center">Login</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-md" // Estilo para o input
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="rounded-md" // Estilo para o input
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 rounded-md shadow"
            >
              {" "}
              {/* Estilo para o botão */}
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
