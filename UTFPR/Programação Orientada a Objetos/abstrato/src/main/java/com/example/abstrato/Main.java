package com.example.abstrato;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        Aluno jorge = new Aluno("Paulo", 18, 2554755, "Pelis");
        jorge.retornaDados();
        System.out.println(jorge.getNome());
    }
}