/*
1-

#include <stdio.h>
#include <string.h>

int main(void){
  int n = 0;
  scanf("%i", &n);
  int matriz[n][n];

  for (int i = 0; i < n; i++)
  {
    for (int j = 0; j < n; j++)
    {
      scanf(" %i", &matriz[i][j]);
      printf("%i ", matriz[i][j]);
    }
    printf("\n");
  } 
    
}

2-

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void){
  int matriz[5][5];

  for (int i = 0; i < 5; i++)
  {
    for (int j = 0; j < 5; j++)
    {
      matriz[i][j] = rand() % 100;
      printf("%d\t",matriz[i][j]);
    }
    printf("\n");
  }   
}

3-
*/

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void){
  int matriz[6][6], diag1 = 0, diag2 = 0;

  for (int i = 0; i < 6; i++)
  {
    for (int j = 0; j < 6; j++)
    {
      matriz[i][j] = rand() % 10;
      printf("%d\t",matriz[i][j]);
    }
    printf("\n");
  }

  for (int i = 0; i < 6; i++)
  {
    diag1 += matriz[i][i];
  }

  for (int i = 5; i >= 0; i--)
  {
    diag2 += matriz[5-i][i];
  }

  printf("Soma Diagonal Principal: %i\nSoma Diagonal Secundaria: %i", diag1, diag2);     
}