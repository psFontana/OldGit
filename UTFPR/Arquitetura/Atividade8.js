/*
Questão:
    Considere o sistema a seguir:
        O aplicativo BodeMais permite que o cliente monte seu próprio sanduíche, por meio de várias opções de recheios, molhos e saladas. A base do sanduíche é sempre a mesma: dois pães (italiano, integral, etc.) com preços específicos. Já o conteúdo do sanduíche pode ser os mais diversos, e cada opção guarda apenas uma descrição e um preço que será adicionado ao valor total do lanche. O cliente pode colocar mais de um mesmo recheio. O preço do lanche é calculado a partir da soma dos preços de todas as opções de pão, recheio, molhos e saladas. A solução deve permitir que o proprietário modifique os valores dos recheios, assim como adicionar facilmente novos recheios no aplicativo.
        Qual padrão de projeto estrutural poderia ser usado neste exemplo? Justifique e mostre como esse padrão solucionaria este problema.
Resposta:
    Decorator.
Justificativa:
Composição de objetos:
    Cada ingrediente (pão, recheio, molho, salada) é tratado como um objeto individual que "envolve" o sanduíche base, somando-se ao preço total.
Extensibilidade:
    Novos ingredientes podem ser adicionados como decoradores sem necessidade de modificar o código existente.
    É fácil ajustar os preços de ingredientes ao alterar apenas o objeto específico que representa aquele ingrediente.
Reutilização:
    Os mesmos decoradores (como um recheio de queijo ou molho especial) podem ser reutilizados em diferentes combinações de sanduíches.
*/

const precos = {
    paes: {
      Italiano: 5.0,
      Integral: 4.5,
    },
    recheios: {
      Frango: 7.0,
      Queijo: 3.5,
      Presunto: 4.0,
    },
    molhos: {
      Barbecue: 2.0,
      Maionese: 1.5,
      Mostarda: 1.0,
    },
    saladas: {
      Alface: 1.5,
      Tomate: 1.0,
      Cenoura: 1.2,
    },
  };
  
  class Sanduiche {
    constructor(pao) {
      if (!precos.paes[pao]) {
        throw new Error(`Pão ${pao} não encontrado nos preços.`);
      }
      this.descricao = `Sanduíche com pão ${pao}`;
      this.preco = precos.paes[pao];
    }
  
    getDescricao() {
      return this.descricao;
    }
  
    getPreco() {
      return this.preco;
    }
  }
  
  class SanduicheDecorator {
    constructor(sanduiche) {
      this.sanduiche = sanduiche;
    }
  
    getDescricao() {
      return this.sanduiche.getDescricao();
    }
  
    getPreco() {
      return this.sanduiche.getPreco();
    }
  }
  
  class Recheio extends SanduicheDecorator {
    constructor(sanduiche, nome) {
      super(sanduiche);
      if (!precos.recheios[nome]) {
        throw new Error(`Recheio ${nome} não encontrado nos preços.`);
      }
      this.nome = nome;
    }
  
    getDescricao() {
      return `${this.sanduiche.getDescricao()}, ${this.nome}`;
    }
  
    getPreco() {
      return this.sanduiche.getPreco() + precos.recheios[this.nome];
    }
  }
  
  class Molho extends SanduicheDecorator {
    constructor(sanduiche, nome) {
      super(sanduiche);
      if (!precos.molhos[nome]) {
        throw new Error(`Molho ${nome} não encontrado nos preços.`);
      }
      this.nome = nome;
    }
  
    getDescricao() {
      return `${this.sanduiche.getDescricao()}, ${this.nome}`;
    }
  
    getPreco() {
      return this.sanduiche.getPreco() + precos.molhos[this.nome];
    }
  }
  
  class Salada extends SanduicheDecorator {
    constructor(sanduiche, nome) {
      super(sanduiche);
      if (!precos.saladas[nome]) {
        throw new Error(`Salada ${nome} não encontrada nos preços.`);
      }
      this.nome = nome;
    }
  
    getDescricao() {
      return `${this.sanduiche.getDescricao()}, ${this.nome}`;
    }
  
    getPreco() {
      return this.sanduiche.getPreco() + precos.saladas[this.nome];
    }
  }
  
  // Montagem do sanduíche
  let meuSanduiche = new Sanduiche("Italiano");
  
  meuSanduiche = new Recheio(meuSanduiche, "Frango");
  meuSanduiche = new Recheio(meuSanduiche, "Queijo");
  
  meuSanduiche = new Molho(meuSanduiche, "Barbecue");
  
  meuSanduiche = new Salada(meuSanduiche, "Alface");
  
  console.log("Descrição do sanduíche:", meuSanduiche.getDescricao());
  console.log("Preço total do sanduíche: R$", meuSanduiche.getPreco().toFixed(2));
  