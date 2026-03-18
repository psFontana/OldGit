const fs = require("fs");

function processarArquivo(caminho, adicionar) {
  const conteudo = fs.readFileSync(caminho, "utf-8");
  const termos = conteudo.split(/\s+/);

  termos.forEach((t) => {
    if (t) adicionar(t.toLowerCase(), caminho);
  });
}

module.exports = processarArquivo;
