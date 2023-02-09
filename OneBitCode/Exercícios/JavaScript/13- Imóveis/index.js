let imoveis = [];
let opcao = 1;
do {
  opcao = parseFloat(
    prompt(
      "Número de imóveis cadastrados: " +
        imoveis.length +
        "\nEscolha uma opção: \n1. Adicionar um Imóvel \n2.  Listar Imóveis. \n3. Sair."
    )
  );
  switch (opcao) {
    case 1:
      const imovel = {};

      imovel.proprietario = prompt("Qual o Proprietário do Imóvel?");
      imovel.quartos = parseFloat(prompt("Quantos quartos há no Imóvel?"));
      imovel.banheiros = parseFloat(prompt("Quantos banheiros há no Imóvel?"));
      imovel.garagem = prompt("Há garagem no Imóvel? sim / nao");
      let confirmacao = confirm(
        "Gostaria de salvar esse novo Imóvel?\n Proprietário: " +
          imovel.proprietario +
          "\nQuantidade de quartos: " +
          imovel.quartos +
          "\nQuantidade de banheiros: " +
          imovel.banheiros +
          "\nGaragem disponível:" +
          imovel.garagem
      );
      if (confirmacao) {
        imoveis.push(imovel);
      } else {
        break;
      }
      break;
    case 2:
      for (let i = 0; i < imoveis.length; i++) {
        alert(
          "Imóvel " +
            (i + 1) +
            "\n" +
            "Proprietário: " +
            imoveis[i].proprietario +
            "\nQuantidade de quartos: " +
            imoveis[i].quartos +
            "\nQuantidade de banheiros: " +
            imoveis[i].banheiros +
            "\nGaragem disponível:" +
            imoveis[i].garagem
        );
      }
      break;

    case 3:
      alert("Encerrando sistema...");
      break;
    default:
      alert("Escolha uma opção válida");
  }
} while (opcao !== 3);
