package com.example.utfpr;

public class ContaBancaria{
  private int numero;
  private String titular;
  private double saldo;

  public ContaBancaria(int numero, String titular, double saldo){
    this.numero = numero;
    this.titular = titular;
    this.saldo = saldo;
  }

  public ContaBancaria(int numero, String titular){
    this.numero = numero;
    this.titular = titular;
    this.saldo = 0;
  }

  public int getNumero(){
      return this.numero;
  }
  public void setNumero(int num){
      this.numero = num;
  }
  public String getTitular(){
      return this.titular;
  }
  public void setTitular(String titular){
      this.titular = titular;
  }
  public void sacar(double valor){
      this.saldo -= valor;
  }
  public void depositar(double valor){
      this.saldo += valor;
  }
  public double getSaldo(){
      return this.saldo;
  }
  public String getInformacoes(){
      return ("Número: " + this.numero + " Titular: " + this.titular + " Saldo: " + this.saldo);
  }
}  
