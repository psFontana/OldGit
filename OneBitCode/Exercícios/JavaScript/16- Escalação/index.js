let posicao = document.getElementById("posicao");
let nome = document.getElementById("nome");
let numero = document.getElementById("numero");

let novoJogador = "";

function escalar() {
  let ul = document.getElementById("escalacao");
  let confirmacao = confirm(
    "Confirmar escalação do " +
      posicao.value +
      " " +
      nome.value +
      " camisa nº " +
      numero.value +
      "?"
  );
  if (confirmacao) {
    novoJogador = document.createElement("li");
    novoJogador.id = "jogador" + numero.value;
    novoJogador.className = "jogador" + numero.value;
    novoJogador.innerText =
      posicao.value + ": " + nome.value + " (" + numero.value + ")";
    ul.appendChild(novoJogador);
    posicao.value = numero.value = nome.value = "";
  }
}

function remover() {
  let ul = document.getElementById("escalacao");
  let numero = document.getElementById("remover");
  let jogadorRemovido = document.getElementById("jogador" + numero.value);
  let confirmacao = confirm(
    "Gostaria de remover o " + jogadorRemovido.innerText + "?"
  );
  if (confirmacao) {
    ul.removeChild(jogadorRemovido);
    numero.value = "";
  }
}
