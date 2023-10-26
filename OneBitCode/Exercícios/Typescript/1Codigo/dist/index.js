function sendSpaceship(name, capitain) {
    var spaceship = {
        name: name,
        capitain: capitain,
        speed: 20,
        inMission: true,
        crew: [],
    };
    alert("A nave ".concat(spaceship.name, " comandada pelo capit\u00E3o ").concat(spaceship.capitain, " foi enviada em uma miss\u00E3o"));
    return spaceship;
}
function accelerate(targetSpeed, spaceship) {
    if (spaceship.speed > targetSpeed) {
        alert("Reduzindo a velodidade da ".concat(spaceship.name, " para ").concat(targetSpeed, "..."));
    }
    else if (spaceship.speed < targetSpeed) {
        alert("Aumentando a velodidade da ".concat(spaceship.name, " para ").concat(targetSpeed, "..."));
    }
    else {
        alert("Mantendo a velocidade da ".concat(spaceship.name));
    }
}
var spaceshipName = prompt("Insira o nome da nave a ser enviada.");
var spaceshipCaptain = prompt("Insira o nome do capit\u00E3o da nave.");
var currentShip = sendSpaceship(spaceshipName, spaceshipCaptain);
var speed = Number(prompt("Insira a velocidade para a qual deseja acelerar"));
accelerate(speed, currentShip);
