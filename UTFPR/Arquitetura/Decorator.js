class Tag {
  constructor(tagName) {
    this.tagName = tagName;
    this.attributes = {};
    this.children = [];
  }

  setAttribute(key, value) {
    this.attributes[key] = value;
    return this;
  }

  appendChild(child) {
    if (typeof child === "string") {
      this.children.push(child);
    } else {
      this.children.push(child);
    }
    return this;
  }

  renderAttributes() {
    return Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
  }

  render(indentLevel = 0) {
    const indent = "  ".repeat(indentLevel);
    const attributes = this.renderAttributes();
    const children = this.children
      .map((child) =>
        typeof child === "string"
          ? `${indent}  ${child}`
          : child.render(indentLevel + 1)
      )
      .join("\n");
    if (this.children.length > 0) {
      return `${indent}<${this.tagName} ${attributes}>\n${children}\n${indent}</${this.tagName}>`;
    } else {
      return `${indent}<${this.tagName} ${attributes} />`;
    }
  }
}

class TagDecorator {
  constructor(tag) {
    this.tag = tag;
  }

  setAttribute(key, value) {
    this.tag.setAttribute(key, value);
    return this;
  }

  appendChild(child) {
    this.tag.appendChild(child);
    return this;
  }

  render() {
    return this.tag.render();
  }
}

class StyleDecorator extends TagDecorator {
  setStyle(style) {
    const existingStyle = this.tag.attributes["style"] || "";
    this.tag.setAttribute("style", `${existingStyle} ${style}`.trim());
    return this;
  }
}

class ClassDecorator extends TagDecorator {
  addClass(className) {
    const existingClass = this.tag.attributes["class"] || "";
    this.tag.setAttribute("class", `${existingClass} ${className}`.trim());
    return this;
  }
}

class LinkDecorator extends TagDecorator {
  setHref(href) {
    this.tag.setAttribute("href", href);
    return this;
  }
}

class ImageDecorator extends TagDecorator {
  setSrc(src) {
    this.tag.setAttribute("src", src);
    return this;
  }

  setAlt(alt) {
    this.tag.setAttribute("alt", alt);
    return this;
  }
}

const paragraph = new Tag("p");
const image = new Tag("img");
const link = new Tag("a");
const title = new Tag("h1");
const container = new Tag("div");

const styledParagraph = new StyleDecorator(paragraph)
  .setStyle("color: red; font-size: 14px")
  .setAttribute("id", "firstP")
  .appendChild(
    new Tag("span")
      .setAttribute("style", "font-weight: bold")
      .appendChild("Texto interno")
  );

const styledImage = new ImageDecorator(image)
  .setSrc("./minhaImagem.png")
  .setAlt("imagemQualquer")
  .setAttribute("id", "firstImg");

const styledLink = new LinkDecorator(link)
  .setHref("https://www.google.com")
  .setAttribute("id", "firstA");

const styledTitle = new StyleDecorator(title)
  .setStyle("font-size: 24px;")
  .setAttribute("id", "firstH1")
  .appendChild("Título decorado");

const styledContainer = new StyleDecorator(container)
  .setStyle("border: 1px solid black; padding: 10px;")
  .setAttribute("id", "main")
  .appendChild(styledTitle)
  .appendChild(styledParagraph)
  .appendChild(styledImage)
  .appendChild(styledLink);

console.log(styledContainer.render());
