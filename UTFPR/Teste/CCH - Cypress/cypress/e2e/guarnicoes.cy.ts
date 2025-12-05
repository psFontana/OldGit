describe("Extração de Guarnições - Tempero Caseiro", () => {
  it("Deve coletar guarnições do modal de Pequena e salvar em JSON", () => {
    // Objeto para armazenar os dados categorizados
    const guarnicoes = {
      Carnes: [],
      Acompanhamentos: [],
      Modificadores: [],
      Extras: [],
    };

    // 1. Visita a página e fecha os modais (reutilizando o fluxo dos testes anteriores)
    cy.visit("https://menuprime.com.br/tempero-caseiro-delivery");

    // Aguarda o primeiro modal aparecer (Cadastro)
    cy.get("mat-dialog-container").should("be.visible");

    // Clica em "Não quero me cadastrar"
    cy.contains("h3", "Não quero me cadastrar").click({ force: true });

    // Aguarda o segundo modal aparecer (Loja fechada)
    cy.get("mat-dialog-container").should("have.length", 1);
    cy.contains("h2", "Loja fechada").should("be.visible");

    // Clica em "Visualizar cardápio"
    cy.contains("Visualizar cardápio").click({ force: true });

    // Aguarda os modais sumirem
    cy.get("mat-dialog-container").should("not.exist");

    // 2. Rola até a seção "Marmita" e clica em "Pequena" para abrir o modal
    cy.get("#Mar7").scrollIntoView().should("be.visible");
    cy.contains("h2", "Pequena").click({ force: true }); // Clica no título "Pequena"

    // 3. Aguarda o modal de detalhes aparecer
    cy.get("mat-dialog-container").should("be.visible"); // Modal do item

    // 4. Seleciona todos os grupos de perguntas dentro do modal
    cy.get("app-pergunta-lista .pergunta-lista")
      .each(($grupo) => {
        // Extrai o título do grupo (ex.: "Carne 1", "Guarnição 1")
        const tituloGrupo = Cypress.$($grupo)
          .find("strong")
          .first()
          .text()
          .trim();

        // Determina a categoria baseada no título
        let categoria;
        if (tituloGrupo.startsWith("Carne")) {
          categoria = "Carnes";
        } else if (tituloGrupo.startsWith("Guarnição")) {
          categoria = "Acompanhamentos";
        } else if (tituloGrupo === "Opções") {
          categoria = "Modificadores";
        } else if (tituloGrupo === "Extra") {
          categoria = "Extras";
        } else {
          categoria = "Modificadores"; // Fallback para outros
        }

        // 5. Para cada grupo, coleta os itens
        cy.wrap($grupo)
          .find(".resposta-lista")
          .each((item) => {
            // Extrai o nome do item (h4)
            const nome = Cypress.$(item).find("h4").text().trim();

            // Extrai o preço extra (strong, se existir)
            const precoExtraElement = Cypress.$(item).find("strong");
            const precoExtra =
              precoExtraElement.length > 0
                ? precoExtraElement.text().trim()
                : "0";

            // Monta o objeto do item
            const itemObj = {
              nome,
              precoExtra,
            };

            // Adiciona à categoria correspondente
            guarnicoes[categoria].push(itemObj);
          });
      })
      .then(() => {
        // 6. Após processar todos os grupos, executa o código JavaScript síncrono para processar e salvar.

        // util: converte strings tipo "+ R$ 1,00" ou "+ R$ 0,50" em número (1.00, 0.50)
        // retorna 0 se não houver preço
        function parsePrice(raw) {
          if (!raw) return 0;
          // remove NBSP e outros espaços estranhos
          const cleaned = raw.replace(/\u00A0/g, " ").trim();
          // extrai primeiro trecho numérico (ex: "1,00" ou "0,50")
          const m = cleaned.match(/[\d\.,]+/);
          if (!m) return 0;
          let s = m[0].replace(/\./g, ""); // remove pontos de milhar, se existirem
          s = s.replace(",", "."); // vírgula -> ponto decimal
          const n = parseFloat(s);
          return Number.isFinite(n) ? n : 0;
        }

        // função que agrega (nome -> {Descricao, Preco, Tipo, Nr Repeticoes})
        function aggregateItems(arr, tipo) {
          const map = new Map();
          arr.forEach((it) => {
            const name = it.nome.trim();
            const precoNum =
              it.precoExtra && it.precoExtra !== "0"
                ? parsePrice(it.precoExtra)
                : 0;
            if (map.has(name)) {
              const ex = map.get(name);
              ex["Nr Repeticoes"] = ex["Nr Repeticoes"] + 1;
            } else {
              map.set(name, {
                Descricao: name,
                Preco: precoNum,
                Tipo: tipo,
                "Nr Repeticoes": 1,
              });
            }
          });
          return Array.from(map.values());
        }

        // agrega e conta repetições
        const carnesAgregadas = aggregateItems(guarnicoes.Carnes, "Carne");
        const acompanhamentosAgregados = aggregateItems(
          guarnicoes.Acompanhamentos,
          "Acompanhamento"
        );

        // Agrega somente Modificadores (Opções)
        const modificadoresAgregados = aggregateItems(
          guarnicoes.Modificadores,
          "Modificador"
        );

        // Agrega Extras
        const extrasAgregadosBruto = aggregateItems(
          guarnicoes.Extras || [],
          "Modificador"
        );
        
        // Mapeia e força o "Nr Repeticoes" para 2 em todos os itens de Extras
        const extrasAgregados = extrasAgregadosBruto.map(item => ({
            ...item,
            "Nr Repeticoes": 2
        }));


        // monta objeto final no formato solicitado
        const jsonFinal = {
          carnes: carnesAgregadas,
          acompanhamentos: acompanhamentosAgregados,
          modificadores: modificadoresAgregados,
          extras: extrasAgregados, // Usa o array modificado
        };

        // salva num lugar organizado
        cy.writeFile("cypress/results/guarnicoes.json", jsonFinal, {
          flag: "w",
        });
        cy.log("Dados das guarnições salvos em guarnicoes.json:", jsonFinal); // Log para debug
      });
  });
});