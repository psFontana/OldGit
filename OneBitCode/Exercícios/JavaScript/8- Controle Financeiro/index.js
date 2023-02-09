let dinheiro = parseFloat(prompt("Quantos dinheirinhos você tem? em em em?"));
let opcoes;

do {
  opcoes = parseFloat(
    prompt(
      "Você tem " +
        dinheiro +
        " dinheiros :) , o que deseja fazer?\n \n 1. Adicionar mais $.$\n 2. Gastar ;-;\n 3. Sair do Controle B)"
    )
  );

  switch (opcoes) {
    case 1:
      let soma = parseFloat(prompt("Quanto dinheiro você quer adicionar bb? "));
      dinheiro += soma;
      break;
    case 2:
      let gasto = parseFloat(
        prompt("Quanto do nosso dinheiro você vai gastar ;-;-;? ")
      );
      dinheiro -= gasto;
      break;
    case 3:
      alert("Encerrando o sistema :/");
      break;
  }
  if (opcoes == 3) {
    break;
  }
} while (opcoes != 3);
