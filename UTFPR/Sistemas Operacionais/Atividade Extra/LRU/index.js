const container = document.getElementById("container");
let tam = prompt("Gostaria de gerar uma fila de quantos números?");

for (let i = 0; i < tam; i++) {
    let div = document.createElement("div");
    div.classList = "box";
    div.id = `box${i}`;
    container.appendChild(div);
}

const boxes = document.querySelectorAll('.box');

function addNumber() {
    let number = document.getElementById("numero").value;
    if (number === "") return;

    // Verifica números iguais com for, pois precisaremos da posição do número
    for (let i = 0; i < tam; i++) {
        if (boxes[i].innerHTML === number) {
            alteraNumeros(i)
            return;
        }
    }
    alteraNumeros(tam - 1)
    
    function alteraNumeros(limite) {
        for (let i = limite; i > 0; i--) {
            boxes[i].innerHTML = boxes[i - 1].innerHTML;
        }
        boxes[0].innerHTML = number;
    }
}