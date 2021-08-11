import {cliente} from "./Cliente.js";
import { contaCorrente } from "./ContaCorrente.js";

const cliente1 = new cliente("Marcus", 11748293042);
const contaCliente1 = new contaCorrente(cliente1, 1001)

const cliente2 = new cliente("Jean", 74283492394);
const contaCliente2 = new contaCorrente(cliente2, 205)

console.log(contaCliente2)