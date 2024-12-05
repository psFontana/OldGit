class Tag {
    constructor(name, id, ...childs) {
        this.id = id;
        this.name = name;
        this.children = childs.length > 0 ? childs : [];;
    }

    appendChild(tag) {
        throw new Error("appendChild não implementado")
    }

    render() {
        throw new Error("render não implementado")
    }
}

class Button extends Tag {
    constructor(id, color, ...childs) {
        super("img", id, childs);
        this.color = color;
    }

    appendChild(tag) {
        if (tag instanceof Tag) {
            this.children.push(tag)
        }else{
            throw new Error("Botões só podem ter filhos que sejam ancoras")
        }
    }

    render() {
        console.log(`<img src="${this.src}" id="${this.id} alt="${this.alt}" />`);
    }
}
class Img extends Tag {
    constructor(id, src, alt) {
        super("img", id);
        this.src = src
        this.alt = alt != null ? alt : id;
    }

    appendChild(tag) {
        throw new Error("A tag <img> não pode ter filhos!");
    }

    render() {
        console.log(`<img src="${this.src}" id="${this.id} alt="${this.alt}" />`);
    }
}
class Img extends Tag {
    constructor(id, src, alt) {
        super("img", id);
        this.src = src
        this.alt = alt != null ? alt : id;
    }

    appendChild(tag) {
        throw new Error("A tag <img> não pode ter filhos!");
    }

    render() {
        console.log(`<img src="${this.src}" id="${this.id} alt="${this.alt}" />`);
    }
}

class P extends Tag {
    constructor(id) {
        super("p", id);
    }
}


const div = new Tag("div", "main-div");
const p = new P("paragraph-1");
const img = new Img("image-1");

div.appendChild(p);


console.log(div.render());


