class Tag {
  constructor(name, id, ...childs) {
    this.id = id;
    this.name = name;
    this.children = childs.length > 0 ? childs : [];
  }

  // Método abstrato que deve ser implementado pelas subclasses
  render() {
    throw new Error("render não implementado");
  }
}

// Proxy de Proteção que controla o acesso ao método render
class TagProxy extends Tag {
  constructor(tag) {
    super(tag.name, tag.id, ...tag.children);
    this.tag = tag;
  }

  render() {
    try {
      console.log(`Renderizando a tag <${this.tag.name}> com id: ${this.tag.id}`);
      return this.tag.render();
    } catch (error) {
      console.error(`Erro ao renderizar a tag <${this.tag.name}>: ${error.message}`);
      return ""; // Evita que o erro quebre a aplicação
    }
  }
}

// Classe para o elemento <button>
class Button extends Tag {
  constructor(id, color, ...childs) {
    super("button", id, ...childs);
    this.color = color;
  }

  render() {
    return `<button id="${this.id}" style="color:${this.color}">${this.children
      .map((child) => new TagProxy(child).render())
      .join("")}</button>`;
  }
}

// Classe para o elemento <div>
class Div extends Tag {
  constructor(id, ...childs) {
    super("div", id, ...childs);
  }

  render() {
    return `<div id="${this.id}">${this.children
      .map((child) => new TagProxy(child).render())
      .join("")}</div>`;
  }
}

// Classe para o elemento <h1>
class H1 extends Tag {
  constructor(id, innerText, ...childs) {
    super("h1", id, ...childs);
    this.innerText = innerText;
  }

  render() {
    return `<h1 id="${this.id}">${this.innerText} ${this.children
      .map((child) => new TagProxy(child).render())
      .join("")}</h1>`;
  }
}

// Classe para o elemento <a> (âncora)
class Ancora extends Tag {
  constructor(id, src, ...childs) {
    super("a", id, ...childs);
    this.src = src;
  }

  render() {
    return `<a id="${this.id}" href="${this.src}">${this.children
      .map((child) => new TagProxy(child).render())
      .join("")}</a>`;
  }
}

// Classe para o elemento <img>
class Img extends Tag {
  constructor(id, src, alt) {
    super("img", id);
    this.src = src;
    this.alt = alt || id; // Se alt não for definido, usa o id
  }

  render() {
    return `<img src="${this.src}" id="${this.id}" alt="${this.alt}" />`;
  }
}

// Classe para o elemento <p> (parágrafo)
class P extends Tag {
  constructor(id, innerText, ...childs) {
    super("p", id, ...childs);
    this.innerText = innerText;
  }

  render() {
    return `<p id="${this.id}">${this.innerText} ${this.children
      .map((child) => new TagProxy(child).render())
      .join("")}</p>`;
  }
}

// Exemplos de uso do padrão Proxy
let parag = new P("firstP", "Primeiro Parágrafo");
let image = new Img("firstImg", "./minhaImagem", "imagemQualquer");
let ancora = new Ancora("firstA", "https://www.google.com", parag);
let title = new H1("firstH1", "Título", ancora);
let main = new Div("main", title, image);

// O Proxy controla a renderização, adicionando logs e tratamento de erros
let proxyMain = new TagProxy(main);
console.log(proxyMain.render());

// Conclusão:
// O padrão Proxy foi fundamental para adicionar controle de erros e registros
// de log sem modificar a lógica de renderização das classes de tags HTML.
// Isso promove um código mais modular, seguro e de fácil manutenção.
