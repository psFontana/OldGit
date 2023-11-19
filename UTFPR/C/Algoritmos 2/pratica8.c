#include <stdio.h>

int multiplicacao_recursiva(int n1, int n2){
  n1--;
  if (n1 == 0)
  {
    return n2;
  }
  
  return n2 + multiplicacao_recursiva(n1, n2);
}

int main(void){

  int v1, v2;
  scanf("%d %d", &v1, &v2);
  printf("Multiplicacao recursiva: %d", multiplicacao_recursiva(v1,v2));
  

  return 0;
}

/*2-

#include <stdio.h>

char string[100];

void inverter(int pos){
  if (string[pos] == '\0')
  {
    return;
  }
  inverter(pos+1);
  printf("%c", string[pos]);
  
}

int main(void){
  scanf("%s", string);
  inverter(0);
  return 0;
}

3-

#include <stdio.h>

int somatorio(int n){
  if (n == 1)
  {
    return 1; 
  }
  return n + somatorio(n-1);
}

int main(void){
  int numer = somatorio(5);
  printf("%i", numer);
  return 0;
}*/