const { parentPort, workerData } = require("worker_threads");
const criarIndexador = require("./indexador");
const processarArquivo = require("./processador");
const path = require("path");

const baseDir = path.join(__dirname, "dados_pokemon");

const { adicionar, getIndice } = criarIndexador(baseDir);

workerData.forEach((arquivo) => {
  processarArquivo(arquivo, adicionar);
});

parentPort.postMessage(getIndice());
