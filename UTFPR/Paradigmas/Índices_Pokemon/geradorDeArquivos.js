(async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500");
  const pokemons = await response.json();

  const fs = require("fs");
  const path = require("path");

  // Cria a pasta principal
  const pastaDestino = path.join(__dirname, "dados_pokemon");
  if (!fs.existsSync(pastaDestino)) fs.mkdirSync(pastaDestino);

  // Cria subpastas (natures) para testar a Busca em Profundidade (DFS)
  const naturesPossiveis = [
    "Adamant",
    "Bashful",
    "Bold",
    "Brave",
    "Calm",
    "Careful",
    "Docile",
    "Gentle",
    "Hardy",
    "Hasty",
    "Impish",
    "Jolly",
    "Lax",
    "Lonely",
    "Mild",
    "Modest",
    "Naive",
    "Naughty",
    "Quiet",
    "Quirky",
    "Rash",
    "Relaxed",
    "Sassy",
    "Serious",
    "Timid",
  ];

  const os = require("os");
  const NUM_WORKERS = Math.min(os.cpus().length, naturesPossiveis.length);

  const naturesUtilizadas = [];

  // Seleciona natures únicas
  for (let i = 0; i < NUM_WORKERS; i++) {
    const naturesorteada =
      naturesPossiveis[Math.floor(Math.random() * naturesPossiveis.length)];

    naturesPossiveis.splice(naturesPossiveis.indexOf(naturesorteada), 1);

    naturesUtilizadas.push(naturesorteada);
  }

  const ARQUIVOS_POR_PASTA = 1000;

  // Cria pastas + gera arquivos balanceados
  let contadorGlobal = 1;

  naturesUtilizadas.forEach((nature) => {
    const pasta = path.join(pastaDestino, nature);
    const listaPokemons = pokemons.results;

    if (!fs.existsSync(pasta)) fs.mkdirSync(pasta);

    for (let i = 0; i < ARQUIVOS_POR_PASTA; i++) {
      const nomeArquivo = `grama_${contadorGlobal++}.txt`;
      const caminhoFinal = path.join(pasta, nomeArquivo);

      let conteudo = [];
      const tamanhoArquivo = 9000 + Math.floor(Math.random() * 2001);

      for (let j = 0; j < tamanhoArquivo; j++) {
        const pkmSorteado =
          listaPokemons[Math.floor(Math.random() * listaPokemons.length)];

        conteudo.push(pkmSorteado.name);
      }

      fs.writeFileSync(caminhoFinal, conteudo.join(" "));
    }
  });
  console.log(
    `✅ ${ARQUIVOS_POR_PASTA} arquivos criados para cada nature: ${naturesUtilizadas.join(", ")}`,
  );
  console.log(
    `📁 Estrutura: Pastas de natures criadas para testar sua Busca em Profundidade!`,
  );
})();
