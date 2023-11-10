type Coordenates = [number, number, number, number];
type Situation = "habitado" | "habitavel" | "inabitavel" | "inexplorado";

type Planet = {
  name: string;
  coordenadas: Coordenates;
  situacao: Situation;
  satelites: string[];
};

let Planetas: Planet[] = [];

function createPlanet(
  name: string,
  coordenadas: [x: number, y: number, z: number, w: number],
  situacao: "habitado" | "habitavel" | "inabitavel" | "inexplorado",
  satelites: string[]
) {
  Planetas.push({
    name,
    coordenadas,
    situacao,
    satelites,
  });

  alert(`O Planeta ${name} foi criado.`);
}

function situacaoPlaneta(planet: Planet, situacao: Situation) {
  planet.situacao = situacao;
}

function addSatelite(planet: Planet, nome: string) {
  planet.satelites.push(nome);
  alert("O satelite" + nome + "foi adicionado ao planeta" + planet);
}

function removeSatelite(planet: Planet, nome: string) {
  planet.satelites = planet.satelites.filter((satelite) => satelite !== nome);
  alert("O satelite" + nome + "foi removido do planeta" + planet);
}

function listaPlanetas() {
  for (let i = 0; i < Planetas.length; i++) {
    alert(
      `Planeta: ${Planetas[i].name}\n\nCoordenadas: ${Planetas[i].coordenadas}\nSituação: ${Planetas[i].situacao}\nSatelites: ${Planetas[i].satelites}`
    );
  }
}
