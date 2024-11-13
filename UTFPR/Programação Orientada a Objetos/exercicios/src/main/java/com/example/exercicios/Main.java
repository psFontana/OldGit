package com.example.exercicios;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
/*  exercicio 1
    public class Aluno{
        public String nome;
        public int idade;
        public char genero;
        public long ra;
    
        // construtor 1 - sem parâmetros, mas deve atribuir valores padrão para todos os atributos da classe (valores padrão: "Aluno", 18, 'M', 123456789).
        // construtor 2 - com parâmetros para atribuir valores aos atributos nome e idade.
        // construtor 3 - com parâmetros para atribuir valores aos atributos nome, genero e ra.
        // Quando o construtor não define o valor de um atributo, você deve usar o valor padrão informado no construtor 1.
        public Aluno(){
            this.nome = "Aluno";
            this.idade = 18;
            this.genero = 'M';
            this.ra = 123456789;
        }
        public Aluno(String nome, int idade){
            this.nome = nome;
            this.idade = idade;
            this.genero = 'M';
            this.ra = 123456789;
        }
        public Aluno(String nome, char genero, long ra){
            this.nome = nome;
            this.idade = 18;
            this.genero = genero;
            this.ra = ra;
        }

        public void print(){
            System.out.println(this.nome + " - " + this.idade + " - " + this.genero + " - " + this.ra);
        }
    
    }
    exercício 2
    public class Pessoa{
        private String nome;
        private double altura;
        private double peso;

        public Pessoa(String nome, double altura, double peso){
            this.nome = nome;
            this.altura = altura;
            this.peso = peso;
        }

        public String getNome(){
            return this.nome;
        }
        public double getAltura(){
            return this.altura;
        }
        public double getPeso(){
            return this.peso;
        }
        public void setNome(String nome){
            this.nome = nome;
        }
        public void setAltura(double altura){
            this.altura = altura;
        }
        public void setPeso(double peso){
            this.peso = peso;
        }
    }
    exercício 3
    public class Aluno{
        public String nome;
        public int idade;
        public char genero;
        public long ra;

        public Aluno(String nome, int idade, char genero){
            this.nome = nome;
            this.idade = idade;
            this.genero = genero;
        }
        
        public void print(){
            System.out.println(this.nome + " - " + this.idade + " - " + this.genero);
        }    
    }

    public class AlunoAnalise{
        Aluno alunos[];

        public AlunoAnalise(Aluno vetor[]){
            this.alunos = vetor;
        }

        public void listarAlunosPorGenero(char falafi){
            for (Aluno aluno : this.alunos) {
                if(aluno.genero == falafi){
                    aluno.print();
                }
            }
        }

        public void listarAlunoMaisVelho(){
            Aluno alunoAtual = this.alunos[0];
            for (Aluno aluno : this.alunos) {
                if(aluno.idade > alunoAtual.idade){
                    alunoAtual = aluno;
                }
            }
            alunoAtual.print();
        }
        public void listarAlunoMaisJovem(){
            Aluno alunoAtual = this.alunos[0];
            for (Aluno aluno : this.alunos) {
                if(aluno.idade < alunoAtual.idade){
                    alunoAtual = aluno;
                }
            }
            alunoAtual.print();
        }
        public float getMediaIdade(){
            float media = 0;
            int contador = 0;
            for (Aluno aluno : this.alunos) {
                media += aluno.idade;
                contador++;
            }
            return media/contador;
        }
    }
    exercício 4*/
    class Lancamento {
        private String descricao;
        private int tipo;
        private double valor;
    
        public Lancamento(int tipo, String descricao, double valor) {
            this.descricao = descricao;
            this.tipo = tipo;
            this.valor = valor;
        }
    
        public String getDescricao() { return descricao; }
        public void setDescricao(String descricao) { this.descricao = descricao; }
        public int getTipo() { return tipo; }
        public void setTipo(int tipo) { this.tipo = tipo; }
        public double getValor() { return valor; }
        public void setValor(double valor) { this.valor = valor; }
    
    }
    public class Financeiro{
        private double saldo;
        public Financeiro(){
            this.saldo = 0;
        }
        public void processarLancamento(Lancamento lanc){
            if(lanc.getTipo() == 1){
                System.out.printf("Lançamento: Receber - %s - %.2f\n", lanc.getDescricao(), lanc.getValor());
                this.saldo += lanc.getValor();
            }else{
                // System.out.println("Lançamento: Pagar - " + lanc.getDescricao() + " - " + lanc.getValor());
                System.out.printf("Lançamento: Pagar - %s - %.2f\n", lanc.getDescricao(), lanc.getValor());
                this.saldo -= lanc.getValor();
            }
        }
        public void printSaldo(){
            System.out.printf("Saldo = %.2f", this.saldo);
        }
    }
}