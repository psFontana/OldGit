const { Worker } = require("worker_threads");
const path = require("path");
const fs = require("fs");
const os = require("os");

const dfs = require("./dfs");

console.time("indexacao_workers");

const pasta = path.join(__dirname, "dados_pokemon");
const arquivos = dfs(pasta);

const NUM_WORKERS = os.cpus().length;

// divide arquivos em lotes
function dividir(lista, n) {
  const tamanho = Math.ceil(lista.length / n);
  let lotes = [];

  for (let i = 0; i < n; i++) {
    lotes.push(lista.slice(i * tamanho, (i + 1) * tamanho));
  }

  return lotes;
}

const lotes = dividir(arquivos, NUM_WORKERS);

let resultados = [];
let finalizados = 0;

lotes.forEach((lote) => {
  const worker = new Worker(path.join(__dirname, "worker.js"), {
    workerData: lote,
  });

  worker.on("message", (indiceParcial) => {
    resultados.push(indiceParcial);
    finalizados++;

    if (finalizados === lotes.length) {
      const indiceFinal = {};

      // merge dos índices
      resultados.forEach((parcial) => {
        for (const termo in parcial) {
          if (!indiceFinal[termo]) indiceFinal[termo] = {};

          for (const pasta in parcial[termo]) {
            if (!indiceFinal[termo][pasta]) indiceFinal[termo][pasta] = {};

            for (const arquivo in parcial[termo][pasta]) {
              if (!indiceFinal[termo][pasta][arquivo]) {
                indiceFinal[termo][pasta][arquivo] = 0;
              }

              indiceFinal[termo][pasta][arquivo] +=
                parcial[termo][pasta][arquivo];
            }
          }
        }
      });

      console.timeEnd("indexacao_workers");

      fs.writeFileSync(
        path.join(__dirname, "indice_workers.json"),
        JSON.stringify(indiceFinal, null, 2),
      );
    }
  });
});
