let nameInp = document.getElementById("name");
let emailInp = document.getElementById("email");
let passInp = document.getElementById("password");
let submitBtn = document.getElementById("btnSubmit");
let form = document.getElementById("form");
let errName = document.getElementById("errName");
let errEmail = document.getElementById("errEmail");
let errPassword = document.getElementById("errPassword");

function resetStyles() {
  errName.innerText = "";
  nameInp.classList.remove("error", "sucess");
  errEmail.innerText = "";
  emailInp.classList.remove("error", "sucess");
  errPassword.innerText = "";
  passInp.classList.remove("error", "sucess");
}

function verificaNome(nome) {
  if (nome === "") {
    let err = new Error("Por favor, insira seu nome.");
    nameInp.classList.add("error");
    errName.textContent = err.message;
  } else {
    nameInp.classList.add("sucess");
  }
}

function verificaSenha(senha) {
  if (
    !senha.match(/[a-z]/) ||
    !senha.match(/[A-Z]/) ||
    !senha.match(/[\d]/) ||
    !senha.match(/[^a-zA-Z\d\s]/)
  ) {
    let err = new Error(`Senha Inválida: Faltam Parâmetros
    A senha deve conter pelo menos:
    1 Letra minúscula
    1 Letra maiúscula
    1 Número
    1 Caractere especial (!, @, #, $, %)`);
    passInp.classList.add("error");
    errPassword.textContent = err.message;
  } else {
    passInp.classList.add("sucess");
  }
}

function verificaEmail(email) {
  if (!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)) {
    let err = new Error("Email Inválido, tente novamente");
    emailInp.classList.add("error");
    errEmail.textContent = err.message;
    //aqui
  } else {
    emailInp.classList.add("sucess");
  }
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  resetStyles();
  try {
    let nome = nameInp.value;
    let email = emailInp.value;
    let senha = passInp.value;
    verificaNome(nome);
    verificaEmail(email);
    verificaSenha(senha);
  } catch (err) {
    alert(err.message);//inutil pq nn quero dar um throw err lá em cima :)
  }
});
