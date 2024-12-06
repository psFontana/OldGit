// Builder para criação das tags de forma fluida
class TagBuilder {
  constructor(tagType) {
    this.tagType = tagType;
    this.id = null;
    this.children = [];
    this.innerText = null;
    this.color = null;
    this.src = null;
    this.alt = null;
  }

  // Métodos de configuração
  setId(id) {
    this.id = id;
    return this;
  }

  setInnerText(text) {
    this.innerText = text;
    return this;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setSrc(src) {
    this.src = src;
    return this;
  }

  setAlt(alt) {
    this.alt = alt;
    return this;
  }

  addChild(child) {
    this.children.push(child);
    return this;
  }

  // Método para construir a tag
  build() {
    switch (this.tagType) {
      case "button":
        return new Button(this.id, this.color, ...this.children);
      case "div":
        return new Div(this.id, ...this.children);
      case "h1":
        return new H1(this.id, this.innerText, ...this.children);
      case "a":
        return new Ancora(this.id, this.src, ...this.children);
      case "img":
        return new Img(this.id, this.src, this.alt, ...this.children);
      case "p":
        return new P(this.id, this.innerText, ...this.children);
      default:
        throw new Error("Tipo de tag desconhecido");
    }
  }
}
class Tag {
  constructor(name, id, ...childs) {
    this.id = id;
    this.name = name;
    this.children = childs.length > 0 ? childs : [];
  }

  appendChild(tag) {
    throw new Error("appendChild não implementado");
  }

  render() {
    throw new Error("render não implementado");
  }
}

class Button extends Tag {
  constructor(id, color, ...childs) {
    super("button", id, ...childs);
    this.color = color;
  }

  appendChild(tag) {
    if (tag instanceof Ancora) {
      this.children.push(tag);
    } else {
      throw new Error("Botões só podem ter filhos que sejam ancoras");
    }
  }

  render() {
    console.log(
      `<button id="${this.id}" style="color:${this.color}">${this.children
        .map((child) => child.render())
        .join("")}</button>`
    );
  }
}

class Div extends Tag {
  constructor(id, ...childs) {
    super("div", id, ...childs);
  }

  appendChild(tag) {
    if (tag instanceof Tag) {
      this.children.push(tag);
    } else {
      throw new Error(
        "Só é possível adicionar filhos que são tags HTML válidas"
      );
    }
  }

  render() {
    console.log(
      `<div id="${this.id}">\n  ${this.children
        .map((child) => child.render())
        .join("\n  ")}\n</div>`
    );
  }
}

class H1 extends Tag {
  constructor(id, innerText, ...childs) {
    super("h1", id, ...childs);
    this.innerText = innerText;
  }

  appendChild(tag) {
    if (tag instanceof Tag) {
      if (tag instanceof Div) {
        throw new Error("Não é possível colocar uma Div dentro de um h1");
      } else {
        this.children.push(tag);
      }
    }
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
  }

  appendChild(tag) {
    if (tag instanceof Tag) {
      this.children.push(tag);
    } else {
      throw new Error(
        "Só é possível adicionar filhos que são tags HTML válidas"
      );
    }
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
    this.alt = alt != null ? alt : id;
  }

  appendChild(tag) {
    throw new Error("A tag <img> não pode ter filhos!");
  }

  render() {
    return `<img src="${this.src}" id="${this.id}" alt="${this.alt}" />`;
  }
}

class P extends Tag {
  constructor(id, innerText, ...childs) {
    super("p", id, ...childs);
    this.innerText = innerText;
  }

  appendChild(tag) {
    if (tag instanceof Tag) {
      if (tag instanceof Div) {
        throw new Error(
          "Não é possível colocar uma Div dentro de um parágrafo"
        );
      } else {
        this.children.push(tag);
      }
    }
  }

  render() {
    return `<p id="${this.id}">${this.innerText} ${this.children
      .map((child) => child.render())
      .join("")}</p>`;
  }
}

// Test the classes and rendering
let parag = new P("firstP", "Primeiro Parágrafo");
let image = new Img("firstImg", "./minhaImagem", "imagemQualquer");
let ancora = new Ancora("firstA", "https://www.google.com");
let title = new H1("firstH1", "Título", parag);
let main = new Div("main", title, image);

main.render();
