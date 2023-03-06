module.exports = class Installment {
  constructor(value, number, payed = false) {
    this.value = value;
    this.number = number;
    this.payed = payed;
  }
};
