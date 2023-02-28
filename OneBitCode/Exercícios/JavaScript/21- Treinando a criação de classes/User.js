class User {
  constructor(name, email, password) {
    this.fullname = name;
    this.email = email;
    this.password = password;
  }

  login(email, password) {
    if (this.email === email && this.password === password) {
      console.log(`Login do Usuário ${this.fullname} efetuado com sucesso`);
    } else {
      console.log("Email ou Senha incorreta. \nTente novamente");
    }
  }
}

let Matheus = new User(
  "Matheus Augusto Merlos Baioco",
  "MatheusinhoGameplays@outlook.com",
  "1234321"
);

console.log(Matheus);

Matheus.login("MatheusinhoGameplays@outlook.com", "134321");
