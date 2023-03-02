const Product = require("./Product");

module.exports = class Posters extends Product {
  constructor(name, description, height, width, price, instock = 0) {
    super(`Poster: ${name}`, description, price, instock);
    this.height = height;
    this.width = width;
  }
};
