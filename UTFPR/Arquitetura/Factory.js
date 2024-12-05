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

// Produtos concretos para tema claro
class LightButton extends Button {
    render() {
        return "Renderizando botão claro";
    }
}

class LightText extends Text {
    render() {
        return "Renderizando texto claro";
    }
}

class LightTitle extends Title {
    render() {
        return "Renderizando título claro";
    }
}

// Produtos concretos para tema escuro
class DarkButton extends Button {
    render() {
        return "Renderizando botão escuro";
    }
}

class DarkText extends Text {
    render() {
        return "Renderizando texto escuro";
    }
}

class DarkTitle extends Title {
    render() {
        return "Renderizando título escuro";
    }
}

// Criadores abstratos (Factory Method)
class ButtonCreator {
    criarComponente() {
        throw new Error("O método criarComponente deve ser implementado");
    }
}

class TextCreator {
    criarComponente() {
        throw new Error("O método criarComponente deve ser implementado");
    }
}

class TitleCreator {
    criarComponente() {
        throw new Error("O método criarComponente deve ser implementado");
    }
}

// Criadores concretos para tema claro
class LightButtonCreator extends ButtonCreator {
    criarComponente() {
        return new LightButton();
    }
}

class LightTextCreator extends TextCreator {
    criarComponente() {
        return new LightText();
    }
}

class LightTitleCreator extends TitleCreator {
    criarComponente() {
        return new LightTitle();
    }
}

// Criadores concretos para tema escuro
class DarkButtonCreator extends ButtonCreator {
    criarComponente() {
        return new DarkButton();
    }
}

class DarkTextCreator extends TextCreator {
    criarComponente() {
        return new DarkText();
    }
}

class DarkTitleCreator extends TitleCreator {
    criarComponente() {
        return new DarkTitle();
    }
}

// Uso
function renderComponent(creator) {
    const component = creator.criarComponente();
    console.log(component.render());
}

// Tema claro
renderComponent(new LightButtonCreator()); // "Renderizando botão claro"
renderComponent(new LightTextCreator());  // "Renderizando texto claro"
renderComponent(new LightTitleCreator()); // "Renderizando título claro"

// Tema escuro
renderComponent(new DarkButtonCreator()); // "Renderizando botão escuro"
renderComponent(new DarkTextCreator());  // "Renderizando texto escuro"
renderComponent(new DarkTitleCreator()); // "Renderizando título escuro"
