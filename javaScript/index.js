class cliente {

    nome;
    cpf;

}

class contaCorrente {

    agencia;
    saldo;

    sacar(valor){

        if(this.saldo >= valor) {

            this.saldo -= valor;
            return valor;

        }

    };

    depositar(valor){

        if(valor <= 0 )return;

            this.saldo += valor;
    }

}

const cliente1 = new cliente();
cliente1.nome = "Marcus";
cliente1.cpf = 11748293042;


const cliente2 = new cliente();
cliente2.nome = "Jean";
cliente2.cpf = 74283492394;