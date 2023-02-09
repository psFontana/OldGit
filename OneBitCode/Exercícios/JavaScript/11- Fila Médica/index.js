let lista = [];
let opcao = "";
do {
  let saida = "";
  for (i = 0; i < lista.length; i++) {
    saida += i + 1 + ". " + lista[i] + "\n";
  }

  opcao = parseFloat(
    prompt(
      "Olá, a ordem da lista de espera é a seguinte:\n" +
        saida +
        "\nO que deseja fazer?\n 1) Adicionar Paciente á lista de espera.\n 2) Atender o primeiro Paciente da fila.\n 3) Sair."
    )
  );

  switch (opcao) {
    case 1:
      let nome = prompt("Qual o nome do Paciente a ser adicionado na fila?");
      lista.push(nome);
      break;
    case 2:
      let removido = lista.shift();
      if (removido === undefined) {
        alert("Não há pacientes na fila.");
      }
      alert("O Paciente " + removido + " foi atendido.");
      break;
    case 3:
      alert("Encerrando sistema...");
      break;
    default:
      alert("Opcção inválida");
  }
} while (opcao != 3);
