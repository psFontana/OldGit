package com.example.encapsulamento;

public class Pessoa{
  public String nome;
  private int idade;

  public Pessoa(String nome, int idade) {
    this.nome = nome;
    this.idade = idade;
  }

  public void fazAniversario(){
      idade++;
      System.out.println(this.nome + " fez aniversário! :D");
  }

  public void printaIdade() {
      System.out.println(idade);
  }

  public int getIdade(){
      return this.idade;
  }
  
}