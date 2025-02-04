let buffer = [];
let limite = 5;
let cheio = false;

async function produzir() {
  console.log("Obtendo acesso - produtor");
  if (tentarAcesso("produtor")) {
    while (!cheio) {
      buffer.push(Math.round(Math.random() * 20));
      console.log(buffer);
      cheio = buffer.length == limite ? true : false;
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

async function consumir() {
  console.log("Obtendo acesso - consumidor");
  if (tentarAcesso("consumidor")) {
    while (buffer.length != 0) {
      buffer.shift();
      console.log(buffer);
    }
    cheio = false;
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
}

function tentarAcesso(who) {
  if (who == "produtor" && cheio == false) {
    console.log("Acesso permitido para o produtor");
    return true;
  } else if (who == "consumidor" && cheio == true) {
    console.log("Acesso permitido para o consumidor");
    return true;
  } else {
    console.log("Acesso negado");
    return false;
  }
}

async function iniciar() {
  while (true) {
    await produzir(); // Chama a função de produzir
    await consumir(); // Chama a função de consumir
  }
}

iniciar();
