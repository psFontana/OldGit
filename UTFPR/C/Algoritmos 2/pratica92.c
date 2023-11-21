#include <stdio.h>
#include <stdlib.h>
/*
1-

void lerItensDaLista(FILE *arq){
  char palavra[100] = "oi";
  fscanf(arq, "%[^EOF]s", palavra);
  printf("%s", palavra);
}

int main(void){
  FILE *arq;
  arq = fopen("ListaCompras.txt", "w+");    
  // 1o. item
  fprintf(arq, "%s\n", "Leite");
  // 2o. item
  fprintf(arq, "%s\n", "Pao");
  // 3o. item
  fprintf(arq, "%s\n", "Presunto");
  // 4o. item
  fprintf(arq, "%s\n", "Manteiga");
      
  rewind(arq);
      
  lerItensDaLista(arq);
  fclose(arq);
}

2-

typedef struct Aposta{
  int nroCartao; 
  int dezenas[6];
}APOSTA;

int *lerDezenasDoCartao(FILE *arq, int cartao) {
    APOSTA aposta;

    while (fread(&aposta, sizeof(APOSTA), 1, arq)) {
        if (aposta.nroCartao == cartao) {
            // Encontrou o cartão, alocar e retornar o vetor com as dezenas
            int *dezenas = malloc(6 * sizeof(int));
            if (dezenas == NULL) {
                printf("Erro na alocacao de memoria.\n");
                exit(1);
            }

            for (int i = 0; i < 6; i++) {
                dezenas[i] = aposta.dezenas[i];
            }

            return dezenas;
        }
    }

    // Cartão não encontrado
    return NULL;
}

void mostrarDezenasDoCartao(int *v, int tam){
  
  if (v == NULL)
  {
    printf("Dezenas nao localizadas");
  }
  

  for (int i = 0; i < tam; i++)
  {
    printf("%i ", v[i]);
  }
}

int main(void){
  FILE *arq;
  arq = fopen("Apostas.bin", "a+b");
  APOSTA aposta;
  aposta.nroCartao = 1548;
  aposta.dezenas[0] = 4;
  aposta.dezenas[1] = 5;
  aposta.dezenas[2] = 10;
  aposta.dezenas[3] = 12;
  aposta.dezenas[4] = 14;
  aposta.dezenas[5] = 25;
  fwrite(&aposta,sizeof(struct Aposta),1,arq);

  aposta.nroCartao = 2107;
  aposta.dezenas[0] = 1;
  aposta.dezenas[1] = 2;
  aposta.dezenas[2] = 18;
  aposta.dezenas[3] = 33;
  aposta.dezenas[4] = 49;
  aposta.dezenas[5] = 51;
  fwrite(&aposta,sizeof(struct Aposta),1,arq);
  rewind(arq);
  int cartao = 830;
  int *dezenas = lerDezenasDoCartao(arq, cartao);
  mostrarDezenasDoCartao(dezenas, 6);
  fclose(arq);
}
*/

void gravaNoArquivo(FILE *fp, int v[], int n){
  for (int i = 0; i < n; i++)
  {
    fprintf(fp,"%i ", v[i]);
  }
  rewind(fp);
}

int somaArquivo(FILE *fp){
  int number = 0, soma = 0;
  while (fscanf(fp, "%i ", &number) == 1)
  {
    soma += number;
  }
  return soma; 
}

int main(void){
  int v[] = {1,2,3,4,5};
  FILE *fp = fopen("arquivo.txt","w+");
  gravaNoArquivo(fp,v,5);
  printf("Soma = %d\n",somaArquivo(fp));
  fclose(fp);
  return 0;
}