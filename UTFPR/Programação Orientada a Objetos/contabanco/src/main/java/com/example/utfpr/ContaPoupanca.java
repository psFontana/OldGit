package com.example.utfpr;

public class ContaPoupanca extends ContaBancaria{
  private double rendimento;

  public ContaPoupanca(double rendimento, int numero, String titular){
    super(numero, titular);
    this.rendimento = rendimento;
  }
  
  public double getRendimento() {
    return this.rendimento;
  }
  public void setRendimento(double porcentagem) {
    this.rendimento = porcentagem;
  }
  public void processar(){
    this.depositar(rendimento/100*getSaldo());
  }
}
