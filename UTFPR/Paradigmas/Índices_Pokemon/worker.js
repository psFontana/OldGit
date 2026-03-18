const { parentPort, workerData } = require("worker_threads");

const processarArquivo = require("./processador");
const criarIndexador = require("./indexador");

const { adicionar, getIndice } = criarIndexador();

workerData.forEach((arquivo) => {
  processarArquivo(arquivo, adicionar);
});

parentPort.postMessage(getIndice());
