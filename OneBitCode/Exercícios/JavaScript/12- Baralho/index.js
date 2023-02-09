let baralho = [];
let opcao = 1;

do {
  opcao = parseFloat(
    prompt(
      "Quantidade de cartas no baralho: " +
        baralho.length +
        "\n Escolha uma opção:\n1. Adicionar uma carta.\n 2. Remover a carta do topo.\n 3. Desmanchar o baralho."
    )
  );
  switch (opcao) {
    case 1:
      let cartaNova = prompt("Qual carta você quer adicionar?");
      baralho.push(cartaNova);
      break;
    case 2:
      let cartaRemovida = baralho.pop();
      if (cartaRemovida === undefined) {
        alert("Não há cartas no baralho.");
        break;
      }
      alert("Você removeu a carta: " + cartaRemovida + " do baralho.");
      break;
    case 3:
      alert("Baralho desmanchado :(");
      alert("Saindo :c");
      break;
    default:
      alert("Escolha uma opção válida");
  }
} while (opcao !== 3);
