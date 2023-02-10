let opcao;

function triangulo(x, y) {
  return (x * y) / 2;
}

function retangulo(x, y) {
  return x * y;
}

function trapezio(x, y, z) {
  return ((x + y) * z) / 2;
}

function circulo(x) {
  return 3.14 * x * x;
}

do {
  opcao = parseFloat(
    prompt(
      "Olá, gostaria de calcular a área de qual forma geométrica?\n 1. Triângulo.\n 2. Retângulo.\n 3. Quadrado.\n 4. Trapézio\n 5. Círculo.\n 6. Sair."
    )
  );

  let base;
  let altura;

  switch (opcao) {
    case 1:
      base = parseFloat(prompt("Qual a medida da base?"));
      altura = parseFloat(prompt("Qual a altura?"));
      alert(
        "As medidas do triângulo informado são:\nBase: " +
          base +
          "\nAltura: " +
          altura +
          "\nÁrea: " +
          triangulo(base, altura)
      );
      break;
    case 2:
      base = parseFloat(prompt("Qual a medida de um dos lados?"));
      altura = parseFloat(prompt("Qual a medida do outro lado?"));
      alert(
        "A área do retangulo com lados " +
          base +
          " e " +
          altura +
          " é de: " +
          retangulo(base, altura)
      );
      break;
    case 3:
      base = parseFloat(prompt("Qual o lado do quadrado?"));
      alert(
        "A área do quadrado de lado " + base + " é: " + retangulo(base, base)
      );
      break;
    case 4:
      base = parseFloat(prompt("Qual a medida da base menor?"));
      let basem = parseFloat(prompt("Qual a medida da base maior?"));
      altura = parseFloat(prompt("Qual a altura?"));
      alert(
        "As medidas do trapézio informado são:\n Base Menor: " +
          base +
          "\n Base Maior: " +
          basem +
          "\n Altura: " +
          altura +
          "\n Área: " +
          trapezio(base, basem, altura)
      );
      break;
    case 5:
      base = prompt("Qual o raio do círculo?");
      alert("A área do círculo de raio " + base + " é: " + circulo(base));
      break;
    case 6:
      alert("Encerrando sistema...");
      break;
    default:
      alert("Escolha uma opção válida");
  }
} while (opcao !== 6);
