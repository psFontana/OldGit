// indexador_flat.js
function criarIndexador(baseDir) {
  let indice = {};
  const path = require("path");

  function adicionar(termo, caminhoCompleto) {
    if (!termo?.trim()) return;

    const caminhoRelativo = path.relative(baseDir, caminhoCompleto);
    const chaveCompleta = caminhoRelativo.replace(/\\/g, "/"); // Normaliza para /

    indice[termo] ??= {};
    indice[termo][chaveCompleta] ??= 0;
    indice[termo][chaveCompleta]++;
  }

  function getIndice() {
    return JSON.parse(JSON.stringify(indice));
  }

  return { adicionar, getIndice };
}

module.exports = criarIndexador;
