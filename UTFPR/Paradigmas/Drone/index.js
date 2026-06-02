import Ponto from "./Ponto.js";
import Percurso from "./percurso.js";

a = new Ponto(0, 0);
b = new Ponto(5, 5);

drone = new Percurso();

drone.adicionarPonto(a);
console.log(drone.totalPontos());
drone.adicionarPonto(b);
console.log(drone.totalPontos());

console.log(drone.distanciaTotal());
