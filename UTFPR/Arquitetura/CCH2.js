class Tag {
  constructor(name, id, ...childs) {
    this.id = id;
    this.name = name;
    this.children = childs.length > 0 ? childs : [];
  }

  render() {
    throw new Error("render não implementado");
  }
}

class TagProxy {
  constructor(tag) {
    this.tag = tag;
  }

  render() {
    try {
      console.log(
        `Renderizando a tag <${this.tag.name}> com id: ${this.tag.id}`
      );
      return this.tag.render();
    } catch (error) {
      console.error(
        `Erro ao renderizar a tag <${this.tag.name}>: ${error.message}`
      );
      return "";
    }
  }
}

class Button extends Tag {
  constructor(id, color, ...childs) {
    super("button", id, ...childs);
    this.color = color;
    this.proxy = new TagProxy(this);
  }

  render() {
    return `<button id="${this.id}" style="color:${this.color}">${this.children
      .map((child) => child.render())
      .join("")}</button>`;
  }
}

class Div extends Tag {
  constructor(id, ...childs) {
    super("div", id, ...childs);
    this.proxy = new TagProxy(this);
  }

  render() {
    return `<div id="${this.id}">${this.children
      .map((child) => child.render())
      .join("")}</div>`;
  }
}

class H1 extends Tag {
  constructor(id, innerText, ...childs) {
    super("h1", id, ...childs);
    this.innerText = innerText;
    this.proxy = new TagProxy(this);
  }

  render() {
    return `<h1 id="${this.id}">${this.innerText} ${this.children
      .map((child) => child.render())
      .join("")}</h1>`;
  }
}

class Ancora extends Tag {
  constructor(id, src, ...childs) {
    super("a", id, ...childs);
    this.src = src;
    this.proxy = new TagProxy(this);
  }

  render() {
    return `<a id="${this.id}" href="${this.src}">${this.children
      .map((child) => child.render())
      .join("")}</a>`;
  }
}

class Img extends Tag {
  constructor(id, src, alt, ...childs) {
    super("img", id, ...childs);
    this.src = src;
    this.alt = alt || id;
    this.proxy = new TagProxy(this);
  }

  render() {
    return `<img src="${this.src}" id="${this.id}" alt="${this.alt}" />`;
  }
}

class P extends Tag {
  constructor(id, innerText, ...childs) {
    super("p", id, ...childs);
    this.innerText = innerText;
    this.proxy = new TagProxy(this);
  }

  render() {
    return `<p id="${this.id}">${this.innerText} ${this.children
      .map((child) => child.render())
      .join("")}</p>`;
  }
}

let parag = new P("firstP", "Primeiro Parágrafo");
let image = new Img("firstImg", "./minhaImagem", "imagemQualquer");
let ancora = new Ancora("firstA", "https://www.google.com");
let title = new H1("firstH1", "Título", parag);
let main = new Div("main", title, image);

console.log(main.proxy.render());
