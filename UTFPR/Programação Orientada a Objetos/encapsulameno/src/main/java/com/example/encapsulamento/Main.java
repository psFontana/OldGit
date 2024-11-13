package com.example.encapsulamento;

public class Main {
    public static void main(String[] args) {
        Pessoa alunos[] = new Pessoa[5];
        Pessoa p1 = new Pessoa("Samuel", 5);
        p1.nome = "Samuel Silva";
        System.out.println(p1.nome + " tem " + p1.getIdade() + " anos");
        p1.fazAniversario();
        System.out.println(p1.nome + " tem " + p1.getIdade() + " anos");
        alunos[0] = p1;
        System.out.println(alunos[0].nome);
        Pessoa p2 = new Pessoa("Jorge Ghem", 2);
        alunos[1] = p2;
        System.out.println(alunos[1].nome);
        System.out.println(getVeio(alunos).nome + " é o mais veio");
    }

    public static Pessoa getVeio(Pessoa vetor[]){
        Pessoa veio = vetor[0];
        for (Pessoa i : vetor) {
            if (i != null && i.getIdade() > veio.getIdade()) {
                veio = i;
            }
        }
        return veio;
    }
}

