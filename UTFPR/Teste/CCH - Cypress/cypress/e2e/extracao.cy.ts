/// <reference types="cypress" />

describe("Extração Final - Cardápio Completo", () => {
  it("Deve gerar o cardápio completo unindo marmitas, guarnições e bebidas", () => {
    // Caminhos dos arquivos gerados pelos outros testes
    const caminhoMarmitas = "cypress/results/marmitas.json";
    const caminhoGuarnicoes = "cypress/results/guarnicoes.json";
    const caminhoBebidas = "cypress/results/bebidas.json";

    // Objetos que receberão os dados
    let marmitas: any = [];
    let guarnicoes: any = [];
    let modificadores: any = [];
    let bebidas: any = [];

    // 1️⃣ Lê o arquivo de marmitas
    cy.readFile(caminhoMarmitas).then((dados) => {
      marmitas = dados;
    });

    // 2️⃣ Lê o arquivo de guarnições
    cy.readFile(caminhoGuarnicoes).then((dados) => {
      guarnicoes = dados;
    });

    // 3️⃣ Lê o arquivo de bebidas
    cy.readFile(caminhoBebidas).then((dados) => {
      bebidas = dados;
    });

    // 4️⃣ Depois de carregar tudo, monta o JSON final
    cy.then(() => {
      const jsonFinal = {
        marmitas,
        guarnicoes,
        bebidas,
      };

      // Salva organizadamente
      cy.writeFile("cypress/results/cardapio.json", jsonFinal, {
        flag: "w",
      });

      cy.log("Cardápio completo salvo em cypress/results/cardapio.json");
    });
  });
});
