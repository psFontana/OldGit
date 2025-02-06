const { Mutex } = require("async-mutex");

let buffer = [];
let limite = 5;
const mutex = new Mutex(); // Mutex para evitar condições de corrida

async function produzir() {
  const release = await mutex.acquire(); // Obtém o bloqueio do Mutex
  try {
    console.log("🔵 Obtendo acesso - produtor");
    if (buffer.length < limite) {
      console.log("🟢 Acesso concedido - produtor");
      while (buffer.length < limite) {
        buffer.push(Math.round(Math.random() * 20));
        console.log(`Produzido: ${buffer}`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula tempo de produção
      }
      console.log("✅ Buffer cheio! Pronto para consumo.");
    } else {
      console.log("🔴 Acesso negado - produtor");
    }
  } finally {
    release(); // Libera o Mutex
  }
}

async function consumir() {
  const release = await mutex.acquire(); // Obtém o bloqueio do Mutex
  try {
    console.log("🔵 Obtendo acesso - consumidor");
    if (buffer.length == limite) {
      console.log("🟢 Acesso concedido - consumidor");
      while (buffer.length > 0) {
        buffer.shift();
        console.log(`Consumido: ${buffer}`);
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simula tempo de consumo
      }
      console.log("📭 Buffer consumido!");
    } else {
      console.log("🔴 Acesso negado - consumidor");
    }
  } finally {
    release(); // Libera o Mutex
  }
}

async function iniciar() {
  while (true) {
    await consumir();
    await produzir();
  }
}

iniciar();
