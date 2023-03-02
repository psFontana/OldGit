const Product = require("./Product");

module.exports = class Book extends Product {
  constructor(title, synopsis, genre, author, description, price, instock = 0) {
    super(`Livro: ${title}`, description, price, instock);
    this.title = title;
    this.synopsis = synopsis;
    this.genre = genre;
    this.author = author;
  }
};
