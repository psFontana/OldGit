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
    for (int k = 0; k < number-i; k++)
    {
      printf("%i ",i);
    }
    printf("\n");

  }
