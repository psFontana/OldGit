const nome = prompt("Qual o seu nome?");
let cidadesVisitadas = "";
let contagem = 0;

let visitou = true;

while (visitou) {
  let pergunta = prompt("Você já visitou alguma cidade?\n |s| ou |n|");
  if (pergunta === "s") {
    visitou = true;
  } else if (pergunta === "n") {
    break;
  } else {
    alert("Por favor, responda apenas com |s| ou |n| e letras minúsculas");
  }
  let qual = prompt("Qual cidade você turistou?");
  contagem++;
  cidadesVisitadas += qual + ", ";
}

alert(nome + " já visitou " + contagem + " cidades:\n" + cidadesVisitadas);
