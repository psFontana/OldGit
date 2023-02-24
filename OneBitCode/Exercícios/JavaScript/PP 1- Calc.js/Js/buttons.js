import { input } from "./elementos.js";
import calculate from "./calculate.js";

let buttons = document
  .querySelectorAll(".charKey")
  .forEach(function (charKeyBtn) {
    charKeyBtn.addEventListener("click", function () {
      input.value += charKeyBtn.dataset.value;
    });
  });

let clear = document
  .getElementById("clear")
  .addEventListener("click", function () {
    input.value = "";
    input.focus();
  });

let equal = document
  .getElementById("equal")
  .addEventListener("click", calculate);

let copy = document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    let button = ev.currentTarget;
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      button.classList.add("success");
      navigator.clipboard.writeText(resultInput.value);
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });

export { buttons, clear, equal, copy };
