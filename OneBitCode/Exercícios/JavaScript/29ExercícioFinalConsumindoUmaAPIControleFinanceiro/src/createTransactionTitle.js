export default function createTransactionTitle(name) {
  const title = document.createElement("span");
  title.classList.add("transaction-title");
  title.textContent = name;
  return title;
}
