/*
1-

#include <stdio.h>

int main(void){

    int number = 0;
  do
  {  
    scanf("%i", &number);
    if (number>5 && number <200)
    {
      for (int i = 2; i <= number; i += 2)
      {
        printf("%i^%i = %i\n", i, 2, i*i);
      }
      
    }else{
      printf("Valor invalido! Tente novamente!\n");
    }
        
  } while (number >=200 || number <=5);
    
  return 0;
}

2-

#include <stdio.h>

int main(void){

  int number = 0, multiplier = 1;
  scanf("%i", &number);
  while (number<=2 || number >= 1000)
  {
    printf("Valor invalido! Tente novamente!\n");
    scanf("%i", &number);
  }

  while (multiplier != 11)
  {
    printf("%i X %i = %i\n", multiplier, number, multiplier*number);
    multiplier++;
  }
  
  
}

3-

#include <stdio.h>

int main(void){

  int number = 0;
  scanf("%i", &number);
  for (int i = 1; i <= number; i++)
  {
    for (int j = 1; j <= i; j++)
    {
      printf("- ");
    }
    for (int k = 1; k <= number-i; k++)
    {
      printf("%i ",i);
    }
    printf("\n");

  }
}

4-
*/
#include <stdio.h>

int main(void){

  int number = 0;
  double pagar = 0, receber = 0;
  scanf("%i", &number);
  for (int i = 1; i <= number; i++)
  {
    double valor = 0;
    scanf("%lf", &valor);
    if (valor > 0)
    {
      receber += valor;
    }else 
    {
      pagar += valor;
    }    
  }
 double saldo = receber + pagar;
  printf("Pagar: R$ %.2lf\nReceber: R$ %.2lf\nSaldo: R$ %.2lf", pagar, receber, saldo);
}