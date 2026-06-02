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

  const ARQUIVOS_POR_PASTA = 100;

  // Cria pastas + gera arquivos balanceados
  let contadorGlobal = 1;

  function sortearNivel() {
    const r = Math.random();

    if (r < 0.4) return 1; // maioria superficial
    if (r < 0.7) return 2;
    if (r < 0.9) return 3;
    if (r < 0.98) return 4;
    return 0; // raros na raiz
  }
  function gerarCaminho(base, nature, nivel) {
    const partes = [base];

    if (nivel >= 1) partes.push(nature);
    if (nivel >= 2) partes.push("shiny");
    if (nivel >= 3) partes.push("ivsPerfeito");
    if (nivel >= 4) partes.push("lvl100");

    const caminho = path.join(...partes);
    fs.mkdirSync(caminho, { recursive: true });

    return caminho;
  }
  naturesUtilizadas.forEach((nature) => {
    const listaPokemons = pokemons.results;

    for (let i = 0; i < ARQUIVOS_POR_PASTA; i++) {
      const nivel = sortearNivel(); // ✅ agora por arquivo

      const pasta = gerarCaminho(pastaDestino, nature, nivel);

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
  console.log(`✅ ${ARQUIVOS_POR_PASTA * NUM_WORKERS} arquivos criados!!!`);
  console.log(
    `📁 Estrutura multinível criada para testar Busca em Profundidade!`,
  );
})();
