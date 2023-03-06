const Installment = require("./Installment");

module.exports = class Loan {
  static #fee = 1.05;

  constructor(totalValue, installments, date = new Date()) {
    this.totalValue = totalValue;
    this.installments = [];
    for (let i = 1; i <= installments; i++) {
      this.installments.push(
        new Installment((totalValue * this.fee) / installments, i)
      );
    }
    this.date = date;
  }

  get fee() {
    return Loan.#fee;
  }

  static set fee(newFee) {
    Loan.#fee = 1 + newFee / 100;
  }
};
