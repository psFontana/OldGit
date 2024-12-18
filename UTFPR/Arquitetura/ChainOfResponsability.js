class Problema {
    constructor(descricao, dificuldade) {
        this.descricao = descricao;
        this.dificuldade = dificuldade;
    }
}

class ManipuladorSuporte {
    constructor(proximoManipulador = null) {
        this.proximoManipulador = proximoManipulador;
    }

    processarProblema(problema) {
        if (this.proximoManipulador) {
            return this.proximoManipulador.processarProblema(problema);
        }
        return `Problema "${problema.descricao}" não pôde ser resolvido.`;
    }
}

class SuporteAtendente extends ManipuladorSuporte {
    processarProblema(problema) {
        if (problema.dificuldade <= 1) {
            return `Atendente: Problema "${problema.descricao}" resolvido.`;
        }
        return super.processarProblema(problema);
    }
}

class SuporteTecnico extends ManipuladorSuporte {
    processarProblema(problema) {
        if (problema.dificuldade <= 2) {
            return `Técnico: Problema "${problema.descricao}" resolvido.`;
        }
        return super.processarProblema(problema);
    }
}

class SuporteGerente extends ManipuladorSuporte {
    processarProblema(problema) {
        if (problema.dificuldade <= 3) {
            return `Gerente de Suporte: Problema "${problema.descricao}" resolvido.`;
        }
        return super.processarProblema(problema);
    }
}

const gerente = new SuporteGerente();
const tecnico = new SuporteTecnico(gerente);
const atendente = new SuporteAtendente(tecnico);

const problemas = [
    new Problema("Esqueci minha senha", 1),
    new Problema("Erro na instalação do software", 2),
    new Problema("Falha no servidor", 3),
    new Problema("Vazamento de dados", 4),
];

problemas.forEach((problema) => {
    const resultado = atendente.processarProblema(problema);
    console.log(resultado);
});
