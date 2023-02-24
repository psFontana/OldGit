import { input, resultInput } from "./elementos.js";
export default function () {
  resultInput.value = "ERROR";
  resultInput.classList.add("error");
  let result = eval(input.value);
  resultInput.value = result;
  resultInput.classList.remove("error");
}
