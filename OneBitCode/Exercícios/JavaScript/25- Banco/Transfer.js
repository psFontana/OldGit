module.exports = class Transfer {
  constructor(from, to, value, date = new Date()) {
    this.from = from;
    this.to = to;
    this.value = value;
    this.date = date;
  }
};
