#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h> //0/1 false/true


typedef struct NoPilha* PtrNoPilha;
typedef struct NoPilhaStr* PtrNoPilhaStr;

struct NoPilha{
	int elemento;
	PtrNoPilha proximo;
}NoPilha;

struct NoPilhaStr{
	char letra;
	PtrNoPilhaStr proximo;
}NoPilhaStr;

typedef struct{
	PtrNoPilha topo;
	int qtde;
}PilhaDinamica;

typedef struct{
	PtrNoPilhaStr topo;
	int qtde;
}PilhaDinamicaStr;

void iniciaPilhaDinamica(PilhaDinamica *p){
	p->qtde = 0;
	p->topo = NULL;	
}

void iniciaPilhaDinamicaStr(PilhaDinamicaStr *p){
	p->qtde = 0;
	p->topo = NULL;	
}

bool estaVaziaPilhaDinamica(PilhaDinamica *p){
	return(p->topo == NULL);
}

bool estaVaziaPilhaDinamicaStr(PilhaDinamicaStr *p){
	return(p->topo == NULL);
}

int tamanhoPilhaDinamica(PilhaDinamica *p){
	return(p->qtde);
}

void imprimirPilhaDinamica(PilhaDinamica *p){
	printf("Pilha = [");
	PtrNoPilha aux;
	for(aux =p->topo; aux != NULL; aux =  aux->proximo){
		printf("%d ", aux->elemento);
	}
	printf(" ]\n");
}

void inserirPilhaDinamica(PilhaDinamica *p, int num){
	PtrNoPilha aux = malloc(sizeof(NoPilha));
	aux->elemento = num;
	aux->proximo = p->topo;
	p->topo = aux;
	p->qtde++;
}

void inserirPilhaDinamicaStr(PilhaDinamicaStr *p, char letter){
	PtrNoPilhaStr aux = malloc(sizeof(NoPilhaStr));
	aux->letra = letter;
	aux->proximo = p->topo;
	p->topo = aux;
	p->qtde++;
}

void removerPilhaDinamica(PilhaDinamica *p){
	if(!estaVaziaPilhaDinamica(p)){
		PtrNoPilha aux;
		aux = p->topo;
		p->topo = p->topo->proximo;
		free(aux);
		p->qtde--;		
	}
	else{
		printf("Warning: pilha esta vazia!\n");
	}
}

void removerPilhaDinamicaStr(PilhaDinamicaStr *p){
	if(!estaVaziaPilhaDinamicaStr(p)){
		PtrNoPilhaStr aux;
		aux = p->topo;
		p->topo = p->topo->proximo;
		free(aux);
		p->qtde--;		
	}
	else{
		printf("Warning: pilha esta vazia!\n");
	}
}

//exercício 3:

bool exerc3(char palavra[]){
  PilhaDinamicaStr* pilha = malloc(sizeof(PilhaDinamicaStr));
  if(pilha == NULL){
    return true;
  }
  iniciaPilhaDinamicaStr(pilha);
  for (int i = 0; palavra[i] != '\0'; i++)
  {
    inserirPilhaDinamicaStr(pilha, palavra[i]);
  }
  for (int i = 0; palavra[i] != '\0'; i++)
  {
    if(palavra[i] != pilha->topo->letra){
      return false;
    }
    removerPilhaDinamicaStr(pilha);
  }
    return true;
}

int main(void){
  char teste[14] = "ABABBACABBABA";
  if(exerc3(teste) == true){
    printf("Isso ai");
  }else{
    printf("Deu n");
  }

  return 0;
}