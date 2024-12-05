// Interface abstrata para a fábrica
class ThemeFactory {
    criarBotao() {
        throw new Error("O método criarBotao deve ser implementado");
    }
    criarTexto() {
        throw new Error("O método criarTexto deve ser implementado");
    }
    criarTitulo() {
        throw new Error("O método criarTitulo deve ser implementado");
    }
}

// Produtos abstratos
class Button {
    render() {
        throw new Error("O método render deve ser implementado");
    }
}
class Text {
    render() {
        throw new Error("O método render deve ser implementado");
    }
}
class Title {
    render() {
        throw new Error("O método render deve ser implementado");
    }
}

// Produtos concretos
class LightButton extends Button {
    render() {
        return "Renderizando botão claro";
    }
}
class DarkButton extends Button {
    render() {
        return "Renderizando botão escuro";
    }
}

class LightText extends Text {
    render() {
        return "Renderizando texto claro";
    }
}
class DarkText extends Text {
    render() {
        return "Renderizando texto escuro";
    }
}

class LightTitle extends Title {
    render() {
        return "Renderizando título claro";
    }
}
class DarkTitle extends Title {
    render() {
        return "Renderizando título escuro";
    }
}

// Fábricas concretas
class LightFactory extends ThemeFactory {
    criarBotao() {
        return new LightButton();
    }
    criarTexto() {
        return new LightText();
    }
    criarTitulo() {
        return new LightTitle();
    }
}
class DarkFactory extends ThemeFactory {
    criarBotao() {
        return new DarkButton();
    }
    criarTexto() {
        return new DarkText();
    }
    criarTitulo() {
        return new DarkTitle();
    }
}

// Criador de fábrica
function createThemeFactory(type) {
    if (type === "claro") return new LightFactory();
    if (type === "escuro") return new DarkFactory();
    throw new Error("Tema desconhecido");
}

// Uso
const factoryLight = createThemeFactory("claro");
const factoryDark = createThemeFactory("escuro");

const buttonLight = factoryLight.criarBotao();
console.log(buttonLight.render());

const titleDark = factoryDark.criarTitulo();
console.log(titleDark.render());
