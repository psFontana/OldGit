class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.inStock = 0;
  }

  addToStock(quantity) {
    this.inStock += quantity;
  }

  calculateDiscount(percentage) {
    let novoPreco = this.price * (1 - percentage / 100);
    return novoPreco;
  }
}

let viagra = new Product(
  "Viagra",
  "Remédio Sagrado para idosos afim de se divertir",
  6.5
);

console.log(viagra);
viagra.addToStock(3);
console.log(viagra);
console.log(viagra.calculateDiscount(50));
viagra.addToStock(3);
viagra.addToStock(4);
console.log(viagra);
