module.exports = class Deposit {
  constructor(value, date = new Date()) {
    this.value = value;
    this.createdAt = date;
  }
};
