#include <stdio.h>
#include <stdlib.h>

typedef struct No{
  int chave;
  struct No* esq;
  struct No* dir;
}No;

struct No* criarNo (int chave) {
  struct No* novoNo = (struct No*)malloc(sizeof(struct No));
  novoNo->chave = chave;
  novoNo->dir = NULL;
  novoNo->esq = NULL;
  return novoNo;
}

struct No* inserir (struct No* raiz, int chave){
  if (raiz == NULL)
  {
    return criarNo(chave);
  }else if(raiz->chave > chave){
    raiz->esq = inserir(raiz->esq, chave);
  }else if(raiz->chave < chave){
    raiz->dir = inserir(raiz->dir, chave);
  }
  return raiz;
}

void print (struct No* raiz){
  if (raiz != NULL)
  {
    printf("%i ", raiz->chave);
    print(raiz->esq);
    print(raiz->dir);
  }
  
}

void preOrdem (struct No* raiz){
  if (raiz != NULL){
    printf("%i ", raiz->chave);
    preOrdem(raiz->esq);
    preOrdem(raiz->dir);
  }
}

void ordem (struct No* raiz){
  if (raiz != NULL){
    ordem(raiz->esq);
    printf("%i ", raiz->chave);
    ordem(raiz->dir);
  }
}

void posOrdem (struct No* raiz){
  if (raiz != NULL){
    posOrdem(raiz->esq);
    posOrdem(raiz->dir);
    printf("%i ", raiz->chave);
  }
}



int main(void){
  No* raiz = NULL;
  raiz = inserir(raiz, 50);
  raiz = inserir(raiz, 30);
  raiz = inserir(raiz, 20);
  raiz = inserir(raiz, 40);
  raiz = inserir(raiz, 70);
  raiz = inserir(raiz, 60);
  raiz = inserir(raiz, 80);
  raiz = inserir(raiz, 85);
  raiz = inserir(raiz, 90);
  printf("\npre: ");
  preOrdem(raiz);
  printf("\nord: ");
  ordem(raiz);
  printf("\npos: ");
  posOrdem(raiz);
  return 0;
}
