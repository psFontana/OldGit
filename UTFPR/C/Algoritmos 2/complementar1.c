/*

1-

#include <stdio.h>

int main(void){

  int n = 0;
  scanf("%i", &n);
  float Nota1[n], Nota2[n], Nota3[n], Media[n];

  for (int i = 0; i < n; i++)
  {
    scanf("%f", &Nota1[i]);
    scanf("%f", &Nota2[i]);
    scanf("%f", &Nota3[i]);
    Media[i] = (Nota1[i] + Nota2[i] + Nota3[i])/3;
  }
  printf("Medias:\n");
  for (int j = 0; j < n; j++)
  {

    printf("Aluno %i => %.2f\n", j, Media[j]);
  }
  
  

  return 0;
}

2-

#include <stdio.h>

int main(void){

  int N = 0;
  scanf("%i", &N);
  int X[N];
  
 int Y[(N+1)/2];  

  for (int i = 0; i < N; i++)
  {
    scanf("%i", &X[i]);
    if (i%2 == 0)
    {
      Y[i/2] = X[i];
      printf("Y[%i] = %i\n", i/2, X[i]);
    }
     
  }

  return 0;
}

3-

#include <stdio.h>

int main(void){

  int N = 0, valid = 0;
  scanf("%i", &N);
  int X[N];

  for (int i = 0; i < N; i++)
  {
    scanf("%i", &valid);
    if (valid >= 0 && valid <= 9)
    {
      X[i] = valid;
    }else{
      printf("Valor inválido! Tente novamente.\n");
      i--;
    }
     
  }

  for (int j = 0; j < N; j++)
  {
    if (X[j] == X[N-j-1])
    {
      valid = 1;
    }else{
      valid = 0;
      break;
    }
    
  }
  if (valid)
  {
    printf("Mesma sequencia!");
  }else{
    printf("Sequencias diferentes.");
  }
  

  return 0;
}

4-

#include <stdio.h>

int main(void){

  int N = 0;
  scanf("%i", &N);
  float X[N], number = 0;

  for (int i = 0; i < N; i++)
  {
    scanf("%f", &X[i]);     
  }

  scanf("%f", &number);

  for (int j = 0; j < N; j++)
  {
    if (X[j] == number)
    {
      printf("Encontrado na posição %i.", j);
      break;
    }else if (j == N-1)
    {
      printf("Valor não está armazenado no vetor.");
    }
    
  }
  
  return 0;
}
*/