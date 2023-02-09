let metros = parseFloat(prompt("Defina um valor em Metros:"));
let opcao = prompt(
  "Defina para qual medida você gostaria de converter (mm, cm, dm, dam, hm, km)"
);

switch (opcao) {
  case "mm":
    alert(metros + "m" + " é igual à " + metros * 1000 + "mm");
    break;
  case "cm":
    alert(metros + "m" + " é igual à " + metros * 100 + "cm");
    break;
  case "dm":
    alert(metros + "m" + " é igual à " + metros * 10 + "dm");
    break;
  case "dam":
    alert(metros + "m" + " é igual à " + metros / 10) + "dam";
    break;
  case "hm":
    alert(metros + "m" + " é igual à " + metros / 100 + "hm");
    break;
  case "km":
    alert(metros + "m" + " é igual à " + metros / 1000 + "km");
    break;
  default:
    alert("insira um valor válido apenas com letras minúsculas");
}
