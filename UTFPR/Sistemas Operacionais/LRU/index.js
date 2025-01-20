const container = document.getElementById("container");
let limite = prompt("Gostaria de gerar uma fila de quantos números?");

for (let i = 0; i < limite; i++) {
    let div = document.createElement("div");
    div.classList = "box";
    div.id = `box${i}`;
    container.appendChild(div);
}

const boxes = document.querySelectorAll('.box');

function addNumber() {
    let number = document.getElementById("numero").value;
    if (number === "") return;

    for (let i = 0; i < limite; i++) {
        if (boxes[i].innerHTML === number) {
            for (let j = i; j > 0; j--) {
                boxes[j].innerHTML = boxes[j - 1].innerHTML;
            }
            boxes[0].innerHTML = number;
            return;
        }
    }

    for (let i = limite - 1; i > 0; i--) {
        boxes[i].innerHTML = boxes[i - 1].innerHTML;
    }
    boxes[0].innerHTML = number;
}