module.exports = class Product {
  constructor(name, description, price, instock = 0) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.instock = instock;
  }

  addToStock(quantity) {
    this.instock += quantity;
  }

  removeFromStock(quantity) {
    this.instock - +quantity;
  }
};
