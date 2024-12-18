let add = document.getElementById("adicionar");
let remove = document.getElementById("remover");
let tbody = document.getElementById("tbod");
let tabela = document.querySelectorAll("tbody > tr");

remove.addEventListener("click", (ev) => {
  if (tabela.length == 0) {
    alert("Tabela já está Vazia!!!!");
    throw new Error("Tabela já está Vazia!!!!");
  }
  tabela[tabela.length - 1].remove();
  tabela = document.querySelectorAll("tbody > tr");
});

add.addEventListener("click", (ev) => {
  let tr = document.createElement("tr");
  for (let i = 0; i < 3; i++) {
    let td = document.createElement("td");
    switch (i) {
      case 0:
        td.innerText = prompt("Insira o Nome");
        break;
      case 1:
        td.innerText = prompt("Insira o Registro");
        break;
      case 2:
        td.innerText = prompt("Insira o Nascimento");
        break;
      default:
        break;
    }
    tr.appendChild(td);
  }

  tbod.appendChild(tr);

  tabela = document.querySelectorAll("tbody > tr");
});

console.log(tbody);
// console.log(document.querySelectorAll(tbody)[0]);

console.log(Object.keys(tbody));
