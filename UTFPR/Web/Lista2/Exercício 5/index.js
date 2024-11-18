let btn = document.getElementById("btnRegistrar");
let tabela = document.getElementById("tabela");
let nome = document.getElementById("nome")
let idade = document.getElementById("idade")

btn.addEventListener("click", () => {
    let tr = document.createElement("tr")
    let tdnome = document.createElement("td");
    let tdidade = document.createElement("td");
    tdnome.innerText = nome.value
    tdidade.innerText = idade.value
    tr.appendChild(tdnome);
    tr.appendChild(tdidade);
    tabela.appendChild(tr)
    console.log(nome.value)
})