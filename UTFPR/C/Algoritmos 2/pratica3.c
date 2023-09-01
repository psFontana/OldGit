/*

1-

#include <stdio.h>
#include <string.h>

int main(void){
  int n = 0;
  scanf(" %i", &n);
  double matriz[n][n];
  for (int i = 0; i < n; i++)
  {
    for (int j = 0; j < n; j++)
    {
      scanf(" %lf", &matriz[i][j]);
      printf("%.1lf ", (matriz[i][j])*2);
    }
    printf("\n");
    
  }
  
}

2-

#include <stdio.h>
#include <string.h>

int main(void){
  int n = 0;
  scanf(" %i", &n);
  double matriz[n][n], copia[n][n];

  for (int i = 0; i < n; i++)
  {
    for (int j = 0; j < n; j++)
    {
      scanf(" %lf", &copia[i][j]);
      matriz[i][j] = 0;
    }
  }

  for (int i = 0; i < n; i++)
  {
    for (int j = 0; j < n; j++)
    {
      for (int z = 0; z < n; z++)
      {
        matriz[j][i] += ((copia[z][i]) * (copia[j][z]));
      }
      
    }
    
  }
  
  for (int i = 0; i < n; i++)
  {
    for (int j = 0; j < n; j++)
    {
      printf("%.1lf ", matriz[i][j]);
    }
    printf("\n");
    
  }  
}

3-
*/
#include <stdio.h>
#include <string.h>

int main(void){
  int matriz[3][3];

  for (int i = 0; i < 3; i++)
  {
    for (int j = 0; j < 3; j++)
    {
      scanf(" %i", &matriz[i][j]);
    }
  } 
  for (int i = 0; i < 3; i++)
  {
    for (int j = 0; j < 3; j++)
    {
    printf("%i ", matriz[j][i]);
    }
    printf("\n");
  }
  
}
