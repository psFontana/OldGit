import createTransactionAmount from "./createTransactionAmount";
import createTransactionContainer from "./createTransactionContainer";
import createTransactionTitle from "./createTransactionTitle";

export default function renderTransaction(transaction) {
  const Transactioncontainer = createTransactionContainer(transaction.id);
  const title = createTransactionTitle(transaction.name);
  const amount = createTransactionAmount(transaction.amount);

  Transactioncontainer.append(title, amount);
  document.querySelector("#transactions").append(Transactioncontainer);
}
