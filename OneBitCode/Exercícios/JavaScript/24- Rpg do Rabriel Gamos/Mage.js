const Character = require("./Character");

class Mage extends Character {
  constructor(nome, hp, atk, def, mana) {
    super(nome, hp, atk, def);
    this.mana = mana;
  }
  attack(target) {
    console.log(`${this.name} está atacando ${target.name}`);
    if (target instanceof Character) {
      target.hp -= this.atk + this.mana - target.def;
    }
  }

  heal(target) {
    if (target instanceof Character) {
      target.hp += this.mana * 2;
    }
  }
}

module.exports = Mage;
