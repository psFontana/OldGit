const Author = require("./Author");
const Comment = require("./Comment");
const Post = require("./Post");

const asho = new Author("Asho");

const post1 = asho.addPost("Testando", "Isso é um teste");
post1.addComment("Zard", "Funcionou?");
post1.addComment("Asho", "Sim vaia, está funcionando");

console.log(asho);
console.log(post1);

const post2 = asho.addPost("Teste 2", "Eu sei que ja funciona ok?");
post2.addComment("Zard", "Ta testando denovo por que ent imbecíl?");
post2.addComment("Asho", "Porque eu quero, filho daputa >:(");

console.log(asho);
console.log(post2);
