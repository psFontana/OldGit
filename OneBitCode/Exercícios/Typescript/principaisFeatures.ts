// Tipagem para variáveis, objetos, praâmetros e retornos de funções;
//   Tipos primitivos:
let active: boolean = true;
let numero: number = 10;
let frase: string = "Hello World";
let arrayNumber: number[] = [1, 2, 3, 4];

//   Tipos extras:
//     Tuplas:
let point: [number, number, string, boolean];
point = [2, 5, "A", true];
let [x, y] = point;

//     Enums:
enum planets {
  Mercurio = "Mercurio",
  Venus = "Venus",
  Terra = 2,
  Marte,
}

planets.Marte; //retorna 3
planets.Venus; //retorna 'Venus';

//    Tipo Opcional:
function sendSpaceship(spaceship: { pilot: string; copilot?: string }) {
  /*...*/
}
//    Tipo unknow:
let input: unknown;

input = "Test";
input = 20;
input = [];

/*
let text: string
text = input daria erro pois input permitiria que text fosse algo além de string.
*/

//    Tipo any: É um unkown sem correção de erros (não recomendado de se usar)

let inputAny: any;

inputAny = "Test";
inputAny = 20;
inputAny = [];

let text: string;
text = inputAny;

// Criação de nossos próprios tipos e interfaces;

//    Tipo literal: as variaveis literais só podem ser os valores definidos, qualquer outra coisa da erro.
let option: "yes" | "no";
type Planets = "Terra" | "Marte" | "Júpiter";
let planet: Planets;
function checkPlanet(planet: Planets) {
  if (planet === "Terra") {
    console.log("Estamos no planeta: " + planet + "\nNossa terra natal :)");
  }
}
// Checagem de erros pela IDE enquanto escrevemos o código;

// Função de autocompletar da IDE;

// Excelente documentação e suporte da comunidade.
