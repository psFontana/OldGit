function listarVagas() {
  let saida = emprego.reduce(function (textoFinal, vaga, indice) {
    //1. nome (x candidatos)
    textoFinal += indice + ". ";
    textoFinal += vaga.nome;
    textoFinal += " (" + vaga.candidatos.length + " candidatos)\n";
    return textoFinal;
  }, "");
  if (saida == "") {
    alert("Infelizmente não há nenhuma vaga de emprego");
  } else {
    alert(saida);
  }
}

function novaVaga() {
  let vaga = {};

  vaga.nome = prompt("Qual o Nome da nova vaga?");
  vaga.descricao = prompt("Informe uma Descrição para a vaga.");
  vaga.data = prompt("Informe a data limite. (DD/MM/AAAA)");
  vaga.candidatos = [];

  let confirmacao = confirm(
    "Gostaria de adicionar essa nova vaga ao sistema?\n Cargo: " +
      vaga.nome +
      "\n Descrição: " +
      vaga.descricao +
      "\n Data limite: " +
      vaga.data
  );
  if (confirmacao) {
    emprego.push(vaga);
    alert("Vaga criada.");
  }
}

function visualizarVaga() {
  let indice = prompt("Informe o índice da vaga que gostaria de visualizar");
  let vaga = emprego[indice];
  if (indice >= emprego.length || indice < 0) {
    alert(
      "Desculpe, não consegui encontrar uma vaga de emprego correspondente á esse índice, tente novamente."
    );
  } else {
    let saidaCandidatos = vaga.candidatos.reduce(function (saida, nome) {
      return saida + "\n - " + nome;
    }, "");

    alert(
      "Vaga nº " +
        indice +
        "\nCargo: " +
        vaga.nome +
        "\nDescrição: " +
        vaga.descricao +
        "\nData Limite: " +
        vaga.data +
        "\nCandidatos inscritos (" +
        vaga.candidatos.length +
        "):\n" +
        saidaCandidatos
    );
  }
}

function inscreverCandidato() {
  let candidato = prompt("Insira o nome do Candidato.");
  let i = prompt("Insira o índice da vaga pretendente.");
  vaga = emprego[i];
  let confirmacao = confirm(
    "Gostaria de adicionar " +
      candidato +
      " como candidato à seguinte vaga?\n Cargo: " +
      vaga.nome +
      "\n Descrição: " +
      vaga.descricao +
      "\n Data limite: " +
      vaga.data
  );
  if (confirmacao) {
    vaga.candidatos.push(candidato);
    alert("Candidato " + candidato + " adicionado ao sistema.");
  }
}

function excluirVaga() {
  let i = prompt("Qual vaga você gostaria de excluir?");
  let vaga = emprego[i];

  if (i >= emprego.length || i < 0) {
    alert(
      "Desculpe, não consegui encontrar uma vaga de emprego correspondente á esse índice, tente novamente."
    );
  } else {
    let confirmacao = confirm(
      "Deletando vaga nº " +
        i +
        "\nCargo: " +
        vaga.nome +
        "\nDescrição: " +
        vaga.descricao +
        "\nData Limite: " +
        vaga.data
    );
    if (confirmacao) {
      emprego.splice(i, 1);
      alert("Vaga Excluida.");
    }
  }
}

let emprego = [];
let opcao;

do {
  opcao = parseFloat(
    prompt(
      "Bem vindo á Consultoria de Vagas de Emprego 😁\nSelecione uma opção:\n 1.  Listar vagas disponíveis\n 2. Criar um nova vaga\n 3. Visualizar uma vaga \n 4. Inscrever um candidato em uma vaga\n 5. Excluir uma vaga\n 6. Sair."
    )
  );

  switch (opcao) {
    case 1:
      listarVagas();
      break;
    case 2:
      novaVaga();
      break;
    case 3:
      visualizarVaga();
      break;
    case 4:
      inscreverCandidato();
      break;
    case 5:
      excluirVaga();
      break;
    case 6:
      alert("Encerrando sistema...");
      break;
    default:
      alert("escolha uma opção válida.");
      break;
  }
} while (opcao !== 6);
