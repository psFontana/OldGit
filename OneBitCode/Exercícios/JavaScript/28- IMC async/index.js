async function imc(altura, peso) {
  if (typeof altura !== "number" || typeof peso !== "number")
    return Promise.reject("Por favor insira apenas números.");
  return peso / altura ** 2;
}

async function showIMC(altura, peso) {
  try {
    console.log(
      `Calculando o IMC de uma pessoa com ${altura}m de altura e ${peso}Kg `
    );
    const result = await imc(altura, peso);
    console.log(`O resultado do cálculo do IMC foi: ${result}.`);
    if (result < 18.5) console.log("Situação: MAGREZA");
    else if (result < 25) console.log("Situação: NORMAL");
    else if (result < 30) console.log("Situação: SOBREPESO");
    else if (result < 40) console.log("Situação: OBESIDADE");
    else console.log("Situação: OBESIDADE GRAVE");
  } catch (err) {
    console.log(err);
  }
}

showIMC(1.86, null);
