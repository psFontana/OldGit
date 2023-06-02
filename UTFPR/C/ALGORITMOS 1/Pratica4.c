/*
1-
#include <stdio.h>
int main(void){
  int consumo = 0;
  double tarifa = 0, impostos = 0, servicos = 0;
  scanf("%i %lf %lf %lf", &consumo, &tarifa, &impostos, &servicos);
  double total = consumo * tarifa;
  double valor = total + impostos + servicos;
  printf("Dados do faturamento:\nConsumo............:%i kWh\nTarifa (R$)........:%.3lf\nTotal (R$).........:%.2lf\nTaxas e impostos...:%.2lf\nServicos...........:%.2lf\nVALOR (R$).........:%.2lf", consumo, tarifa, total, impostos, servicos, valor);
  return 0;
}

2-
#include <stdio.h>
int main(void){
  int mes = 0;
  scanf("%i", &mes);
  switch (mes)
  {
  case 1:
  case 2:
  case 3:{
    printf("Primeiro trimestre");
    break;
  }

  case 4:
  case 5:
  case 6:{
    printf("Segundo trimestre");
    break;
  }
  
  case 7:
  case 8:
  case 9:{
    printf("Terceiro trimestre");
    break;
  }

  case 10:
  case 11:
  case 12:{
    printf("Quarto trimestre");
    break;
  }
  default:{
  printf("Mes invalido");
    break;
  }
  } 
  printf("teste");
  return 0;
}

3-
*/

#include <stdio.h>
int main(void){
  int n1, n2, n3, n4;
  scanf("%i %i %i %i", &n1, &n2, &n3,2 &n4);
  if(n1 > n2 && n1 > n3 && n1 > n4){
    printf("%i", n1);
  } else if(n2 >= n1 && n2 >= n3 && n2 >= n4){
    printf("%i", n2);
  } else if(n3 >= n2 && n3 >= n1 && n3 >= n4){
    printf("%i", n3);
  } else if(n4 >= n2 && n4 >= n3 && n4 >= n1){
    printf("%i", n4);
  } else {
    printf("erro");
  }

  return 0;
}