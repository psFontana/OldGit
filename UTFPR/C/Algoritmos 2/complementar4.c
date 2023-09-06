/*1-

#include <stdio.h>

void desenhaRetangulo(int n1, int n2){
  for (int i = 0; i < n1; i++)
  {
    for (int j = 0; j < n2; j++)
    {
      printf("*");
    }
    printf("\n");
  }
  
}

int main(void){
  int n1, n2;
  scanf("%i %i", &n1, &n2);
  desenhaRetangulo(n1, n2);
}

2-

#include <stdio.h>

void isTriang(int n){
  int aux = 0;
  for (int i = 0;; i++)
  {
    aux += i;
    if (aux > n)
    {
      printf("Não é :c");
      break;
    }else if (aux == n)
    {
      printf("É B)");
      break;
    }
    
    
  }  
}

int main(void){
  isTriang(2);
}

3-

#include <stdio.h>

int potencia(int n1, int n2){
  int aux = n1;
  for (int i = 1; i < n2; i++)
  {
    aux *= n1;
  }  
  return aux;
}

void potencializaVetor(int n, int vet[5]){
  for (int i = 0; i < 5; i++)
  {
   vet[i] = potencia(vet[i], n); 
   printf("%i ", vet[i]);
  }  
}

int main(void){

  int  mat[5] = {1, 2, 3, 4, 5};
  potencializaVetor(2, mat);

  return 0;
}

4-

#include <stdio.h>

void funcLeMatriz(int n, int mat[n][n]){
  int aux = 0;
  for (int i = 0; i < n; i++)
  {
    for (int j = 0; j < n; j++)
    {
      scanf(" %i", &mat[i][j]);
    }    
  }  
}

void funcPrintMatriz(int n, int mat[n][n]){
  printf("Matriz:\n=======================\n");
  for (int i = 0; i < n; i++)
  {
    for (int j = 0; j < n; j++)
    {
      printf("%i ", mat[i][j]);
    }
    printf("\n");
  } 
}

int funcParImpar(int n){
  int aux = 0;
  if (n % 2 == 0)
  {
    aux = 0;
  }else{
    aux = 1;
    }
    return aux;  
}


void funcSubstMatriz(int n, int mat[n][n]){
  for (int i = 0; i < n; i++)
  {
    for (int j = 0; j < n; j++)
    {
      mat[i][j] = funcParImpar(mat[i][j]);
    }
    
  }
  
}

int main(void) {
  int mat[3][3];
  funcLeMatriz(3, mat);
  funcPrintMatriz(3, mat);
  funcSubstMatriz(3, mat);
  funcPrintMatriz(3, mat);
}
*/
