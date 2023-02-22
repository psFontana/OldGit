let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let btnStart = document.getElementById("start");
let player = document.getElementById("plays");
let square = document.querySelectorAll(".square");
let titulo = document.getElementsByClassName("player");
let vboard = [];

function sorteia() {
  let n = Math.random();
  n *= 10;
  n = Math.round(n);
  if (n % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

function verifica() {
  let winRegions = [];
  if (
    vboard[0][0] &&
    vboard[0][0] === vboard[0][1] && //---
    vboard[0][0] === vboard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vboard[1][0] &&
    vboard[1][0] === vboard[1][1] && //---
    vboard[1][0] === vboard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vboard[2][0] &&
    vboard[2][0] === vboard[2][1] && //---
    vboard[2][0] === vboard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vboard[0][0] &&
    vboard[0][0] === vboard[1][0] && //|
    vboard[0][0] === vboard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vboard[0][1] &&
    vboard[0][1] === vboard[1][1] && //|
    vboard[0][1] === vboard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vboard[0][2] &&
    vboard[0][2] === vboard[1][2] && //|
    vboard[0][2] === vboard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vboard[0][0] &&
    vboard[0][0] === vboard[1][1] && // \
    vboard[0][0] === vboard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vboard[0][2] &&
    vboard[0][2] === vboard[1][1] && // /
    vboard[0][2] === vboard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

function whenWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector("[data-region='" + region + "']")
      .classList.add("win");
  });
}

function comecarJogo() {
  vboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let p1 = " " + player1.value;
  let p2 = " " + player2.value;
  if (sorteia()) {
    player.innerText = p1;
  } else {
    player.innerText = p2;
  }

  square.forEach(function (element) {
    element.classList.remove("win");
    element.innerText = "";
    element.addEventListener("click", function click(ev) {
      let region = ev.currentTarget.dataset.region;
      let cord = region.split(".");
      let linha = cord[0];
      let coluna = cord[1];
      let vez = player.innerText;
      if (vez == p1) {
        element.innerText = "x";
        vboard[linha][coluna] = "x";
        player.innerText = p2;
      } else if (vez == p2) {
        element.innerText = "o";
        vboard[linha][coluna] = "o";
        player.innerText = p1;
      } else {
        alert("ERRO");
      }
      element.style.cursor = "default";
      element.removeEventListener("click", click);
      console.table(vboard);
      if (verifica().length > 0 && verifica()) {
        winRegions = verifica();
        let jogadorVencedor = vez;
        document.querySelector("h2").innerHTML =
          "Parabéns " + jogadorVencedor + " você venceu!!";
        square.forEach(function (element) {
          element.style.cursor = "default";
          whenWin(winRegions);
        });
      }
    });
  });

  alert("O jogo começou!!! \nQuem começa é você, " + player.innerText);
}

btnStart.addEventListener("click", comecarJogo);
