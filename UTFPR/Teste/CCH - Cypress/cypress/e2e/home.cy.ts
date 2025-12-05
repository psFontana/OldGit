/// <reference types="cypress" />

describe("Página inicial - Tempero Caseiro", () => {
  it("Deve carregar a página e liberar acesso ao cardápio", () => {
    // 1. Visita a página
    cy.visit("https://menuprime.com.br/tempero-caseiro-delivery");

    // 2. Aguarda o primeiro modal aparecer (o de "Bem vindo!" com "Não quero me cadastrar")
    // Usamos uma classe específica do modal para garantir que ele está visível
    cy.get("mat-dialog-container").should("be.visible"); // Aguarda qualquer modal aparecer

    // Clica em "Não quero me cadastrar" (usa o texto exato do h3, mas força o clique se necessário)
    cy.contains("h3", "Não quero me cadastrar").click({ force: true });

    // 3. Aguarda o segundo modal aparecer (o de "Loja fechada" com "Visualizar cardápio")
    // Como há dois modais, esperamos o anterior sumir e o novo aparecer
    cy.get("mat-dialog-container").should("have.length", 1); // Garante que só um modal está aberto agora
    cy.contains("h2", "Loja fechada").should("be.visible"); // Confirma que o modal correto apareceu

    // Clica em "Visualizar cardápio" (usa o texto do botão)
    cy.contains("Visualizar cardápio").click({ force: true });

    // 4. Aguarda os modais sumirem completamente
    cy.get("mat-dialog-container").should("not.exist");

    // 5. Confirma que o cardápio carregou (verifica se "Mini" está visível)
    cy.contains("Mini").should("be.visible");
  });
});
