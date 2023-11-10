var Planetas = [];
function createPlanet(name, coordenadas, situacao, satelites) {
    Planetas.push({
        name: name,
        coordenadas: coordenadas,
        situacao: situacao,
        satelites: satelites,
    });
    alert("O Planeta ".concat(name, " foi criado."));
}
function situacaoPlaneta(planet, situacao) {
    planet.situacao = situacao;
}
function addSatelite(planet, nome) {
    planet.satelites.push(nome);
    alert("O satelite" + nome + "foi adicionado ao planeta" + planet);
}
function removeSatelite(planet, nome) {
    planet.satelites = planet.satelites.filter(function (satelite) { return satelite !== nome; });
    alert("O satelite" + nome + "foi removido do planeta" + planet);
}
function listaPlanetas() {
    for (var i = 0; i < Planetas.length; i++) {
        alert("Planeta: ".concat(Planetas[i].name, "\n\nCoordenadas: ").concat(Planetas[i].coordenadas, "\nSitua\u00E7\u00E3o: ").concat(Planetas[i].situacao, "\nSatelites: ").concat(Planetas[i].satelites));
    }
}
