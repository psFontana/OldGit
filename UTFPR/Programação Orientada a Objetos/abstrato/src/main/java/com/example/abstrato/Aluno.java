package com.example.abstrato;

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
  @Override
  public String retornaDados(){
    return super.retornaDados() + " -- " + getRa() + " -- " + getDisciplinas();
  }
}