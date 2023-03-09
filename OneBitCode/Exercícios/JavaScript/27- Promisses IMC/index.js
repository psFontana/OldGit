function calculaIMC(altura, peso) {
  imc = peso / (altura * altura);
  return new Promise((resolve, reject) => {
    if (isNaN(imc)) {
      reject("informe apenas números.");
    } else {
      resolve(imc);
    }
  });
}

function informaMedidas(altura, peso) {
  calculaIMC(altura, peso)
    .then((result) => {
      if (result < 18.5) {
        console.log("você ta muito magrin fi");
      } else if (result < 25) {
        console.log("brabo ein");
      } else if (result < 30) {
        console.log("bora de dieta?");
      } else if (result < 40) {
        console.log("dietinha e academia, bora bora bora");
      } else {
        console.log("como vc vive?");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(imc);
}

informaMedidas(1.85, "oi");
