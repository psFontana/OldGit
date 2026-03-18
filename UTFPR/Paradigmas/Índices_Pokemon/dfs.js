const fs = require("fs");
const path = require("path");

function dfs(diretorio, arquivos = []) {
  const itens = fs.readdirSync(diretorio);

  for (const item of itens) {
    const caminho = path.join(diretorio, item);
    const stat = fs.statSync(caminho);

    if (stat.isDirectory()) {
      dfs(caminho, arquivos);
    } else {
      arquivos.push(caminho);
    }
  }

  return arquivos;
}

module.exports = dfs;
