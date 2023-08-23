/*#include <stdio.h>

int main (void) {
  int contador = 0;
  char Palavra[100];
  gets(Palavra);
  for (int i = 0; Palavra[i] != '\0'; i++)
  {
    if (Palavra[i] == 'A' || Palavra[i] == 'a')
    {
      contador++;
    }
  }
  printf("A palavra %s tem %i letras A\n", Palavra, contador);
  return 0;
}

*/
#include <stdio.h>
#include <string.h>

int encontraPos(char frase[]){

  int pos = 0;
  int i = strlen(frase) - 2;

  for (i ; frase[i] != '\0'; i--){
    if (frase[i] == ' ' || frase[i] == ',' || frase[i] == '.'){
      break;
    }else{
      pos = i;
    }
  }
  
  return pos;
}

int main(void) {
 char frase[100] = "coisa muito boa", output[100];  
  for (int i = 0; frase[i] != '\0'; i++)
  {
    if (frase[i] == ' ' || frase[i] == ',' || frase[i] == '.')
    {
      break;
    }else{
      printf("%c", frase[i]);
    }
  }

  printf(" ");

  int j = encontraPos(frase) ;

  for (j ; frase[j] != '\0'; j++)
  {
    printf("%c", frase[j]);
  }
 
  return 0;
}