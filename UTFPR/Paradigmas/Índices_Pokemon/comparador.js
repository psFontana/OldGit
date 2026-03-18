const { execSync } = require("child_process");
const path = require("path");

function executar(arquivo) {
  const caminhoAbsoluto = path.join(__dirname, arquivo);
  const comando = `node "${caminhoAbsoluto}"`;
  const inicio = Date.now();
  execSync(comando, { stdio: "ignore" }); // 'ignore' para não poluir o console no loop
  return (Date.now() - inicio) / 1000;
}

async function benchmark() {
  const rodadas = 3;
  const arquivos = ["index_sequencial.js", "index_workers.js"];
  const resultados = { "index_sequencial.js": [], "index_workers.js": [] };

  console.log("🔥 Aquecendo motores (Warm-up)...");
  for (const f of arquivos) executar(f);

  console.log(`🚀 Iniciando ${rodadas} rodadas oficiais...\n`);

  for (let i = 1; i <= rodadas; i++) {
    console.log(`--- Rodada ${i} ---`);
    for (const f of arquivos) {
      process.stdout.write(`  > Medindo ${f}... `);
      const tempo = executar(f);
      resultados[f].push(tempo);
      console.log(`${tempo.toFixed(2)}s`);
      // Pausa de 1s para o sistema "respirar"
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // Cálculos de média
  const media = (arr) => arr.reduce((a, b) => a + b) / arr.length;
  const tSeq = media(resultados["index_sequencial.js"]);
  const tWork = media(resultados["index_workers.js"]);

  console.log("\n📊 RESULTADO FINAL (MÉDIA):");
  console.log("----------------------------");
  console.log(`Sequencial: ${tSeq.toFixed(2)} s`);
  console.log(`Workers:    ${tWork.toFixed(2)} s`);
  console.log(`Speedup:    ${(tSeq / tWork).toFixed(2)}x`);
}

benchmark();
