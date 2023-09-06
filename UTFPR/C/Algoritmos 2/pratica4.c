/*#include <stdio.h>

int multiplica (int x1, int x2){
return x1*x2;
} 

int quadrado (int x){
  return x*x;
}

int cubo (int x) {
  return x*x*x;
}

int pol_cubo(int a, int b, int c, int d, int x) {
  return a*x*x*x + b*x*x + c*x + d;
}

int main(void){
  int num = multiplica(2, 2);
  printf("%i", num);
}

2-

#include <stdio.h>

void printMatriz(int lin, int col, int mat[lin][col]){
  for (int i = 0; i < lin; i++)
  {
    for (int j = 0; j < col; j++)
    {
      printf("%i ", mat[i][j]);
    }
    printf("\n");
  }  
}

int processaMatriz(int lin, int col, int x,int mat[lin][col]){
  int contador = 0;
  for (int i = 0; i < lin; i++)
  {
    for (int j = 0; j < col; j++)
    {
      if (mat[i][j] > x)
      {
        mat[i][j] = 0;
        contador++;
      }      
    }    
  }  
  return contador;
}

3-
*/
#include <stdio.h>

void printVetor(int vet[], int n){
  for (int i = 0; i < n; i++)
  {
    printf("%i ", vet[i]);
  }  
}

void inverter(int vet[], int n){
    int aux = 0;
  for (int i = 0; i < n/2; i++)
  {
      aux = vet[i];
   vet[i] = vet[n-i-1]; 
   vet[n-i-1] = aux;
  }  
}