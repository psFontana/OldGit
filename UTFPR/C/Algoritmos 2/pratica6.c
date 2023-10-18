/*
1-

#include <stdio.h>
#include <stdlib.h>

int* aloca_vetor(int n){
  int* ptr = (int*) malloc(n * sizeof(int));
  return ptr;
}

void le_elementos(int* ptr, int N){
  for (int i = 0; i < N; i++)
  {
    scanf(" %i", &ptr[i]);
  }
  
}

void print_vetor(int* ptr, int N){
  float media = 0;
  for (int i = 0; i < N; i++)
  {
    media+=ptr[i];
    printf("v[%i]=%i\n", i, ptr[i]);
  }
  printf("Media=%.2f", media /= N); 
}

2-

#include <stdio.h>
#include <stdlib.h>

int** aloca_matriz(int m, int n){
  int *lin = (int*) malloc(m * sizeof(int));
  int **mat = (int**) malloc(n * sizeof(lin));
  for (int i = 0; i < n; i++)
  {
    mat[i] = (int*) malloc(m * sizeof(int));
  }
  return mat;
}

3-
*/
int** aloca_matriz_quadrada(int n){
  int **mat = (int**) malloc(n*sizeof(int));
  for (int i = 0; i < n; i++)
  {
    mat[i] = (int*) malloc(sizeof(mat));
  }
  return mat;
}