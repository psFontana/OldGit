package com.example.utfpr;

public class ContaCorrente extends ContaBancaria{
  private double tarifa;

  public ContaCorrente(double tarifa, int numero, String titular){
    super(numero, titular);
    this.tarifa = tarifa;
  }

  public double getTarifa(){
      return this.tarifa;
  }
  public void setTarifa(double valor){
      this.tarifa = valor;
  }
  public void processar(){
      this.sacar(tarifa);
  }
}