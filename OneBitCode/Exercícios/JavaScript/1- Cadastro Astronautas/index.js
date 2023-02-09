let nome = prompt("Insira o seu nome");
let sobrenome = prompt("Insira o seu sobrenome");
let nomeCompleto = nome + " " + sobrenome;
let estudo = prompt("Insira o seu campo de estudo");
let idade = 2023 - parseFloat(prompt("Isira a sua data de nascimento"));

confirm("Cadastro completo, gostaria de confirmar?");

let confirmacao = confirm("Cadastro completo, gostaria de confirmar?");

if (confirmacao) {
  alert(
    "Parabéns " +
      nomeCompleto +
      ", por ter estudado " +
      estudo +
      " aos " +
      idade +
      " anos você foi selecionado para trabalhar conosco"
  );
} else {
  alert("aaah, que abalo ;-;");
}
