let spaceships = [];

function createSpaceship(name: string, pilot: string, crewLimit: number) {
  const spaceship = {
    name,
    pilot,
    crewLimit,
    crew: [],
    inMission: false,
  };
  spaceships.push(spaceship);
  return spaceship;
}

function addCrew(
  spaceship: {
    name: string;
    pilot: string;
    crewLimit: number;
    crew: string[];
    inMission: boolean;
  },
  name: string
) {
  if (spaceship.crewLimit > spaceship.crew.length) {
    spaceship.crew.push(name);
  } else {
    alert("Tripulação máxima atingida :c");
  }
}

function sendSpaceship(spaceship: {
  name: string;
  pilot: string;
  crewLimit: number;
  crew: string[];
  inMission: boolean;
}) {
  if (spaceship.crew.length >= spaceship.crewLimit / 3) {
    alert(`A nave ${spaceship.name} está sendo enviada para uma missão :)`);
    spaceship.inMission = true;
  } else {
    alert("Não há tripulantes o suficiente :c");
  }
}

function listaNaves() {
  for (let i = 0; i < spaceships.length; i++) {
    alert(
      `Nave: ${spaceships[i].name}\n\nCapitão: ${
        spaceships[i].pilot
      }\nLimite de tripulação: ${spaceships[i].crewLimit}\nTripulação atual: ${
        spaceships[i].crew
      }\nEm missão: ${spaceships[i].inMission ? "Sim" : "Não"}`
    );
  }
}
let option;
do {
  option = Number(
    prompt(
      "O que você gostaria de fazer? \n1- Criar uma Nave \n2- Adicionar um tripulante numa nave \n3-Enviar uma nave em uma missão \n4- Listar todas as naves \n5- Sair"
    )
  );

  switch (option) {
    case 1:
      createSpaceship(
        prompt("Escolha o nome da nave"),
        prompt("Quem será o Capitão?"),
        Number(prompt("Qual o limite de tripulação?"))
      );
      break;

    case 2:
      let nomeNave = prompt("Em qual nave você quer adicionar tripulação?");
      let naveEscolhida = null;
      for (let i = 0; i < spaceships.length; i++) {
        if (nomeNave == spaceships[i].name) {
          naveEscolhida = spaceships[i];
        }
      }
      if (naveEscolhida == null) {
        alert("Nave Inválida, tente novamente");
        break;
      }
      addCrew(naveEscolhida, prompt("Qual o nome do novo tripulante?"));
      break;

    case 3:
      nomeNave = prompt("Em qual nave você quer adicionar tripulação?");
      naveEscolhida = null;
      for (let i = 0; i < spaceships.length; i++) {
        if (nomeNave == spaceships[i].name) {
          naveEscolhida = spaceships[i];
        }
      }
      if (naveEscolhida == null) {
        alert("Nave Inválida, tente novamente");
        break;
      }
      sendSpaceship(naveEscolhida);
      break;

    case 4:
      listaNaves();
      break;

    case 5:
      alert("Encerrando Sistema :c");
      break;

    default:
      break;
  }
} while (option != 5);