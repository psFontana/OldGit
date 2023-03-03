const Database = require("./Database");
const Author = require("./entities/Author");
const Book = require("./entities/Book");
const Order = require("./entities/Order");
const Poster = require("./entities/Poster");
const Posters = require("./entities/Poster");
const User = require("./entities/user");

module.exports = class App {
  static #database = new Database();

  createUser(name, email, password) {
    const user = new User(name, email, password);
    App.#database.saveUser(user);
  }
  getUsers() {
    return App.#database.find("users");
  }

  createAuthor(name, nationality, bio) {
    const author = new Author(name, nationality, bio);
    App.#database.saveAuthor(author);
  }

  getAuthors() {
    return App.#database.find("authors");
  }

  createBook(title, synopsis, genre, author, description, price, instock) {
    const book = new Book(
      title,
      synopsis,
      genre,
      author,
      description,
      price,
      instock
    );

    App.#database.saveBook(book);
  }

  addBook(boockName, quantity) {
    App.#database.addBooksToStock(boockName, quantity);
  }

  getBooks() {
    return App.#database.find("books");
  }

  createPoster(name, description, height, width, price, instock) {
    const poster = new Poster(name, description, height, width, price, instock);
    App.#database.savePoster(poster);
  }

  addPoster(name, quantity) {
    App.#database.addPostersToStock(name, quantity);
  }

  getPosters() {
    return App.#database.find("posters");
  }

  createOrder(items, user) {
    const order = new Order(items, user);
    App.#database.saveOrder(order);
    order.data.items.forEach(({ product, quantity }) => {
      if (product instanceof Book) {
        App.#database.removeBooksFromStock(product.name, quantity);
      } else if (product instanceof Poster) {
        App.#database.removePostersFromStock(product.name, quantity);
      }
    });
  }

  getOrders() {
    return App.#database.find("orders");
  }

  showDataBase() {
    App.#database.showStorage();
  }
};
