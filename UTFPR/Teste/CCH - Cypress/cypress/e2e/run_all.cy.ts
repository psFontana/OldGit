/// <reference types="cypress" />

import "./marmitas.cy";
import "./guarnicoes.cy";
import "./bebidas.cy";
import "./extracao.cy";

describe("Rodar tudo em ordem", () => {
  it("Executa todo o pipeline completo", () => {
    cy.log("Pipeline iniciado");
  });
});
