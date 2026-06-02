export default class Ponto {
  constructor(x, y, z = 0) {
    if (![x, y, z].every((n) => typeof n === "number")) {
      throw new TypeError("Coordenadas devem ser números");
    }

    this.x = x;
    this.y = y;
    this.z = z;
  }

  distanciaPara(outroPonto) {
    if (!(outroPonto instanceof Ponto)) {
      throw new TypeError("Parâmetro deve ser um Ponto");
    }

    const dx = this.x - outroPonto.x;
    const dy = this.y - outroPonto.y;
    const dz = this.z - outroPonto.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}
