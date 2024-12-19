/*
Questão:
  Considere o sistema a seguir:
    Em uma empresa existem diferentes cargos, e para cada cargo existem regras de cálculo de imposto, o qual deve ser taxado de acordo com o salário base do funcionário. Por exemplo, um desenvolvedor tem imposto de 15% se seu salário for maior que R$2000, o gerente deve ter imposto de 20% se seu salário for maior que R$3500, etc. O código de cálculo do imposto não deve estar misturado à estrutura do objeto que representa o funcionário, mas apenas utilizar dados desse objeto.
    Qual padrão de projeto comportamental poderia ser usado nesse exemplo? Justifique e mostre como esse padrão solucionaria esse problema.
Resposta 1:
  Strategy.
Justificativa:
Separação de responsabilidades:
  O cálculo de imposto (regra de negócio) é encapsulado em classes distintas, separadas da lógica de definição do funcionário.
  O objeto Funcionario não precisa ter conhecimento das regras de cálculo, mas apenas fornecer os dados necessários (salário, cargo, etc.).
Facilidade de extensão:
  Novas regras de cálculo podem ser adicionadas criando novas classes de estratégia sem modificar o código existente.
Reuso e flexibilidade:
  As estratégias podem ser reusadas em diferentes contextos ou tipos de sistemas.
*/
class ImpostoDesenvolvedor {
  calcular(salario) {
    return salario > 2000 ? salario * 0.15 : salario * 0.1;
  }
}

class ImpostoGerente {
  calcular(salario) {
    return salario > 3500 ? salario * 0.2 : salario * 0.15;
  }
}

class ImpostoEstagiario {
  calcular(salario) {
    return salario * 0.05;
  }
}

class CalculadoraImposto {
  constructor() {
    this.strategies = {
      Desenvolvedor: new ImpostoDesenvolvedor(),
      Gerente: new ImpostoGerente(),
      Estagiario: new ImpostoEstagiario(),
    };
  }

  calcularImposto(funcionario) {
    const strategy = this.strategies[funcionario.cargo];
    if (!strategy) {
      throw new Error(
        `Cargo "${funcionario.cargo}" não possui regra de imposto definida.`
      );
    }
    return strategy.calcular(funcionario.salario);
  }
}

class Funcionario {
  constructor(nome, cargo, salario) {
    this.nome = nome;
    this.cargo = cargo;
    this.salario = salario;
  }
}

const calculadora = new CalculadoraImposto();

const funcionario1 = new Funcionario("Ana", "Desenvolvedor", 2500);
const funcionario2 = new Funcionario("Carlos", "Gerente", 4000);
const funcionario3 = new Funcionario("João", "Estagiario", 1200);

console.log(
  `${funcionario1.nome} paga R$${calculadora
    .calcularImposto(funcionario1)
    .toFixed(2)} de imposto.`
);
console.log(
  `${funcionario2.nome} paga R$${calculadora
    .calcularImposto(funcionario2)
    .toFixed(2)} de imposto.`
);
console.log(
  `${funcionario3.nome} paga R$${calculadora
    .calcularImposto(funcionario3)
    .toFixed(2)} de imposto.`
);

/*
Resposta2:
  Adapter
Justificativa:
  Separação de responsabilidades:
    A lógica de cálculo do imposto é centralizada na classe CalculadoraImpostoA, e a responsabilidade de adaptar essa lógica para a classe FuncionarioA é realizada pelo CalculadoraImpostoAdapter. O FuncionarioA não precisa conhecer os detalhes de como o imposto é calculado, apenas fornece as informações necessárias (salário, cargo, etc.) para o adapter, que chama o método correto de cálculo.
  Facilidade de extensão:
    Novas regras de cálculo podem ser adicionadas diretamente na classe CalculadoraImpostoA, sem necessidade de modificar o código das classes de FuncionarioA ou CalculadoraImpostoAdapter. Caso seja necessário implementar um novo cargo com uma regra diferente, basta adicionar um novo método na CalculadoraImpostoA.
  Reuso e flexibilidade:
    O CalculadoraImpostoAdapter pode ser reutilizado em outros contextos que necessitem calcular impostos, pois ele oferece uma interface unificada para diferentes cargos. Além disso, o uso do static na classe FuncionarioA permite que a instância do adapter seja compartilhada por todas as instâncias de funcionário, evitando a duplicação de código e tornando o sistema mais eficiente.
*/

class CalculadoraImpostoA {
  calcularImpostoDev(salario) {
    return salario > 2000 ? salario * 0.15 : salario * 0.1;
  }

  calcularImpostoGerente(salario) {
    return salario > 3500 ? salario * 0.2 : salario * 0.15;
  }

  calcularImpostoEstagiario(salario) {
    return salario * 0.05;
  }
}

class CalculadoraImpostoAdapter {
  constructor() {
    this.calculadora = new CalculadoraImpostoA();
  }

  calcular(cargo, salario) {
    switch (cargo) {
      case "Desenvolvedor":
        return this.calculadora.calcularImpostoDev(salario);
      case "Gerente":
        return this.calculadora.calcularImpostoGerente(salario);
      case "Estagiario":
        return this.calculadora.calcularImpostoEstagiario(salario);
      default:
        throw new Error(
          `Cargo "${cargo}" não possui regra de imposto definida.`
        );
    }
  }
}

class FuncionarioA {
  static calculadoraAdapter = new CalculadoraImpostoAdapter(); // Instância única compartilhada por todos os funcionários

  constructor(nome, cargo, salario) {
    this.nome = nome;
    this.cargo = cargo;
    this.salario = salario;
  }

  calcularImposto() {
    return FuncionarioA.calculadoraAdapter.calcular(this.cargo, this.salario);
  }
}

const funcionario4 = new FuncionarioA("Ana", "Desenvolvedor", 2500);
const funcionario5 = new FuncionarioA("Carlos", "Gerente", 4000);
const funcionario6 = new FuncionarioA("João", "Estagiario", 1200);

console.log(
  `${funcionario4.nome} paga R$${funcionario4
    .calcularImposto()
    .toFixed(2)} de imposto.`
);
console.log(
  `${funcionario5.nome} paga R$${funcionario5
    .calcularImposto()
    .toFixed(2)} de imposto.`
);
console.log(
  `${funcionario6.nome} paga R$${funcionario6
    .calcularImposto()
    .toFixed(2)} de imposto.`
);
