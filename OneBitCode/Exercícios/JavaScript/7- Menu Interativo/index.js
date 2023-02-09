while (true) {
  let escolha = parseFloat(
    prompt(
      "Escolha uma opção:\n \n 1) Opção 1\n 2) Opção 2\n 3) Opção 3\n 4) Opção 4\n 5) Sair"
    )
  );
  switch (escolha) {
    case 1:
      alert("Opção 1 escolhida");
      break;
    case 2:
      alert("Opção 2 escolhida");
      break;
    case 3:
      alert("Opção 3 escolhida");
      break;
    case 4:
      alert("Opção 4 escolhida");
      break;
    case 5:
      alert("Encerrando o sistema");
      break;
  }
  if (escolha === 5) {
    break;
  }
}
