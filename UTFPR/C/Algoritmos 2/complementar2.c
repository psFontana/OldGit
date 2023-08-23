/*
1-
#include <stdio.h>

int main(void){

  char frase[100];
  gets(frase);

  for (int i = 0; frase[i] != '\0'; i++)
  {
    printf("%c\n", frase[i]);
  }
  

  return 0;
}

2-

#include <stdio.h>
#include <string.h>

int main(void){

  char frase[100];
  gets(frase);

  
  for (int i = strlen(frase); i > -1; i--)
  {
    printf("%c", frase[i]);
  }
  

  return 0;
}

3-

#include <stdio.h>
#include <string.h>

int main(void){

  char frase1[100], frase2[100];
  gets(frase1);
  gets(frase2);

  if (strcmp(frase1, frase2))
  {
    printf("As frases sao diferentes");
  }else
  {
    printf("As frases sao iguais");
  }

  return 0;
}

4-*/

#include <stdio.h>
#include <string.h>

int main(void){

  char palavra[100];
  gets(palavra);

  int contador[256] = {0};

  for (int i = 0; palavra[i] != '\0'; i++)
  {
    contador[(int)palavra[i]]++;
  }

  for (int i = 0; i < 256; i++)
  {
    if (contador[i] >0)
    {
    printf("%c: %i\n", (char)i, contador[i]);
    }
    
  }

  return 0;
}