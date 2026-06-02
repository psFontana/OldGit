import Ponto from "./Ponto.js";

export default class Percurso {
  constructor() {
    this.pontos = [];
  }

  adicionarPontos(...pontos) {
    const lista = pontos.flat();

    for (const ponto of lista) {
      if (!(ponto instanceof Ponto)) {
        throw new TypeError("Todos os itens devem ser instâncias de Ponto");
      }
    }

    this.pontos.push(...lista);
  }

  distanciaTotal() {
    if (this.pontos.length < 2) return 0;

    let total = 0;

    for (let i = 0; i < this.pontos.length - 1; i++) {
      total += this.pontos[i].distanciaPara(this.pontos[i + 1]);
    }

    return total;
  }

  totalPontos() {
    return this.pontos.length;
  }

  ordenarPorVizinhoMaisProximo() {
    if (this.pontos.length < 2) return;

    const naoVisitados = [...this.pontos];
    const ordenado = [];

    let atual = naoVisitados.shift();
    ordenado.push(atual);

    while (naoVisitados.length > 0) {
      let maisProximoIndex = 0;
      let menorDistancia = Infinity;

      for (let i = 0; i < naoVisitados.length; i++) {
        const distancia = atual.distanciaPara(naoVisitados[i]);

        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          maisProximoIndex = i;
        }
      }

      atual = naoVisitados.splice(maisProximoIndex, 1)[0];
      ordenado.push(atual);
    }

    this.pontos = ordenado;
  }
}
