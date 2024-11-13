package com.example.utfpr;

public class Main {
    public static void main(String[] args) {
        ContaBancaria conta1 = new ContaCorrente(15, 2554755, "Paulo");
        ContaBancaria conta2 = new ContaPoupanca(15, 2554720, "Matheus");

        conta1.depositar(2000);
        conta2.depositar(2000);
        System.out.println(conta1.getInformacoes());
    }
}