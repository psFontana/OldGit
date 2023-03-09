export default function createTransactionAmount(amount) {
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
