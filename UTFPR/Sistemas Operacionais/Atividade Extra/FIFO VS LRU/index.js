let numero = document.getElementById("numero");

function fifo() {
    for (let i = 0; i < 3; i++) {
        if (document.querySelectorAll(".fifoDiv .container .number")[i].children[0].innerText == numero.value) {
            return
        }
    }

    let n3 = document.getElementById("n-3");
    if (n3.classList.contains("n-1")) {
        document.getElementById("n-3").classList.remove("n-1");
        document.getElementById("n-3").classList.add("n-2");
        document.getElementById("n-2").classList.remove("n-3");
        document.getElementById("n-2").classList.add("n-1");
        document.getElementById("n-1").classList.remove("n-2");
        document.getElementById("n-1").classList.add("n-3");
        alterado = document.querySelectorAll(".fifoDiv .container .number")[1]
    } else if (n3.classList.contains("n-2")) {
        document.getElementById("n-3").classList.remove("n-2");
        document.getElementById("n-3").classList.add("n-3");
        document.getElementById("n-2").classList.remove("n-1");
        document.getElementById("n-2").classList.add("n-2");
        document.getElementById("n-1").classList.remove("n-3");
        document.getElementById("n-1").classList.add("n-1");
        alterado = document.querySelectorAll(".fifoDiv .container .number")[0]
    } else {
        document.getElementById("n-3").classList.remove("n-3");
        document.getElementById("n-3").classList.add("n-1");
        document.getElementById("n-2").classList.remove("n-2");
        document.getElementById("n-2").classList.add("n-3");
        document.getElementById("n-1").classList.remove("n-1");
        document.getElementById("n-1").classList.add("n-2");
        alterado = document.querySelectorAll(".fifoDiv .container .number")[2]
    }
    alterado.children[0].innerText = numero.value
}

function lru() {
    let verificacao = -1;

    for (let i = 0; i < 3; i++) {
        if (document.querySelectorAll(".lruDiv .container .number")[i].children[0].innerText === numero.value) {
            verificacao = i;
        }
    }

    if (verificacao == -1 || document.querySelectorAll(".lruDiv .container .number")[verificacao].classList.contains("n-3")) {
        if (document.querySelectorAll(".lruDiv .container .number")[0].classList.contains("n-3")) {
            document.querySelectorAll(".lruDiv .container .number")[0].children[0].innerText = numero.value
            document.querySelectorAll(".lruDiv .container .number")[0].classList.remove("n-3")
            document.querySelectorAll(".lruDiv .container .number")[0].classList.add("n-1")
            if (document.querySelectorAll(".lruDiv .container .number")[1].classList.contains("n-2")) {
                document.querySelectorAll(".lruDiv .container .number")[1].classList.remove("n-2")
                document.querySelectorAll(".lruDiv .container .number")[1].classList.add("n-3")
                document.querySelectorAll(".lruDiv .container .number")[2].classList.remove("n-1")
                document.querySelectorAll(".lruDiv .container .number")[2].classList.add("n-2")
            } else {
                document.querySelectorAll(".lruDiv .container .number")[1].classList.remove("n-1")
                document.querySelectorAll(".lruDiv .container .number")[1].classList.add("n-2")
                document.querySelectorAll(".lruDiv .container .number")[2].classList.remove("n-2")
                document.querySelectorAll(".lruDiv .container .number")[2].classList.add("n-3")
            }
        } else if (document.querySelectorAll(".lruDiv .container .number")[1].classList.contains("n-3")) {
            document.querySelectorAll(".lruDiv .container .number")[1].children[0].innerText = numero.value
            document.querySelectorAll(".lruDiv .container .number")[1].classList.remove("n-3")
            document.querySelectorAll(".lruDiv .container .number")[1].classList.add("n-1")
            if (document.querySelectorAll(".lruDiv .container .number")[0].classList.contains("n-2")) {
                document.querySelectorAll(".lruDiv .container .number")[0].classList.remove("n-2")
                document.querySelectorAll(".lruDiv .container .number")[0].classList.add("n-3")
                document.querySelectorAll(".lruDiv .container .number")[2].classList.remove("n-1")
                document.querySelectorAll(".lruDiv .container .number")[2].classList.add("n-2")
            } else {
                document.querySelectorAll(".lruDiv .container .number")[0].classList.remove("n-1")
                document.querySelectorAll(".lruDiv .container .number")[0].classList.add("n-2")
                document.querySelectorAll(".lruDiv .container .number")[2].classList.remove("n-2")
                document.querySelectorAll(".lruDiv .container .number")[2].classList.add("n-3")
            }
        } else if (document.querySelectorAll(".lruDiv .container .number")[2].classList.contains("n-3")) {
            document.querySelectorAll(".lruDiv .container .number")[2].children[0].innerText = numero.value
            document.querySelectorAll(".lruDiv .container .number")[2].classList.remove("n-3")
            document.querySelectorAll(".lruDiv .container .number")[2].classList.add("n-1")
            if (document.querySelectorAll(".lruDiv .container .number")[0].classList.contains("n-1")) {
                document.querySelectorAll(".lruDiv .container .number")[0].classList.remove("n-1")
                document.querySelectorAll(".lruDiv .container .number")[0].classList.add("n-2")
                document.querySelectorAll(".lruDiv .container .number")[1].classList.remove("n-2")
                document.querySelectorAll(".lruDiv .container .number")[1].classList.add("n-3")
            } else {
                document.querySelectorAll(".lruDiv .container .number")[1].classList.remove("n-1")
                document.querySelectorAll(".lruDiv .container .number")[1].classList.add("n-2")
                document.querySelectorAll(".lruDiv .container .number")[0].classList.remove("n-2")
                document.querySelectorAll(".lruDiv .container .number")[0].classList.add("n-3")
            }
        }
    } else {
        if (document.querySelectorAll(".lruDiv .container .number")[verificacao].classList.contains("n-1")) {
            return
        } else if (document.querySelectorAll(".lruDiv .container .number")[verificacao].classList.contains("n-2")) {
            if (document.querySelectorAll(".lruDiv .container .number")[0].classList.contains("n-1")) {
                document.querySelectorAll(".lruDiv .container .number")[verificacao].classList.remove("n-2")
                document.querySelectorAll(".lruDiv .container .number")[verificacao].classList.add("n-1")
                document.querySelectorAll(".lruDiv .container .number")[0].classList.remove("n-1")
                document.querySelectorAll(".lruDiv .container .number")[0].classList.add("n-2")
                return
            } else if (document.querySelectorAll(".lruDiv .container .number")[1].classList.contains("n-1")) {
                document.querySelectorAll(".lruDiv .container .number")[verificacao].classList.remove("n-2")
                document.querySelectorAll(".lruDiv .container .number")[verificacao].classList.add("n-1")
                document.querySelectorAll(".lruDiv .container .number")[1].classList.remove("n-1")
                document.querySelectorAll(".lruDiv .container .number")[1].classList.add("n-2")
                return
            } else {
                document.querySelectorAll(".lruDiv .container .number")[verificacao].classList.remove("n-2")
                document.querySelectorAll(".lruDiv .container .number")[verificacao].classList.add("n-1")
                document.querySelectorAll(".lruDiv .container .number")[2].classList.remove("n-1")
                document.querySelectorAll(".lruDiv .container .number")[2].classList.add("n-2")
            }
        }
    }
}

function add() {
    fifo()
    lru()
}

let intervalId = null;
document.getElementById("auto").addEventListener("change", () => {
    if (document.getElementById("auto").checked) {
        intervalId = setInterval(() => {
            numero.value = Math.round(Math.random() * 20)
            add()
        }, 2000);
    } else {
        clearInterval(intervalId);
        intervalId = null;
    }
});