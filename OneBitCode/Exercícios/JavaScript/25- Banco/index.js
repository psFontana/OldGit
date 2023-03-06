const App = require("./App");

App.createUser("Paulo", "paulosergiofontana11@gmail.com");
App.createUser("Gabriel", "ramos@hotmail.com");
App.createUser("Matheus", "azrflare@hotmail.com");

App.deposit("paulosergiofontana11@gmail.com", 100);
App.transfer("paulosergiofontana11@gmail.com", "azrflare@hotmail.com", 50);

App.changeLoanFee(10);
App.takeLoan("ramos@hotmail.com", 2000, 24);

console.table(App.findUser("paulosergiofontana11@gmail.com"));
console.table(App.findUser("paulosergiofontana11@gmail.com").account);
console.table(App.findUser("ramos@hotmail.com"));
console.table(App.findUser("ramos@hotmail.com").account);
console.table(App.findUser("azrflare@hotmail.com"));
console.table(App.findUser("azrflare@hotmail.com").account);
