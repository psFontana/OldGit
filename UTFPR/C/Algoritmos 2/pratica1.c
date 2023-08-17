/*1-

#include <stdio.h>
int main(void){

  int tam = 0, i = 0, j = 0;
  scanf("%d", &tam);
  double vetor[tam];

  for (i = 0; i < tam; i++)
  {
    scanf("%lf", &vetor[i]);
    printf("V[%i] = %.1lf\n", i, vetor[i]);
  }

  for ( j = tam-1; j >= 0; j--)
  {
    printf("V[%i] = %.1lf\n", j, vetor[j]);
  }
  
  

  return 0;
}

2-

#include <stdio.h>
int main(void){

  int tam = 0, i = 0, j = 0;
  scanf("%d", &tam);
  float vetor[tam], number = 0;

  for (i = 0; i < tam; i++)
  {
    scanf("%f", &vetor[i]);
  }
  scanf("%f", &number);
   for ( j = 0; j < tam; j++)
   {
    if (vetor[j] < number)
    {
      printf("V[%i] = %.2f\n", j, vetor[j]);
    }
    
   }
   
  

  return 0;
}

3-
*/
#include <stdio.h>
int main(void){

  int tam = 0, i = 0;
  scanf("%d", &tam);
  int vetor[tam];

  for (i = 0; i < tam; i++)
  {
    scanf("%i", &vetor[i]);
    if (vetor[i] % 2 == 0)
    {
      printf("V[%i] = %i\n", i, vetor[i]);
    }
    
  }
  
  return 0;
}