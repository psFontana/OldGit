/// <reference types="cypress" />

describe("Extração de Marmitas - Tempero Caseiro", () => {
  it("Deve coletar todas as marmitas e salvar em JSON", () => {
    // Array para armazenar os dados das marmitas
    const marmitas = [];

    // 1. Visita a página e fecha os modais (reutilizando o fluxo do home.cy.ts)
    cy.visit("https://menuprime.com.br/tempero-caseiro-delivery");

    // Aguarda o primeiro modal aparecer
    cy.get("mat-dialog-container").should("be.visible");

    // Clica em "Não quero me cadastrar"
    cy.contains("h3", "Não quero me cadastrar").click({ force: true });

    // Aguarda o segundo modal aparecer
    cy.get("mat-dialog-container").should("have.length", 1);
    cy.contains("h2", "Loja fechada").should("be.visible");

    // Clica em "Visualizar cardápio"
    cy.contains("Visualizar cardápio").click({ force: true });

    // Aguarda os modais sumirem
    cy.get("mat-dialog-container").should("not.exist");

    // 2. Rola até a seção "Marmita" e garante que está visível
    cy.get("#Mar7").scrollIntoView().should("be.visible"); // Usa o ID da seção

    // 3. Seleciona todos os cards de marmita dentro da seção
    cy.get("#Mar7 .div-cards app-default-item")
      .each((item) => {
        // Extrai o nome (título h2)
        const descricao = Cypress.$(item).find("h2").text().trim();

        // Extrai a descrição completa (h4)
        const descricaoCompleta = Cypress.$(item)
          .find("h4")
          .first()
          .text()
          .trim();

        // Parseia a descrição para extrair qtdCarne, qtdGuarnicao e embalagem
        let qtdCarne = 0;
        let qtdGuarnicao = 0;
        let embalagem = "N/A";

        // Divide a descrição por linhas (\n) e processa
        const linhas = descricaoCompleta
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line);
        linhas.forEach((linha) => {
          if (linha.includes("carne")) {
            qtdCarne = parseInt(linha.split(" ")[0]) || 0; // Ex: "1 carne" -> 1
          } else if (linha.includes("guarnições")) {
            qtdGuarnicao = parseInt(linha.split(" ")[0]) || 0; // Ex: "2 guarnições" -> 2
          } else if (linha.includes("Embalagem")) {
            embalagem = linha.replace("Embalagem ", "").trim(); // Ex: "Embalagem 500ml" -> "500ml"
          }
        });

        // Ajuste especial para "Repartição": define qtdCarne e qtdGuarnicao como 2 por padrão
        if (descricao === "Repartição (com divisória)") {
          qtdCarne = 2;
          qtdGuarnicao = 2;
        }

        // Extrai o preço (span dentro do h4)
        const precoTexto = Cypress.$(item).find("span").text().trim(); // Ex: "R$ 16,00"
        const preco =
          parseFloat(precoTexto.replace("R$ ", "").replace(",", ".")) || 0;

        // Monta o objeto da marmita
        const marmita = {
          descricao,
          preco,
          qtdCarne,
          qtdGuarnicao,
          embalagem,
        };

        // Adiciona ao array
        marmitas.push(marmita);
      })
      .then(() => {
        // 4. Após processar todos os itens, salva o array em um arquivo JSON
        cy.writeFile(
          "cypress/results/marmitas.json",
          JSON.stringify(marmitas, null, 2)
        ); // Salva na raiz do projeto (ajuste o caminho se necessário)
        cy.log("Dados das marmitas salvos em marmitas.json:", marmitas); // Log para debug
      });
  });
});
