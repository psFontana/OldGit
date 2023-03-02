const Character = require("./Character");

class Warrior extends Character {
  constructor(nome, hp, atk, def, shield, isAttacking = false) {
    super(nome, hp, atk, def);
    this.shield = shield;
    this.isAttacking = isAttacking;

    if (!this.isAttacking) {
      this.def += this.shield;
    }
  }

  alternatePosition() {
    if (this.isAttacking === false) {
      this.isAttacking = true;
      console.log(`${this.name} agora está em posição de ataque`);
    } else {
      this.isAttacking = false;
      console.log(`${this.name} agora está em posição de defesa`);
    }
  }

  attack(target) {
    console.log(`${this.name} está atacando ${target.name}`);
    if (target instanceof Character && this.isAttacking === true) {
      target.hp -= this.atk - target.def;
    } else {
      console.log(
        `${this.name} não pode atacar pois está em posição de defesa.`
      );
    }
  }
}

module.exports = Warrior;
