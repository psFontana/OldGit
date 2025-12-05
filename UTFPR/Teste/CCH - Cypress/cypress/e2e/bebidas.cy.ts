/// <reference types="cypress" />

describe("Extração de Bebidas - Tempero Caseiro", () => {
  it("Deve coletar todas as bebidas e salvar em JSON por categoria", () => {
    // Objeto para armazenar os dados das bebidas por categoria
    const bebidasPorCategoria = {
      refrigerantes: [],
      sucos: [],
      aguas: [],
    };

    // 1. Visita a página e fecha os modais (reutilizando o fluxo dos testes anteriores)
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

    // 2. Define os títulos das seções de bebidas e mapeia para as chaves do objeto
    const titulosBebidas = [
      { titulo: "Refrigerantes", chave: "refrigerantes" },
      { titulo: "Sucos", chave: "sucos" },
      { titulo: "Água", chave: "aguas" },
    ];

    // 3. Para cada título de seção, encontra a seção correspondente, rola até ela e coleta os itens
    titulosBebidas.forEach(({ titulo, chave }) => {
      // Encontra a seção pelo título do h1
      cy.get(".secao h1").contains(titulo).parent(".secao").as("secaoAtual"); // Alias para a seção

      // Rola até a seção e garante que está visível
      cy.get("@secaoAtual").scrollIntoView().should("be.visible");

      // Seleciona todos os itens de bebida dentro da seção
      cy.get("@secaoAtual")
        .find(".div-cards app-default-item")
        .each((item) => {
          // Extrai o nome (título h2)
          const descricao = Cypress.$(item).find("h2").text().trim();

          // Extrai o preço (span dentro do h4)
          const precoTexto = Cypress.$(item).find("span").text().trim(); // Ex: "R$ 13,50"
          const preco =
            parseFloat(precoTexto.replace("R$ ", "").replace(",", ".")) || 0;

          // Monta o objeto da bebida
          const bebida = {
            descricao,
            preco,
          };

          // Adiciona ao array da categoria correspondente
          bebidasPorCategoria[chave].push(bebida);
        });
    });

    // 4. Após processar todas as seções, salva o objeto em um arquivo JSON
    cy.then(() => {
      cy.writeFile(
        "cypress/results/bebidas.json",
        JSON.stringify(bebidasPorCategoria, null, 2)
      ); // Salva na raiz do projeto
      cy.log("Dados das bebidas salvos em bebidas.json:", bebidasPorCategoria); // Log para debug
    });
  });
});
