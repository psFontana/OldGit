#include <stdio.h>
#include <stdlib.h>

// int* aloca_vetor(int n){
//   int* v = (int*) malloc(n * sizeof(int));
//   if (v == NULL)
//   {
//     exit(-1);
//   }
//   return v;
// }

// void le_elementos(int* v, int n){
//   for(int i=0; i < n; i++){
//     scanf("%d", &v[i]);
//   }
// }
// void print_vetor(int* v, int n){
//   for (int i = 0; i < n; i++)
//   {
//   }
// }

// int main(void){
//   printf("simbora");
//   int n, *p;
//   scanf("%d", &n);
//   p = aloca_vetor(n);
//   le_elementos(p, n);
//   print_vetor(p, n);
//   return 0;
// }

// int** aloca_matriz(int m, int n){
//   int** mat = (int**) calloc(m,sizeof(int*));
//   for (int i = 0; i < n; i++)
//   {
//     mat[i] = (int*) calloc(n, sizeof(int));
//   }

//   return mat;
// }

// int main(void){
//   int **p;
//   int m, n, i, j;
//   scanf("%d %d",&m, &n);
//   p = aloca_matriz(m, n);

//   for (i = 0; i < m; i++) {
//     for (j = 0; j < n; j++) {
//           p[i][j] = (i*m) + (j+1);
//     }
//   }
//   for (i = 0; i < m; i++) {
//     for (j = 0; j < n; j++) {
//         printf("%d ", p[i][j]);
//     }
//       printf("\n");
//   }
// }

// int **aloca_matriz_quadrada(int n){
//   int **mat = (int**)calloc(n, sizeof(int*));
//   for (int i = 0; i < n; i++)
//   {
//     mat[i] = (int*) calloc(n, sizeof(int));
//   }
//   return mat;
// }

// int main(void){
//   int n, i, j, **p;
//   scanf("%d", &n);        
//   p = aloca_matriz_quadrada(n);  
      
//   for (i = 0; i < n; i++) {
//       for (j = 0; j < n; j++) {
//           p[i][j] = (i*n) + (j+1);
//       }
//   }
//   for (i = 0; i < n; i++) {
//       for (j = 0; j < n; j++) {
//           printf("%d ", p[i][j]);
//       }
//       printf("\n");
//   }
// }

// char string[100];

// void inverter(int pos){
//   if (string[pos] == '\0')
//   {
//     return;
//   }
//   inverter(pos+1);
//   printf("%c", string[pos]);
// }

// int main(void){
//   scanf("%s", string);
//   inverter(0);
// }

int multiplicacao_recursiva(int n1, int n2){
  if (n1 == 1)
  {
    return n2;
  }

  return multiplicacao_recursiva(n1-1, n2) + n2;
}

int main(void){
  int v1, v2;
  scanf("%d %d", &v1, &v2);
  printf("Multiplicacao recursiva: %d", multiplicacao_recursiva(v1,v2));
}