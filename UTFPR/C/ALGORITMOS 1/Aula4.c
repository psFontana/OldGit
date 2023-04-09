#include <stdio.h>

float calculaVolume(float, float, float);

float dividir(float, float);


int main(){
  float altura = 0,largura = 0,comprimento = 0,volume = 0;
  printf("Calculador de Volume de Blocos.\nDigite a altura do bloco:\n");
  scanf("%f", &altura);
  printf("Digite a largura do bloco:\n");
  scanf("%f", &largura);
  printf("Digite o comprimento do bloco:\n");
  scanf("%f", &comprimento);
  volume = calculaVolume(altura, largura, comprimento);
  printf("O volume calculado foi: %.1f\n", volume);

  float n1, n2, divisao;
  printf("Divisor de numeros:\nDigite o primeiro número:\n");
  scanf("%f", &n1);
  printf("Digite o segundo número:\n");
  scanf("%f", &n2);
  divisao = dividir(n1, n2);
  printf("O número calculado foi: %.2f\n", divisao);
}

float calculaVolume(float altura, float largura, float comprimento){
  float volume = altura * largura * comprimento;
  return volume;
}

float dividir(float n1, float n2){
  float resultado = n1/n2;
  return resultado;
}