package com.example.exercicios;

public class AT9 {
  // 1.
  public interface MinhaInterface {
    public void concatenar(String s);
    public double tamanho();
    public String getFrase();
    public void setFrase(String frase);
  }
  public class MinhaClasse implements MinhaInterface{
    private String frase;

    public String getFrase() {
      return this.frase;
    }

    public void setFrase(String frase) {
      this.frase = frase;
    }

    @Override
    public void concatenar(String s) {
      setFrase(getFrase() + s);
    }

    @Override
    public double tamanho() {
      return frase.length();
    }
  }

  // 2.
  public interface AreaCalculavel {
    public double calcularArea();
}
  public class Quadrado implements AreaCalculavel{
    private double lado;

    public Quadrado(double lado){
      this.lado = lado;
    }

    @Override
    public double calcularArea() {
      return lado*lado;
    }

    public double getLado() {
      return this.lado;
    }

    public void setLado(double lado) {
      this.lado = lado;
    }
  }
  public class Triangulo implements AreaCalculavel{
    private double base;
    private double altura;

    public Triangulo(double base, double altura){
      this.base = base;
      this.altura = altura;
    }

    @Override
    public double calcularArea() {
      return base*altura/2;
    }

    public double getBase() {
      return this.base;
    }

    public void setBase(double base) {
      this.base = base;
    }

    public double getAltura() {
      return this.altura;
    }

    public void setAltura(double altura) {
      this.altura = altura;
    }
  }

  public class Retangulo implements AreaCalculavel{
    private double base;
    private double altura;

    public Retangulo(double base, double altura){
      this.base = base;
      this.altura = altura;
    }

    @Override
    public double calcularArea() {
      return base*altura;
    }

    public double getBase() {
      return this.base;
    }

    public void setBase(double base) {
      this.base = base;
    }

    public double getAltura() {
      return this.altura;
    }

    public void setAltura(double altura) {
      this.altura = altura;
    }
  }

  //3. 

  public interface Funcionario{

    public double calcularSalario();

  }

  public class Professor implements Funcionario{
    private String nome;
    private double CargaHoraria;

    public Professor(String nome, double cargaHoraria){
      this.nome = nome;
      this.CargaHoraria = cargaHoraria;
    }

    @Override
    public double calcularSalario() {
      return this.CargaHoraria * 60;
    }
  }
  public class Estagiario implements Funcionario{
    private String nome;
    private double CargaHoraria;

    public Estagiario(String nome, double cargaHoraria){
      this.nome = nome;
      this.CargaHoraria = cargaHoraria;
    }

    @Override
    public double calcularSalario() {
      return this.CargaHoraria * 12.5;
    }
  }
  public class Tecnico implements Funcionario{
    private String nome;
    private double CargaHoraria;

    public Tecnico(String nome, double cargaHoraria){
      this.nome = nome;
      this.CargaHoraria = cargaHoraria;
    }

    @Override
    public double calcularSalario() {
      return this.CargaHoraria * 40;
    }
  }

  // 4.

  interface CapazDeAssobiar {
    void assobiar(String assobio);
  }

  public class Humano implements CapazDeAssobiar {        
    public void assobiar(String assobio){
        System.out.println(assobio);
    }        
  }


}
