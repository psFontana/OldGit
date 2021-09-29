import {cliente} from "./Cliente.js";
import { contaCorrente } from "./ContaCorrente.js";
import { ContaPoupanca } from "./ContaPoupanca.js";
import { Diretor } from "./Funcionarios/Diretor.js";
import { Gerente } from "./Funcionarios/Gerente.js";
import { SistemaAutenticacao } from "./SistemaAutenticacao.js";

const cliente1 = new cliente("Marcus", 11748293042, 1);
const contaCliente1 = new contaCorrente(cliente1, 1001)

const cliente2 = new cliente("Jean", 74283492394, 12);
const contaCliente2 = new ContaPoupanca(0, cliente2, 205)

const diretor = new Diretor("Paulo", 10000, 12345678900)
diretor.cadastrarSenha("1234")
const gerente = new Gerente("Sergio", 5000, 12345678901)
gerente.cadastrarSenha("123")

const diretorEstaLogado = SistemaAutenticacao.login(diretor,1234)
const gerenteEstaLogado = SistemaAutenticacao.login(gerente, 123)
const clienteEstaLogado = SistemaAutenticacao.login(cliente1, 1)

console.log(diretorEstaLogado, gerenteEstaLogado, clienteEstaLogado)