package com.example.interfaces;

public class Retangulo implements FormaGeometrica{
  private double base;
  private double altura;
  private String nome;
  
  public double getAltura() {
    return this.altura;
  }
  public double getBase() {
    return this.base;
  }
  public void setAltura(double altura) {
    this.altura = altura;
  }
  public void setBase(double base) {
    this.base = base;
  }
  public Retangulo(double base, double altura, String nome){
    this.altura = altura;
    this.base = base;
    this.nome = nome;
  }
  @Override
  public double calcularArea() {
    return getAltura() * getBase();
  }
  @Override
  public double calcularPerimetro() {
    return 2 * getBase() + 2 * getAltura();
  }

  public String getNome() {
    return this.nome;
  }
  public void setNome(String nome) {
    this.nome = nome;
  }
}
