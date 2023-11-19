/*
1-

#include <stdio.h>

void gravaNoArquivo(FILE *fp, char *v){
  fputs(v, fp);
}

int encontrouCaractereArquivo(FILE* arq, char c){
  rewind(arq);
while (fgetc(arq)!=EOF)
{
  if (fgetc(arq) == c)
  {
    return 1;
  }
}

  return 0;
}

2-

#include <stdio.h>

int contaCaracteresArquivo(FILE* arq){
  int i;
  char c = fgetc(arq);
  for (i = 0; c != EOF;i++)
  {
    if(c == ' ' || c == '\n'){i--;}
    c=fgetc(arq);
  }
  return i; 
}

3-
*/

#include <stdio.h>
#include <stdlib.h>

int contaCaracteresArquivo(FILE* arq){
  int i=0;
  char c = fgetc(arq);
while (c != EOF)
{
  if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')){
    i++;
  }
  c = fgetc(arq);
}

  rewind(arq);
  return i; 
}

char *findAlphabeticFile(FILE *f){
  int tamanho = contaCaracteresArquivo(f);
  char* v = (char*)calloc(tamanho+1, sizeof(char));
  if (tamanho == 0)
  {
    printf("NULL");
  }
  
  int pos = 0;
  char c = fgetc(f);
  for (; c != EOF; c=fgetc(f))
  {
    if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')){
     v[pos] = c;
     pos++; 
    }
  }
  v[pos] = '\0';
  return v;
}

int main(void){	
  FILE *f = fopen("arquivo.txt","w+");
  char frase[] = "n1c$*46r1@Trb91cG4r";
  fprintf(f,"%s",frase);
  rewind(f);
  char *s = findAlphabeticFile(f);
  printf("%s\n",s);
  fclose(f);
  free(s);
  return 0;
}