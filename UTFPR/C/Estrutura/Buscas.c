#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

bool linear(int vetor[], int tam, int num){
  for (int i = 0; i < tam; i++)
  {
    if (vetor[i] == num)
    {
      return true;
    }    
  }
  return false;  
}

bool ordenada (int vetor[], int tam, int num){
  for (int i = 0; i < tam; i++)
  {
    if (vetor[i] == num)
    {
      return true;
    }else if (vetor[i] > num)
    {
      return false;
    }
  }
  return false;  
}

bool binaria (int vetor[], int tam, int num){
  int final = tam-1;
  int inicio = 0;
  while (inicio <= final)
  {
    int meio = (final + inicio)/2;
    if (vetor[meio] == num)
    {
      return true;
    }else if (vetor[meio] > num)
    {
      final = meio-1;
    }else{
      inicio = meio+1;
    }  
  }
  return false;
}

void trocar(int* a, int* b){
  int aux = *a;
  *a = *b;
  *b = aux;
}

int* bubbleSort(int V[], int N) {
    int trocou = 1;
    int contador = 0;
    int *vetor = malloc(N*sizeof(int));
    
    while (trocou) {
        trocou = 0;
        for (int i = 0; i < N-1; i++) {
            if (V[i] > V[i+1]) {
                trocar(&V[i], &V[i+1]);
                trocou = 1;
                vetor[contador] = i;
                contador++;
            }
        }
        N--;
    }
  return vetor;
}

void insertionSortLinear(int V[], int TAM) {
  for (int i = 1; i < TAM; i++) {
    int auxiliar = V[i];
    int j = i - 1;

    // Mover os elementos do vetor que são maiores que o auxiliar uma posição à frente
    while (j >= 0 && V[j] > auxiliar) {
      V[j + 1] = V[j];
      j--;
    }
    // Inserir o auxiliar na posição correta
    V[j + 1] = auxiliar;
  }
}

int main(void){
  int vetor[4] = {1, 4 ,3, 7};
  int vetorOrdenado[6] = {1, 3, 5, 7, 9, 11};

  if(linear(vetor, 4, 2)){
    printf("Existente\n");
  }else{
    printf("Inexistente\n");
  }
  if(ordenada(vetorOrdenado, 4, 2)){
    printf("Existente\n");
  }else{
    printf("Inexistente\n");
  }
  if(binaria(vetor, 4, 2)){
    printf("Existente\n");
  }else{
    printf("Inexistente\n");
  }
  
  return 0;
}