const container = document.getElementById("container");
let limite = prompt("Gostaria de gerar uma fila de quantos números?")

for (let i = 0; i < limite; i++) {
    let div = document.createElement("div")
    div.classList = "box";
    div.id = `box${i}`;
    container.appendChild(div)
}

const boxes = document.querySelectorAll('.box');
let currentIndex = 0;




function addNumber() {
    alteraNumeros()
    let number = document.getElementById("numero").value
    boxes[0].innerHTML = number;
}

function alteraNumeros() {
    let ultimo = boxes[limite-1].innerHTML;
    for(let i = limite-1; i > 0; i--){
        boxes[i].innerHTML = boxes[i-1].innerHTML;
    }
    boxes[0].innerHTML = ultimo
}