const Deposit = require("./Deposit");
const Loan = require("./Loan");
const Transfer = require("./Transfer");
const User = require("./User");

module.exports = class App {
  static #users = [];

  static findUser(email) {
    const user = this.#users.find((user) => user.email === email);
    return user ?? null;
  }

  static createUser(name, email) {
    const userAlreadyExists = App.findUser(email);
    if (!userAlreadyExists) {
      this.#users.push(new User(name, email));
    }
  }

  static deposit(email, value) {
    const user = App.findUser(email);
    if (user) {
      const newDeposit = new Deposit(value);
      user.account.addDeposit(newDeposit);
    }
  }

  static transfer(fromMail, toMail, value) {
    const depositer = App.findUser(fromMail);
    const receiver = App.findUser(toMail);
    if (depositer && receiver) {
      const newTransfer = new Transfer(depositer, receiver, value);
      depositer.account.addTransfer(newTransfer);
      receiver.account.addTransfer(newTransfer);
    }
  }

  static takeLoan(email, value, installments) {
    const user = App.findUser(email);
    if (user) {
      const newLoan = new Loan(value, installments);
      user.account.addLoan(newLoan);
    }
  }

  static changeLoanFee(newFee) {
    Loan.fee = newFee;
  }
};
