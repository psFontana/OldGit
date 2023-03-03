const App = require("./App");

const app = new App();

app.createAuthor("Rabriel", "Brazilian", "...");
app.createAuthor("Gamos", "Brazilian", "....");

const authors = app.getAuthors();

app.createBook(
  "Beltrão Z",
  "Apocalipse zumbi em Beltrão",
  "Zombies",
  authors[0],
  "...",
  300,
  1
);

app.createBook("Genesis", "...", "Fiction", authors[1], "....", 20, 100);

const books = app.getBooks();

app.createUser("Paulo", "paulosergiofontana11@gmail.com", "123");

const users = app.getUsers();

app.showDataBase();

const items = [
  { product: books[0], quantity: 1 },
  { product: books[1], quantity: 10 },
];

app.createOrder(items, users[0]);
app.showDataBase();
