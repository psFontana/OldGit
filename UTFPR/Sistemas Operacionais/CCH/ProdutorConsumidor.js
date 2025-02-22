class Buffer {
  constructor(tamanho) {
      this.tamanho = tamanho;
      this.buffer = [];
      this.produtoresEsperando = [];
      this.consumidoresEsperando = [];
  }

  async produzir(item) {
      if (this.buffer.length >= this.tamanho) {
          await new Promise(resolve => this.produtoresEsperando.push(resolve));
      }
      this.buffer.push(item);
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] Produzido: ${item} | Buffer: [${this.buffer.join(', ')}]`);
      if (this.consumidoresEsperando.length > 0) {
          this.consumidoresEsperando.shift()();
      }
  }

  async consumir() {
      if (this.buffer.length === 0) {
          await new Promise(resolve => this.consumidoresEsperando.push(resolve));
      }
      const item = this.buffer.shift();
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] Consumido: ${item} | Buffer: [${this.buffer.join(', ')}]`);
      if (this.produtoresEsperando.length > 0) {
          this.produtoresEsperando.shift()();
      }
      return item;
  }
}

const buffer = new Buffer(5);

async function produtor(id) {
  for (let i = 0; i < 10; i++) {
      await buffer.produzir(`Item ${i} do Produtor ${id}`);
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
  }
}

async function consumidor(id) {
  for (let i = 0; i < 10; i++) {
      await buffer.consumir();
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1500));
  }
}

const produtores = [produtor(1), produtor(2)];
const consumidores = [consumidor(1), consumidor(2)];

Promise.all([...produtores, ...consumidores]).then(() => {
  console.log('Produção e consumo concluídos.');
});