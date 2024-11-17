let all = document.querySelector("*")
all.setAttribute("style", "text-align: center; font-size: 1.5em; margin:0;")

let app = document.getElementById("app")
let tabela = document.createElement("table")
let cabecalho = document.createElement("thead")
cabecalho.setAttribute("style", "height:12.5vh;")
let corpo = document.createElement("tbody")
corpo.setAttribute("style", "height:37.5vh;")
let tr = document.createElement("tr")

tabela.appendChild(cabecalho)
tabela.appendChild(corpo)
cabecalho.appendChild(tr)

tabela.setAttribute("border", "1")
tabela.setAttribute("style", "height:75vh;")

app.appendChild(tabela)
app.setAttribute("style", "height:100vh;display:grid;align-items:center;")

let Colunas = prompt("Quantas Colunas gostaria de gerar? (Letras de uma planilha)")
let Linhas = prompt("Quantas linhas gostaria de gerar? (Números de uma planilha)")
if (isNaN(Colunas)) {
    alert(`O valor inserido para a quantidade de colunas foi "${Colunas}", que é inválido. Por favor, tente novamente`)
    window.location.reload(true)
} else if (isNaN(Linhas)) {
    alert(`O valor inserido para a quantidade de linhas foi "${Linhas}", que é inválido. Por favor, tente novamente`)
    window.location.reload(true)
} else {
    for (let i = 0; i < Colunas; i++) {
        let coluna = document.createElement("th")
        tr.appendChild(coluna);
        let texto = prompt(`Qual o texto que deseja inserir em A${i + 1}`)
        coluna.innerText = texto
        tr.appendChild(coluna)
    }

    for (let i = 1; i < Linhas; i++) {
        let linha = document.createElement("tr")
        corpo.appendChild(linha);
        for (let j = 0; j < Colunas; j++) {
            let coluna = document.createElement("td");
            let texto = prompt(`Qual o texto que deseja inserir em ${String.fromCharCode(i + 65)}${j + 1}`)
            coluna.innerText = texto
            linha.appendChild(coluna)
        }
    }

    let rows = document.querySelectorAll("tr")
    rows.forEach((trow, index) => {
        index % 2 == 0 ? trow.setAttribute("style", "background-color:red; color:white;") : trow.setAttribute("style", "background-color:white; color:red;")
    })

    let cells = document.querySelectorAll("td")
    cells.forEach(cell => {
        cell.setAttribute("style", "cursor:pointer")
        cell.addEventListener("click", () => {
            let newText = prompt("Qual novo valor desejado?");
            newText == null ? alert("Cancelando alteração...") : cell.innerText = newText
        })
    })
}