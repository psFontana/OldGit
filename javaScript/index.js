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

        }

    };

    depositar(valor){

        if(valor >= 0 ){

            this.saldo += valor;

        }

    }

}

const cliente1 = new cliente();
cliente1.nome = "Marcus";
cliente1.cpf = 11748293042;


const cliente2 = new cliente();
cliente2.nome = "Jean";
cliente2.cpf = 74283492394;


//teste

const contaCorrente1 = new contaCorrente();
contaCorrente1.agencia = 1001;
contaCorrente1.saldo = 0;
contaCorrente1.depositar(100);
console.log(contaCorrente1.saldo);
contaCorrente1.sacar(40);
console.log(contaCorrente1.saldo);
