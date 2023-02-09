//personagem 1
const name1 = prompt("Nome do Primeiro Personagem:");
let atk = parseFloat(prompt("Força do Atacante"));

//personagem 2
const name2 = prompt("Nome do Segundo Personagem:");
let hp = parseFloat(prompt("Quanto " + name2 + " tem de HP?"));
let def = parseFloat(prompt("Defesa do Defensor"));
let escudo = confirm(
  "Aparentemente o " +
    name2 +
    "está querendo usar um escudo, você vai deixar ou cancelar?"
);

// Comparação
let dano = 0;
function exibeVida() {
  alert(name2 + " ficou com " + (hp -= dano) + "HP após o ataque de " + name1);
}

if (atk > def && !escudo) {
  dano = atk - def;
  exibeVida();
} else if (atk > def && escudo) {
  dano = (atk - def) / 2;
  exibeVida();
} else {
  exibeVida();
}
