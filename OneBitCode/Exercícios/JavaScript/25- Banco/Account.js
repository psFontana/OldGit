module.exports = class Account {
  #balance;
  // #deposits
  // #loans
  // #transfers

  constructor(user) {
    this.owner = user;
    this.#balance = 0;
    this.deposits = [];
    this.loans = [];
    this.transfers = [];
  }

  get balance() {
    return this.#balance;
  }

  addDeposit(deposit) {
    this.#balance += deposit.value;
    this.deposits.push(deposit);
  }

  addLoan(loan) {
    this.#balance = +loan.value;
    this.loans.push(loan);
  }

  addTransfer(transfer) {
    if (transfer.to.email === this.owner.email) {
      this.#balance += transfer.value;
      this.transfers.push(transfer);
    } else if (transfer.from.email === this.owner.email) {
      this.#balance -= transfer.value;
      this.transfers.push(transfer);
    }
  }
};
