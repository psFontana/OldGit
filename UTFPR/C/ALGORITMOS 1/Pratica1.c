/*

1-
#include <stdio.h>
int main(){
  int consumo = 0;
  double tarifa = 0, imposto = 0, servicos = 0;
  scanf("%i %lf %lf %lf", &consumo, &tarifa, &imposto, &servicos);
  
  double total = consumo * tarifa;
  double valor = total + imposto + servicos;

  printf("Dados do faturamento:\nConsumo............:%i kWh\nTarifa (R$)........:%.3lf\nTotal (R$).........:%.2lf\nTaxas e impostos...:%.2lf\nServicos...........:%.2lf\nVALOR (R$).........:%.2lf ", consumo, tarifa, total, imposto, servicos, valor);
}


2-
#include <stdio.h>
int main(){
  double n1, n2, n3;
  scanf("%lf %lf %lf", &n1, &n2, &n3);
  double media = (n1+n2+n3)/3;
  printf("Media: %.2lf\n", media);
  if (media >= 7)
  {
    printf("Situacao: Aprovado");
  }else if (media < 5)
  {
    printf("Situacao: Reprovado");
  }else{
    printf("Situacao: Recuperacao");
  }  
}

3-
#include <stdio.h>
int main(){
  double number;
  scanf("%lf", &number);
  if (number >= 0 && number <= 25)
  {
    printf("Intervalo [0,25]");
  }else if (number >=25 && number <= 50)
  {
    printf("Intervalo (25,50]");
  }else if(number >= 75 && number <= 100)
  {
    printf("Intervalo (75,100]");
  }else {
    printf("Fora de intervalo");
  }  
}

4-
#include <stdio.h>
#include <math.h>
int main(){
float N1, N2, N3, N4;
scanf("%f %f %f %f", &N1, &N2, &N3, &N4);
float media = N1 * 0.2 + N2 * 0.3 + N3 * 0.4 + N4 * 0.1;
printf("Media: %.1f\n", media);
if (media >= 7){
  printf("Aluno aprovado.");
}else if (media < 5){
  printf("Aluno reprovado.");
}else{
  printf("Aluno em exame.\n");
  float exame;
  scanf("%f", &exame);
  printf("Nota do exame: %.1f\n", exame);
  media = (media + exame)/2;
  if (media >= 5){
    printf("Aluno aprovado.\n");
  }else {
    printf("Aluno reprovado.\n");
  }
    printf("Media final: %.1f", media);
}
}

*/