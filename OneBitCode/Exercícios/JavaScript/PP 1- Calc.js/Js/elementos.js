const input = document.getElementById("input");
const resultInput = document.getElementById("result");
const main = document.querySelector("main");
const root = document.querySelector(":root");
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

export { input, resultInput, main, root, allowedKeys };
