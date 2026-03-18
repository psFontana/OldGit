function criarIndexador() {
  let indice = {};

  function adicionar(termo, caminhoCompleto) {
    const path = require("path");

    const pasta = path.basename(path.dirname(caminhoCompleto));
    const arquivo = path.basename(caminhoCompleto);

    if (!indice[termo]) indice[termo] = {};
    if (!indice[termo][pasta]) indice[termo][pasta] = {};
    if (!indice[termo][pasta][arquivo]) indice[termo][pasta][arquivo] = 0;

    indice[termo][pasta][arquivo]++;
  }

  function getIndice() {
    return indice;
  }

  return { adicionar, getIndice };
}

module.exports = criarIndexador;
