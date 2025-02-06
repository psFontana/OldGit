// Classe base que define o esqueleto da operação de renderização
class Tag {
  constructor(name, id, ...childs) {
    this.id = id;
    this.name = name;
    this.children = childs.length > 0 ? childs : [];
  }

  // Template Method - define o esqueleto do algoritmo
  render() {
    return this.startTag() + this.renderChildren() + this.endTag();
  }

  // Método específico para cada tipo de tag - deve ser implementado pelas subclasses
  startTag() {
    return `<${this.name} id="${this.id}">`;
  }

  // Renderiza os filhos (se houver)
  renderChildren() {
    return this.children
      .map((child) => child.render()) // Chama o render de cada filho
      .join("");
  }

  // Método específico para cada tipo de tag - deve ser implementado pelas subclasses
  endTag() {
    return `</${this.name}>`;
  }
}

// Subclasse Button, que implementa os detalhes específicos
class Button extends Tag {
  constructor(id, color, ...childs) {
    super("button", id, ...childs);
    this.color = color;
  }

  startTag() {
    return `<button id="${this.id}" style="color:${this.color}">`;
  }
}

// Subclasse Div, que implementa os detalhes específicos
class Div extends Tag {
  constructor(id, ...childs) {
    super("div", id, ...childs);
  }
}

// Subclasse H1, que implementa os detalhes específicos
class H1 extends Tag {
  constructor(id, innerText, ...childs) {
    super("h1", id, ...childs);
    this.innerText = innerText;
  }

  startTag() {
    return `<h1 id="${this.id}">${this.innerText}`;
  }
}

// Subclasse Ancora, que implementa os detalhes específicos
class Ancora extends Tag {
  constructor(id, src, ...childs) {
    super("a", id, ...childs);
    this.src = src;
  }

  startTag() {
    return `<a id="${this.id}" href="${this.src}">`;
  }
}

// Subclasse Img, que implementa os detalhes específicos
class Img extends Tag {
  constructor(id, src, alt, ...childs) {
    super("img", id, ...childs);
    this.src = src;
    this.alt = alt || id;
  }

  startTag() {
    return `<img src="${this.src}" id="${this.id}" alt="${this.alt}" />`;
  }

  // Como a tag <img> não tem conteúdo, não precisamos de um método renderChildren ou endTag
  renderChildren() {
    return ""; // Para <img>, não há filhos
  }

  endTag() {
    return ""; // <img> não tem tag de fechamento
  }
}

// Subclasse P, que implementa os detalhes específicos
class P extends Tag {
  constructor(id, innerText, ...childs) {
    super("p", id, ...childs);
    this.innerText = innerText;
  }

  startTag() {
    return `<p id="${this.id}">${this.innerText}`;
  }
}

// Exemplo de uso
let parag = new P("firstP", "Primeiro Parágrafo");
let image = new Img("firstImg", "./minhaImagem", "imagemQualquer");
let ancora = new Ancora("firstA", "https://www.google.com");
let title = new H1("firstH1", "Título", parag);
let main = new Div("main", title, image);

// Renderizando a tag main
console.log(main.render()); // Controla a renderização de tags com o método template
