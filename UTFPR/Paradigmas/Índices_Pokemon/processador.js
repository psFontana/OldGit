const fs = require("fs");

function processarArquivo(caminho, adicionar) {
  const conteudo = fs.readFileSync(caminho, "utf-8");

  const termos = conteudo.toLowerCase().split(/\s+/).filter(Boolean);

  termos.forEach((termo) => {
    adicionar(termo, caminho);
  });
}

module.exports = processarArquivo;
