export default function createTransactionContainer(id) {
  const transaction = document.createElement("div");
  transaction.classList.add("transaction");
  transaction.id = `transaction-${id}`;
  return transaction;
}

module.exports = createTransactionContainer;
