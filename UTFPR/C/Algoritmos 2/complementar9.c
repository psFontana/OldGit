#include <stdio.h>
#include <stdlib.h>

void gravar(FILE* arq, char frase[100]){
  arq = fopen("Lista de compras.txt", "a");
  if (arq == NULL)
  {
    printf("Erro ao Ler arquivo.");
    exit(1);
  }
  fputs(frase, arq);
  fputs(", ", arq);
  fclose(arq);
}

void ler(FILE* arq){
  arq = fopen("Lista de compras.txt", "r");
  if (arq == NULL)
  {
    printf("Erro ao Ler arquivo.");
    exit(1);
  }
  
  char c = fgetc(arq);
  while (c != EOF)
  {
    printf("%c", c);
    c = fgetc(arq);
  }  
  fclose(arq);
}

void limpar(FILE* arq){
  arq = fopen("Lista de compras.txt", "w");
  if (arq == NULL)
  {
    printf("Erro ao limpar arquivo.");
    exit(1);
  }
  
  char c = fgetc(arq);
  int contador = 0;
  while (c != EOF)
  {
    contador++;
    c = fgetc(arq);
  }  

  for (int i = 0; i < contador; i++)
  { 
    printf('\0');
    fgetc(arq);
  }
  
  fclose(arq);
}

int main(void){
  FILE *f = fopen("Lista de compras.txt", "w+");
  fclose(f);
  char texto[100] = "";

  int option = 0;
  do{
    printf("\n\nEscolha uma Opção:\n1. Escrever itens na lista.\n2. Ler a lista.\n3. Limpar a lista\n4. Encerrar o sistema\n");
    scanf("%i", &option);
    switch (option){
      case 1:
        printf("Escreva os itens a serem gravados! :D\n");
        scanf("%s", &texto);
        gravar(f, texto);
        break;
      case 2:
        printf("Segue abaixo a sua lista de compras atual:\n");
        ler(f);
        break;
      case 3:
        printf("Limpando a sua lista...");
        limpar(f);
        break;
      case 4:
        printf("Encerrando Sistema... :c");
        break;
      default:
        printf("Escolha uma opção válida.");
    }
  } while (option != 4);
  

  return 0;
}