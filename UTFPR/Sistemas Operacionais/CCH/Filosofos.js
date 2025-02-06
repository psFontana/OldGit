const { Mutex } = require("async-mutex");

class Garfo {
    constructor(id) {
        this.id = id;
        this.mutex = new Mutex(); // Cada garfo tem um Mutex para evitar conflitos
    }
}

class Filosofo {
    constructor(id) {
        this.id = id;
        this.garfoEsquerda = null;
        this.garfoDireita = null;
    }

    setGarfos(g1, g2) {
        this.garfoEsquerda = g1;
        this.garfoDireita = g2;
    }

    async comer() {
        const releaseDireita = await this.garfoDireita.mutex.acquire(); // Tenta bloquear o garfo direito
        const releaseEsquerda = await this.garfoEsquerda.mutex.acquire(); // Tenta bloquear o garfo esquerdo

        try {
            console.log(`O filósofo ${this.id} vai comer.`);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula tempo de comer
            console.log(`O filósofo ${this.id} terminou de comer.`);
        } finally {
            releaseDireita(); // Libera o garfo direito
            releaseEsquerda(); // Libera o garfo esquerdo
        }
    }

    async pensar() {
        console.log(`O filósofo ${this.id} está pensando.`);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula tempo de pensamento
    }

    async tentarComerOuPensar() {
        const garfoDireitoDisponivel = this.garfoDireita.mutex.isLocked() === false;
        const garfoEsquerdoDisponivel = this.garfoEsquerda.mutex.isLocked() === false;

        if (garfoDireitoDisponivel && garfoEsquerdoDisponivel) {
            await this.comer(); // Tenta comer se ambos os garfos estiverem disponíveis
        } else {
            await this.pensar(); // Caso contrário, pensa
        }
    }
}

// Criando garfos
const garfo1 = new Garfo(1);
const garfo2 = new Garfo(2);
const garfo3 = new Garfo(3);
const garfo4 = new Garfo(4);
const garfo5 = new Garfo(5);

// Criando filósofos
const filosofo1 = new Filosofo(1);
const filosofo2 = new Filosofo(2);
const filosofo3 = new Filosofo(3);
const filosofo4 = new Filosofo(4);
const filosofo5 = new Filosofo(5);

// Associando garfos aos filósofos
filosofo1.setGarfos(garfo1, garfo2);
filosofo2.setGarfos(garfo2, garfo3);
filosofo3.setGarfos(garfo3, garfo4);
filosofo4.setGarfos(garfo4, garfo5);
filosofo5.setGarfos(garfo5, garfo1);

// Função que simula a ação de tentar comer ou pensar de todos os filósofos
async function iniciarSimulacao() {
    const filosofos = [filosofo1, filosofo2, filosofo3, filosofo4, filosofo5];

    while (true) {
        const promises = filosofos.map(filosofo => filosofo.tentarComerOuPensar());
        await Promise.all(promises); // Todos filósofos tentam comer ou pensar ao mesmo tempo
    }
}

iniciarSimulacao();
