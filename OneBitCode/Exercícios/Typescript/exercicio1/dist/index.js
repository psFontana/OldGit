var spaceships = [];
function createSpaceship(name, pilot, crewLimit) {
    var spaceship = {
        name: name,
        pilot: pilot,
        crewLimit: crewLimit,
        crew: [],
        inMission: false,
    };
    spaceships.push(spaceship);
    return spaceship;
}
function addCrew(spaceship, name) {
    if (spaceship.crewLimit > spaceship.crew.length) {
        spaceship.crew.push(name);
    }
    else {
        alert("Tripulação máxima atingida :c");
    }
}
function sendSpaceship(spaceship) {
    if (spaceship.crew.length >= spaceship.crewLimit / 3) {
        alert("A nave ".concat(spaceship.name, " est\u00E1 sendo enviada para uma miss\u00E3o :)"));
        spaceship.inMission = true;
    }
    else {
        alert("Não há tripulantes o suficiente :c");
    }
}
function listaNaves() {
    for (var i = 0; i < spaceships.length; i++) {
        alert("Nave: ".concat(spaceships[i].name, "\n\nCapit\u00E3o: ").concat(spaceships[i].pilot, "\nLimite de tripula\u00E7\u00E3o: ").concat(spaceships[i].crewLimit, "\nTripula\u00E7\u00E3o atual: ").concat(spaceships[i].crew, "\nEm miss\u00E3o: ").concat(spaceships[i].inMission ? "Sim" : "Não"));
    }
}
var option;
do {
    option = Number(prompt("O que você gostaria de fazer? \n1- Criar uma Nave \n2- Adicionar um tripulante numa nave \n3-Enviar uma nave em uma missão \n4- Listar todas as naves \n5- Sair"));
    switch (option) {
        case 1:
            createSpaceship(prompt("Escolha o nome da nave"), prompt("Quem será o Capitão?"), Number(prompt("Qual o limite de tripulação?")));
            break;
        case 2:
            var nomeNave = prompt("Em qual nave você quer adicionar tripulação?");
            var naveEscolhida = null;
            for (var i = 0; i < spaceships.length; i++) {
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
            for (var i = 0; i < spaceships.length; i++) {
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
