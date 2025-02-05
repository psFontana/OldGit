const { Mutex } = require("async-mutex");

let buffer = [];
let limite = 5;
let cheio = false;
const mutex = new Mutex(); // Mutex para evitar condições de corrida

async function produzir() {
  const release = await mutex.acquire(); // Obtém o bloqueio do Mutex
  try {
    console.log("🔵 Obtendo acesso - produtor");
    if (!cheio) {
      while (buffer.length < limite) {
        buffer.push(Math.round(Math.random() * 20));
        console.log(`Produzido: ${buffer}`);
      }
      cheio = true;
      console.log("✅ Buffer cheio! Pronto para consumo.");
    }
  } finally {
    release(); // Libera o Mutex
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

async function consumir() {
  const release = await mutex.acquire(); // Obtém o bloqueio do Mutex
  try {
    console.log("🟢 Obtendo acesso - consumidor");
    if (cheio) {
      while (buffer.length > 0) {
        buffer.shift();
        console.log(`Consumido: ${buffer}`);
      }
      cheio = false;
      console.log("📭 Buffer esvaziado!");
    }
  } finally {
    release(); // Libera o Mutex
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
}

async function iniciar() {
  while (true) {
    await produzir();
    await consumir();
  }
}

iniciar();
