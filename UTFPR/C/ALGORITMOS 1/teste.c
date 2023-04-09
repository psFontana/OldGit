#include <stdio.h>

float calculaVolume(float, float, float);

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
}

float calculaVolume(float altura, float largura, float comprimento){
  float volume = altura * largura * comprimento;
  return volume;
}