package com.example.interfaces;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        Retangulo r1 = new Retangulo(20, 10, "Jorge");
        // FormaGeometrica r1 = new Retangulo(20, 10);
        System.out.println("Area: " + r1.calcularArea());
        System.out.println("Perimetro: " + r1.calcularPerimetro());
        System.out.println("Nome: " + r1.getNome());
    }
}