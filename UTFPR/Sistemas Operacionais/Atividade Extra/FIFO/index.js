const container = document.getElementById("container");
let tam = prompt("Gostaria de gerar uma fila de quantos números?")

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
    
    if ([...boxes].some(box => box.innerHTML === number)) {
        alert("Este número já está na fila!");
        return;
    }
    alteraNumeros(tam - 1)

    function alteraNumeros(limite) {
        // "Empurra" para baixo
        for (let i = limite; i > 0; i--) {
            boxes[i].innerHTML = boxes[i - 1].innerHTML;
        }
        boxes[0].innerHTML = number;
    }
}
