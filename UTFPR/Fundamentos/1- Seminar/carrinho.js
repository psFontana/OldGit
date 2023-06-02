let input = document.querySelectorAll("input");

function mudaNome() {
  let preco = document.getElementById("preco");
  let mercadoSelecionado = document.getElementById("mercado-selecionado");
  mercadoSelecionado.innerText = this.id;
  console.log("oi");
  console.log(this.id);
  console.log(mercadoSelecionado);
  if (mercadoSelecionado.innerText == "Mano Manfroi") {
    preco.innerText = "R$ 17,52";
  } else if (mercadoSelecionado.innerText == "Italo Supermercados") {
    preco.innerText = "R$ 18,30";
  } else {
    preco.innerText = "R$ 19,80";
  }
}
input.forEach(function (element) {
  element.addEventListener("click", mudaNome);
});
