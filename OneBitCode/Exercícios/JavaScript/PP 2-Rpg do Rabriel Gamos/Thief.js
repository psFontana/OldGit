const Character = require("./Character");

class Thief extends Character {
  constructor(nome, hp, atk, def) {
    super(nome, hp, atk, def);
  }
  attack(target) {
    console.log(`${this.name} está atacando ${target.name}`);
    if (target instanceof Character) {
      target.hp -= 2 * (this.atk - target.def);
    }
  }
}

module.exports = Thief;
