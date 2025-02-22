class Garfo {
    constructor(id) {
        this.id = id;
        this.disponivel = true;
    }

    async pegar() {
        while (!this.disponivel) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        this.disponivel = false;
    }

    async largar() {
        this.disponivel = true;
    }
}

class Filosofo {
    constructor(id, garfoEsquerda, garfoDireita) {
        this.id = id;
        this.garfoEsquerda = garfoEsquerda;
        this.garfoDireita = garfoDireita;
    }

    async comer() {
        while (true) {
            const tempoPensando = Math.random() * 1000;
            console.log(`[${new Date().toISOString()}] Filósofo ${this.id} está pensando...`);
            await new Promise(resolve => setTimeout(resolve, tempoPensando));

            console.log(`[${new Date().toISOString()}] Filósofo ${this.id} quer comer...`);
            await this.garfoEsquerda.pegar();
            console.log(`[${new Date().toISOString()}] Filósofo ${this.id} pegou o garfo da esquerda (${this.garfoEsquerda.id})`);

            await this.garfoDireita.pegar();
            console.log(`[${new Date().toISOString()}] Filósofo ${this.id} pegou o garfo da direita (${this.garfoDireita.id})`);

            console.log(`[${new Date().toISOString()}] Filósofo ${this.id} está comendo com os garfos (${this.garfoDireita.id}) e (${this.garfoEsquerda.id})...`);
            const tempoComendo = Math.random() * 1000;
            await new Promise(resolve => setTimeout(resolve, tempoComendo));

            await this.garfoDireita.largar();
            console.log(`[${new Date().toISOString()}] Filósofo ${this.id} devolveu o garfo da direita (${this.garfoDireita.id})`);

            await this.garfoEsquerda.largar();
            console.log(`[${new Date().toISOString()}] Filósofo ${this.id} devolveu o garfo da esquerda (${this.garfoEsquerda.id})`);
        }
    }
}

const numFilosofos = 5;
const garfos = Array.from({ length: numFilosofos }, (_, i) => new Garfo(i));
const filosofos = garfos.map((garfo, i) => new Filosofo(i, garfo, garfos[(i + 1) % numFilosofos]));

async function iniciarJantar() {
    const promessasJantar = filosofos.map(filosofo => filosofo.comer());
    await Promise.all(promessasJantar);
}

iniciarJantar();