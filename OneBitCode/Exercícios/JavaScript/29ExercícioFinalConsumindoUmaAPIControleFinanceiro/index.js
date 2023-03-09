let transactions = [];

function createTransactionContainer(id) {
  const transaction = document.createElement("div");
  transaction.classList.add("transaction");
  transaction.id = `transaction-${id}`;
  return transaction;
}

function createTransactionTitle(name) {
  const title = document.createElement("span");
  title.classList.add("transaction-title");
  title.textContent = name;
  return title;
}

function createTransactionAmount(amount) {
  const span = document.createElement("span");
  span.classList.add("transaction-amount");
  const formater = Intl.NumberFormat("pt-BR", {
    compactDisplay: "long",
    currency: "BRL",
    style: "currency",
  });
  const formatedAmount = formater.format(amount);
  if (amount > 0) {
    span.textContent = `${formatedAmount} +`;
    span.classList.add("credit");
  } else {
    span.textContent = `${formatedAmount} -`;
    span.classList.add("debit");
  }
  return span;
}

function createEditTransactionBtn(transaction) {
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.textContent = "Editar";
  editBtn.addEventListener("click", () => {
    document.getElementById("id").value = transaction.id;
    document.getElementById("name").value = transaction.name;
    document.getElementById("amount").value = transaction.amount;
  });
  return editBtn;
}

function createDeleteTransactionBtn(id) {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Excluir";
  deleteBtn.addEventListener("click", async () => {
    await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "DELETE",
    });
    deleteBtn.parentElement.remove();
    const indexToRemove = transactions.findIndex((t) => {
      t.id === id;
      transactions.splice(indexToRemove, 1);
      updateBalance();
    });
  });
  return deleteBtn;
}

function renderTransaction(transaction) {
  const Transactioncontainer = createTransactionContainer(transaction.id);
  const title = createTransactionTitle(transaction.name);
  const amount = createTransactionAmount(transaction.amount);
  const editBtn = createEditTransactionBtn(transaction);
  const deleteBtn = createDeleteTransactionBtn(transaction.id);

  Transactioncontainer.append(title, amount, editBtn, deleteBtn);
  document.querySelector("#transactions").append(Transactioncontainer);
}

async function saveTransaction(ev) {
  ev.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (id) {
    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, amount }),
      headers: { "content-type": "application/json" },
    });
    const transaction = await response.json();
    const indexToRemove = transactions.findIndex((t) => t.id === id);
    transactions.splice(indexToRemove, 1, transaction);
    document.getElementById(`transaction-${id}`).remove();
    renderTransaction(transaction);
  } else {
    const response = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      body: JSON.stringify({ name, amount }),
      headers: { "content-type": "application/json" },
    });
    const transaction = await response.json();
    transaction.push(transaction);
    renderTransaction(transaction);
  }

  ev.target.reset();
  updateBalance();
}

async function fetchTransactions() {
  return await fetch("http://localhost:3000/transactions").then((res) =>
    res.json()
  );
}

function updateBalance() {
  const balanceSpan = document.getElementById("balance");
  const balance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const formater = Intl.NumberFormat("pt-BR", {
    compactDisplay: "long",
    currency: "BRL",
    style: "currency",
  });

  balanceSpan.textContent = formater.format(balance);
}

async function setup() {
  const results = await fetchTransactions();
  transactions.push(...results);
  transactions.forEach(renderTransaction);
  updateBalance();
}
document.addEventListener("DOMContentLoaded", setup);
document.querySelector("form").addEventListener("submit", saveTransaction);
