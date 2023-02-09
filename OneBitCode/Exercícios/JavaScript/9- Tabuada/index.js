let numero = parseFloat(
  prompt(
    "Olá, eu sou Saluvtudei, o robô da tabuada do 1 ao 20 :)\nEscolha um número para eu te mostrar as minhas habilidades >:)"
  )
);

let saida = "";

for (let i = 0; i <= 20; i++) {
  saida += numero + " * " + i + " = " + numero * i + "\n";
}
alert(saida);
