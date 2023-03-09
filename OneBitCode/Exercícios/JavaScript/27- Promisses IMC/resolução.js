function imc(altura, peso) {
  return new Promise((resolve, reject) => {
    if (typeof altura !== "number" || typeof peso !== "number") {
      reject("por favor, informe apenas números");
    } else {
      resolve(peso / altura ** 2);
    }
  });
}

function showIMC(altura, peso) {
  imc(altura, peso)
    .then((result) => {})
    .catch((err) => {
      console.log(err);
    });

  console.log("Programa iniciado");
}

showIMC(1.86, 60);
showIMC(1.86, 70);
showIMC(1.86, 80);
showIMC(1.86, "bah");
showIMC(1.86, 100);
showIMC(1.86, 120);
showIMC(1.86, 150);
