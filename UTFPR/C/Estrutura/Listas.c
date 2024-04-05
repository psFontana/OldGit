#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Criação da Estrutura
typedef struct NoLista* PtrNoLista;

typedef struct NoLista{
	int chave;
	PtrNoLista proximo;
}NoLista;

typedef struct{
	PtrNoLista inicio;
	int qtdElementos;
}ListaOrdenada;


// Inicialização Correta
void iniciaListaOrdenada(ListaOrdenada* l){
	l->inicio = NULL;
	l->qtdElementos = 0;
}


// Funções que podem ser úteis
int tamanhoListaOrdenada(ListaOrdenada *lista){
	return lista->qtdElementos;
}


void imprimirListaOrdenada(ListaOrdenada* l){
	printf("Lista = [ ");
  PtrNoLista aux;
	for(aux = l->inicio; aux != NULL; aux = aux->proximo){
		printf("%i ", aux->chave);
	}
  printf("]\n\n");
}

bool estaVaziaListaOrdenada(ListaOrdenada* l){
	return(l->inicio == NULL);
}


// Funções de Manipulação
void inserirListaOrdenada(ListaOrdenada* l, int num){
  PtrNoLista novo = malloc(sizeof(NoLista));
  novo->chave = num;
  PtrNoLista aux;
  aux = l->inicio;

  if (estaVaziaListaOrdenada(l))
  {
    l->inicio = novo;
		novo->proximo = NULL;
  }else if(num < l->inicio->chave){
		novo->proximo = l->inicio;
		l->inicio = novo;
	}else{
		PtrNoLista aux = l->inicio;
		aux = aux->proximo;
		while (aux->proximo != NULL && num > aux->proximo->chave)
		{
			aux = aux->proximo;
		}
		novo->proximo = aux->proximo;
		aux->proximo = novo;
	}
	l->qtdElementos++; 
}

bool removerListaOrdenada(ListaOrdenada *lista, int valor){
	PtrNoLista rm;
	if(estaVaziaListaOrdenada(lista) || valor < lista->inicio->chave){
		return false;
	}
	if (valor == lista->inicio->chave){
		rm = lista->inicio;
		lista->inicio = lista->inicio->proximo;
		free(rm);
		lista->qtdElementos--;
		return true;
	}
	PtrNoLista aux = lista->inicio;
	while(aux->proximo != NULL && valor > aux->proximo->chave){
		aux = aux->proximo;
	}
	if(aux->proximo == NULL || valor < aux->proximo->chave){
		return false;
	}
	rm = aux->proximo;
	aux->proximo = aux->proximo->proximo;
	free(rm);
	lista->qtdElementos--;
	return true;
}

bool exerc1(ListaOrdenada *l1, ListaOrdenada *l2){
	if (estaVaziaListaOrdenada(l1))
	{
		return false;
	}else if (estaVaziaListaOrdenada(l2))
	{
		return true;
	}	
	
	PtrNoLista aux1 = l1->inicio;
	PtrNoLista aux2 = l2->inicio;	
	
	for (; aux1->proximo != NULL; aux1 = aux1->proximo)
	{
		if (aux2->proximo == NULL)
		{
			return true;
		}
		aux2 = aux2->proximo;
	}
  return false;
}

void exerc2(ListaOrdenada *l1){
	PtrNoLista aux;
	for (int i = 0; i < l1->qtdElementos; i++)
	{
		if (l1->inicio->chave == 0;)
		{
			
			aux = l1->inicio;
			l1->inicio = l1->inicio->proximo;
			free(aux);
			l1->qtdElementos--;
		}
		
	}
	
	aux = l1->inicio;

	for (int i = 0; i < l1->qtdElementos; i++)
	{
		if (aux->proximo->chave == 0)
		{
			aux->proximo = aux->proximo->proximo;
		}
		
	}
	
	
}

int main(int argc, char * argv[]) {

	ListaOrdenada lista;
	iniciaListaOrdenada(&lista);
	if(estaVaziaListaOrdenada(&lista)){
		printf("Lista esta vazia!\n");
	}
	int tam = tamanhoListaOrdenada(&lista);
	printf("Tamanho = %d\n", tam);
	inserirListaOrdenada(&lista, 10);
	inserirListaOrdenada(&lista, 4);
	inserirListaOrdenada(&lista, 15);
	inserirListaOrdenada(&lista, 22);
	inserirListaOrdenada(&lista, 25);
	inserirListaOrdenada(&lista, 17);	
	inserirListaOrdenada(&lista, 30);
	imprimirListaOrdenada(&lista);
	removerListaOrdenada(&lista, 4);
	imprimirListaOrdenada(&lista);	

	ListaOrdenada lista2;
	iniciaListaOrdenada(&lista2);

	if (exerc1(&lista, &lista2))
	{
		printf("1 maior");
	}else{
		printf("2 maior");
	}
  return 0;
}
