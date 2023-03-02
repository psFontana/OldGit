class Character {
  constructor(name, hp, atk, def) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
  }

  attack(target) {
    console.log(`${this.name} está atacando ${target.name}`);
    if (target instanceof Character) {
      target.hp -= this.atk - target.def;
    }
  }
}

module.exports = Character;
