package com.example.exercicios;

// import com.example.exercicios.At5.Veiculo;

public class At5 {
  // public class Veiculo {
  //   private int renavam;
  //   private String placa;
  //   private String cor;

  //   public int getRenavam() {
  //     return this.renavam;
  //   }
  //   public String getPlaca() {
  //     return this.placa;
  //   }
  //   public String getCor() {
  //     return this.cor;
  //   }
  // }

  // public class Carro extends Veiculo{
  //   private int portas;
  //   private int potencia;
    
  //   public int getNumeroDePortas() {
  //     return this.portas;
  //   }

  //   public int getPotenciaMotor() {
  //     return this.potencia;
  //   }

  //   public void setNumeroDePortas(int portas) {
  //     this.portas = portas;
  //   }

  //   public void setPotenciaMotor(int potencia) {
  //     this.potencia = potencia;
  //   }

  //   public void printInformacoes(){
  //     System.out.println("Renavam: " + this.getRenavam() +", Placa: " + this.getPlaca()+ ", Cor: " + this.getCor()+ ", NumeroDePortas: " + this.portas + ", PotenciaMotor: " + getPotenciaMotor());
  //   }
  // }

  // public class Pessoa{
  //   private String nome;
  //   private int idade;

  //   public int getIdade() {
  //     return this.idade;
  //   }
  //   public String getNome() {
  //     return this.nome;
  //   }
  //   public void setIdade(int idade) {
  //     this.idade = idade;
  //   }
  //   public void setNome(String nome) {
  //     this.nome = nome;
  //   }
  // }

  // public class Aluno extends Pessoa {
  //   private int matricula;

  //   public void setMatricula(int mat){
  //       this.matricula = mat;
  //   }

  //   public int getMatricula(){
  //       return this.matricula;
  //   }

  //   public void printDados(){
  //       System.out.println(this.matricula);
  //       System.out.println(this.getNome());
  //       System.out.println(this.getIdade());
  //   }
  // }

  // public class Pessoa {
  //   private String nome;
  //   private String endereco;

  //   public Pessoa(String nome, String endereco){
  //     this.nome = nome;
  //     this.endereco = endereco;
  //   }

  //   public String getEndereco() {
  //     return this.endereco;
  //   }
  //   public String getNome() {
  //     return this.nome;
  //   }
  //   public void setEndereco(String endereco) {
  //     this.endereco = endereco;
  //   }
  //   public void setNome(String nome) {
  //     this.nome = nome;
  //   }
  // }

  // public class Gerente extends Funcionario{
  //   private String departamento;

  //   public Gerente(String nome, String endereco, double salario, String departamento){
  //     super(nome, endereco, salario);
  //     this.departamento = departamento;
  //   }

  //   public String getDepartamento() {
  //     return this.departamento;
  //   }   
  // }

  // public class Funcionario extends Pessoa{
  //   private double salario;
  //   public double getSalario() {
  //     return this.salario;
  //   }
  //   public Funcionario(String nome, String endereco, double salario){
  //     super(nome, endereco);
  //     this.salario = salario;
  //   }
  // }

  // public class Dependente extends Pessoa{
  //   private int idade;
  //   public int getIdade() {
  //     return this.idade;
  //   }
  //   public Dependente(String nome, String endereco, int idade){
  //     super(nome, endereco);
  //     this.idade = idade;
  //   }
  // }

  // public class Cliente extends Pessoa{
  //   private double limiteCompra;
  //   public double getLimiteCompra() {
  //     return this.limiteCompra;
  //   }
  //   public Cliente(String nome, String endereco, double limiteCompra){
  //     super(nome, endereco);
  //     this.limiteCompra = limiteCompra;
  //   }
  // }

//   public class Veiculo {
//     private String placa;
//     private String cor;
//     public String getCor() {
//          return cor;
//     }
//     public void setCor(String cor) {
//          this.cor = cor; 
//     }
//     public String getPlaca() {
//          return placa;
//     }
//     public void setPlaca(String placa) {
//          this.placa = placa; 
//     } 
// }

// public class Carro extends Veiculo {
//     private int rodas = 4;
//     public int getRodas() {
//         return rodas;
//     }
// }

// public class Moto extends Veiculo {
//     private int rodas = 2;
//     public int getRodas() {
//         return rodas;
//     }
// }

//   public class DetalheVeiculos {
//     private Veiculo[] array;
//     public DetalheVeiculos(Veiculo[] array){
//       this.array = array;
//     }
//     public void printVeiculos(){
//       for (Veiculo veiculo : array) {
//         if (veiculo instanceof Carro) {
//           Carro veiclo = (Carro) veiculo;
//           System.out.println("Carro: " + veiclo.getPlaca() + " - " + veiclo.getCor() + " - " + veiclo.getRodas());
//         }
//         if (veiculo instanceof Moto) {
//           Moto veiclo = (Moto) veiculo;
//           System.out.println("Moto: " + veiclo.getPlaca() + " - " + veiclo.getCor() + " - " + veiclo.getRodas());
//         }
//       }
//     }
//   }

  public class Pessoa {
    private String nome;
    private int idade; 

    public Pessoa(String nome, int idade){
        this.nome = nome;
        this.idade = idade;
    }

    public String retornaDados(){
        return nome + " -- " + idade;
    }
    public void fazerAniversario(){
        idade++;
    }
    public int getIdade(){
        return this.idade;
    }
    public String getNome(){
        return this.nome;
    }
    public void setNome(String novoNome){
        this.nome = novoNome;
    }
  }

  public class Aluno extends Pessoa {
    private int ra;
    private String disciplinas;

    public Aluno (String nome, int idade, int ra, String disciplina){
      super(nome, idade);
      this.ra = ra;
      this.disciplinas = disciplina;
    }

    public int getRa() {
      return this.ra;
    }
    public String getDisciplinas() {
      return this.disciplinas;
    }
    public void setRa(int ra) {
      this.ra = ra;
    }
    public void setDisciplinas(String disciplina) {
      this.disciplinas = disciplina;
    }

    public String retornaDados(){
      return super.retornaDados() + " -- " + getRa() + " -- " + getDisciplinas();
    }

  }


}