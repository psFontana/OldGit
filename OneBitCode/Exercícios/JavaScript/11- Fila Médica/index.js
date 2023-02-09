let lista = [];
let nome;
pacientes = lista.length;
let opcao = 1;
let saida = "";
while (opcao != 3) {
  opcao = parseFloat(
    prompt(
      "Olá, a ordem da lista de espera é a seguinte:\n" +
        lista +
        "\nO que deseja fazer?\n 1) Adicionar Paciente á lista de espera.\n 2) Atender o primeiro Paciente da fila.\n 3) Sair."
    )
  );

  switch (opcao) {
    case 1:
      nome = prompt("Qual o nome do Paciente a ser adicionado na fila?");
      for (i = 0; i <= pacientes; i++) {
        lista.push(nome + " ");
      }
      break;
    case 2:
      lista.shift();
      break;
    case 3:
      alert("Encerrando sistema...");
      break;
  }
}
