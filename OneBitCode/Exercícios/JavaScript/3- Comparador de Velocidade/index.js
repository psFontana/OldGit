let name1 = prompt("Qual o primeiro carro?");
let speed1 = parseFloat(prompt("Qual a velocidade do " + name1 + "?"));

let name2 = prompt("Qual o segundo carro?");
let speed2 = parseFloat(prompt("Qual a velocidade do " + name2 + "?"));

if (speed1 > speed2) {
  alert(
    "o " +
      name1 +
      " é mais veloz por uma diferença de " +
      (speed1 - speed2) +
      "Km/h"
  );
} else if (speed2 > speed1) {
  alert(
    "o " +
      name2 +
      " é mais veloz por uma diferença de " +
      (speed2 - speed1) +
      "Km/h"
  );
} else {
  alert(
    "A velocidade dos dois carros são iguais\n" +
      name1 +
      ": " +
      speed1 +
      "\n" +
      name2 +
      ": " +
      speed2
  );
}
