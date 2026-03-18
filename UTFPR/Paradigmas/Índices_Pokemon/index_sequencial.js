const path = require("path");
const fs = require("fs");

const dfs = require("./dfs");
const processarArquivo = require("./processador");
const criarIndexador = require("./indexador");

console.time("indexacao_sequencial");

const pasta = path.join(__dirname, "dados_pokemon");
const arquivos = dfs(pasta);

const { adicionar, getIndice } = criarIndexador();

arquivos.forEach((arquivo) => {
  processarArquivo(arquivo, adicionar);
});

console.timeEnd("indexacao_sequencial");

fs.writeFileSync(
  path.join(__dirname, "indice_sequencial.json"),
  JSON.stringify(getIndice(), null, 2),
);
