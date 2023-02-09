let palavra = prompt("Insira a palavra:");
let palavraReversa = palavra.split("").reverse("").join("");

/*
let palavraInversa = "";
function verificaPalindromo(word) {
  for (i = word.lenght - 1; i >= 0; i--) {
    palavraInversa += word[i];
  }
}
*/

if (palavra === palavraReversa) {
  alert("Sim vadia, isso é um palíndromo.");
} else {
  alert(
    "Não vadia, isso não é um palíndromo, olha >:(\n" +
      palavra +
      "≠" +
      palavraReversa
  );
}
