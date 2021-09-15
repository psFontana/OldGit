import {cliente} from "./Cliente.js";
import { Conta } from "./Conta.js";
import { contaCorrente } from "./ContaCorrente.js";
import { ContaPoupanca } from "./ContaPoupanca.js";

const cliente1 = new cliente("Marcus", 11748293042);
const contaCliente1 = new contaCorrente(cliente1, 1001)

const cliente2 = new cliente("Jean", 74283492394);
const contaCliente2 = new ContaPoupanca(0, cliente2, 205)

contaCliente1.depositar(500);
contaCliente1.sacar(100)

contaCliente2.depositar(500);
contaCliente2.sacar(100)

console.log(contaCliente1)

console.log(contaCliente2)