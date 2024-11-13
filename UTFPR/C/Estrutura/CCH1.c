#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>

typedef struct NoFila* PtrNoFila;

typedef struct NoFila{
	int id;
	PtrNoFila proximo;
} NoFila;

typedef struct{
	PtrNoFila inicio;
	PtrNoFila fim;
	int qtdElementos;
} FilaDinamica;

void iniciaFilaDinamica(FilaDinamica *f){
	f->inicio = NULL;
	f->fim = NULL;
	f->qtdElementos = 0;
}

bool estaVaziaFilaDinamica(FilaDinamica *f){
	return(f->inicio == NULL);
}

int tamanhoFilaDinamica(FilaDinamica *f){
	return f->qtdElementos;
}

void inserirFilaDinamica(FilaDinamica *f, int valor){
	PtrNoFila aux = (PtrNoFila)malloc(sizeof(NoFila));
	aux->id = valor;
	aux->proximo = NULL;
	if(estaVaziaFilaDinamica(f)){
		f->inicio = aux;
	}
	else{
		f->fim->proximo = aux;
	}
	f->fim = aux;
	f->qtdElementos++;
}

void removerFilaDinamica(FilaDinamica *f){
	if(!estaVaziaFilaDinamica(f)){
		PtrNoFila aux;
		aux = f->inicio;
		f->inicio = f->inicio->proximo;
		free(aux);
		f->qtdElementos--;
	}
	else{
		printf("Fila Vazia!\n");
		}
}

int inicioFilaDinamica(FilaDinamica *f){
	int ret = -1;
	if(!estaVaziaFilaDinamica(f)){
		ret = f->inicio->id;
	}
	return ret;
}

int fimFilaDinamica(FilaDinamica *f){
	int ret = -1;
	if(!estaVaziaFilaDinamica(f)){
		ret = f->fim->id;
	}
	return ret;
}

void imprimirFilaDinamica(FilaDinamica *f){
	printf("[ ");
	PtrNoFila aux;
	for(aux=f->inicio;aux!=NULL;aux=aux->proximo){
		printf("%d ", aux->id);
	}
	printf("]\n");
}

typedef struct NoLista* PtrNoLista;

typedef struct NoLista{
	int tempo;
  int id;
	PtrNoLista proximo;
}NoLista;

typedef struct{
	PtrNoLista inicio;
	int qtdeElementos;
}ListaOrdenada;

void iniciaListaOrdenada(ListaOrdenada *lista){
	lista->inicio = NULL;
	lista->qtdeElementos = 0;	
}

bool estaVaziaListaOrdenada(ListaOrdenada *lista){
	return(lista->qtdeElementos == 0);
	//ou return(lista->inicio==NULL)
}

int tamanhoListaOrdenada(ListaOrdenada *lista){
	return lista->qtdeElementos;
}

void imprimirListaOrdenada(ListaOrdenada *lista){
	printf("[ ");
	PtrNoLista aux;
	for(aux=lista->inicio; aux!=NULL; aux = aux->proximo){
		printf("%d ", aux->tempo);
	}

	printf("]\n");
}

void inserirListaOrdenada(ListaOrdenada *lista, int temp, int ids){
	PtrNoLista novo = (PtrNoLista)malloc(sizeof(NoLista));
	novo->tempo = temp;
  novo->id = ids;
	
	if(estaVaziaListaOrdenada(lista)){
		lista->inicio = novo;
		novo->proximo = NULL;
	}else if(temp < lista->inicio->tempo){
		novo->proximo = lista->inicio;
		lista->inicio = novo;
	}else{
		PtrNoLista aux = lista->inicio;
	//	aux = aux->proximo;
		while(aux->proximo != NULL && temp > aux->proximo->tempo){
			aux = aux->proximo;
		}
			novo->proximo = aux->proximo;
			aux->proximo = novo;
		
		}
		lista->qtdeElementos++;
	}

bool removerListaOrdenada(ListaOrdenada *lista){
	PtrNoLista rm;
	if(estaVaziaListaOrdenada(lista)){
		return false;
	}
		rm = lista->inicio;
		lista->inicio = lista->inicio->proximo;
		free(rm);
		lista->qtdeElementos--;
		return true;
	}
// Daqui para cima é o código que está disponível no Moodle, apenas modifiquei o "removerListaOrdenada" para que ele
// apenas removesse o primeiro elemento, tal como uma fila ou pilha, sem ter que passar o número que desejo remover
// e as funções de imprimir para não imprimir mais o que era a estrutura.

//definição da struct aeroporto, com as 4 prateleiras e o hangar(quando os aviões já pusaram).
typedef struct{
  ListaOrdenada prat1;
  ListaOrdenada prat2;
  ListaOrdenada prat3;
  ListaOrdenada prat4;
  FilaDinamica hangar;
}Aeroporto;

void iniciaAeroporto(Aeroporto *aeroporto) {
  iniciaFilaDinamica(&(aeroporto->hangar));
  iniciaListaOrdenada(&(aeroporto->prat1));
  iniciaListaOrdenada(&(aeroporto->prat2));
  iniciaListaOrdenada(&(aeroporto->prat3));
  iniciaListaOrdenada(&(aeroporto->prat4));
}

//Função para tirar das prateleiras todos os aviões com tempo = 1.
int aterrizarEmergencia(Aeroporto *aeroporto){
  int n1 = aeroporto->prat1.qtdeElementos, n2 = aeroporto->prat2.qtdeElementos, n3 = aeroporto->prat3.qtdeElementos, n4 = aeroporto->prat4.qtdeElementos, contador = 0;
  while (n1 > 0 || n2 > 0 || n3 > 0 || n4 > 0) {
    if (n1 > 0) {
      if (aeroporto->prat1.inicio->tempo == 1) {
				inserirFilaDinamica(&(aeroporto->hangar),aeroporto->prat1.inicio->id);
        removerListaOrdenada(&(aeroporto->prat1));
        contador++;
      }
      n1 = aeroporto->prat1.qtdeElementos;
    }

    if (n2 > 0) {
      if (aeroporto->prat2.inicio->tempo == 1) {
				inserirFilaDinamica(&(aeroporto->hangar),aeroporto->prat2.inicio->id);
        removerListaOrdenada(&(aeroporto->prat2));
        contador++;
      }
      n2 = aeroporto->prat2.qtdeElementos;
    }

    if (n3 > 0) {
      if (aeroporto->prat3.inicio->tempo == 1) {
				inserirFilaDinamica(&(aeroporto->hangar),aeroporto->prat3.inicio->id);
        removerListaOrdenada(&(aeroporto->prat3));
        contador++;
      }
      n3 = aeroporto->prat3.qtdeElementos;
    }

    if (n4 > 0) {
      if (aeroporto->prat4.inicio->tempo == 1) {
				inserirFilaDinamica(&(aeroporto->hangar),aeroporto->prat4.inicio->id);
        removerListaOrdenada(&(aeroporto->prat4));
        contador++;
      }
      n4 = aeroporto->prat4.qtdeElementos;
    }

		if (aeroporto->prat4.inicio->tempo > 1 && aeroporto->prat3.inicio->tempo > 1 && aeroporto->prat2.inicio->tempo > 1 && aeroporto->prat1.inicio->tempo > 1)
		{
			break;
		}
		
  }
	if(contador > 3){
		printf("Acabou a gasolina, todo mundo Morreu :C");
	}
	return contador;
}

//Função para tirar das prateleiras 3 aviões.
void aterrizarAvioes(Aeroporto *aeroporto){
	  int n1 = aeroporto->prat1.qtdeElementos, n2 = aeroporto->prat2.qtdeElementos, n3 = aeroporto->prat3.qtdeElementos, n4 = aeroporto->prat4.qtdeElementos, contador = aterrizarEmergencia(aeroporto);
	while (contador < 3)
	{
		if(n1 > n2 && n1 > n3 && n1 > n4){
			inserirFilaDinamica(&(aeroporto->hangar),aeroporto->prat1.inicio->id);
			removerListaOrdenada(&aeroporto->prat1);
			n1 = aeroporto->prat1.qtdeElementos;
      contador++;
		}else if(n2 > n3 && n2 > n4){
			inserirFilaDinamica(&(aeroporto->hangar),aeroporto->prat2.inicio->id);
			removerListaOrdenada(&aeroporto->prat2);
			n2 = aeroporto->prat2.qtdeElementos;
      contador++;
		}else if(n3 > n4){
			inserirFilaDinamica(&(aeroporto->hangar),aeroporto->prat3.inicio->id);
			removerListaOrdenada(&aeroporto->prat3);
			n3 = aeroporto->prat3.qtdeElementos;
      contador++;
		}else{
			inserirFilaDinamica(&(aeroporto->hangar),aeroporto->prat4.inicio->id);
			removerListaOrdenada(&aeroporto->prat4);
			n4 = aeroporto->prat4.qtdeElementos;
      contador++;
		}
	}	
}

//Função para tirar 3 aviões do Hangar.
void decolarAvioes(Aeroporto *aeroporto){
	int contador = 1;
	while(!estaVaziaFilaDinamica(&(aeroporto->hangar)) && contador <= 3){
		removerFilaDinamica(&(aeroporto->hangar));
		contador++;
	}
}

void imprimirAeroporto(Aeroporto *aeroporto){
		printf("\nPrateleira 1: ");
		imprimirListaOrdenada(&(aeroporto->prat1));
		printf("\nPrateleira 2: ");
		imprimirListaOrdenada(&(aeroporto->prat2));
		printf("\nPrateleira 3: ");
		imprimirListaOrdenada(&(aeroporto->prat3));
		printf("\nPrateleira 4: ");
		imprimirListaOrdenada(&(aeroporto->prat4));
		printf("Hangar: ");
		imprimirFilaDinamica(&(aeroporto->hangar));
}

void diminuiTempo(Aeroporto *aeroporto){
	PtrNoLista aux =(PtrNoLista)malloc(sizeof(NoLista));
	aux = aeroporto->prat1.inicio;
	while (aux != NULL)
	{
		aux->tempo--;
		aux = aux->proximo;
	}
	aux = aeroporto->prat2.inicio;
	while (aux != NULL)
	{
		aux->tempo--;
		aux = aux->proximo;
	}
	aux = aeroporto->prat3.inicio;
	while (aux != NULL)
	{
		aux->tempo--;
		aux = aux->proximo;
	}
	aux = aeroporto->prat4.inicio;
	while (aux != NULL)
	{
		aux->tempo--;
		aux = aux->proximo;
	}
	
}

void passaTempo(Aeroporto *aeroporto){
	printf("\n===============================\n");
	imprimirAeroporto(aeroporto);
	aterrizarAvioes(aeroporto);
	printf("\n=========apos=meia=hora==========\n=========3=avioes=pousam==========");
	imprimirAeroporto(aeroporto);
	decolarAvioes(aeroporto);
	printf("\n=========apos=meia=hora==========\n=========3=avioes=decolam==========");
	diminuiTempo(aeroporto);
	imprimirAeroporto(aeroporto);
}

int main(int argc, char * argv[]) {
	Aeroporto congonhas;
  iniciaAeroporto(&congonhas);
	inserirListaOrdenada(&(congonhas.prat1), 1, 1);
	inserirListaOrdenada(&(congonhas.prat1), 2, 2);
	inserirListaOrdenada(&(congonhas.prat1), 3, 3);
	inserirListaOrdenada(&(congonhas.prat1), 4, 4);

	inserirListaOrdenada(&(congonhas.prat2), 5, 5);
	inserirListaOrdenada(&(congonhas.prat2), 6, 6);
	inserirListaOrdenada(&(congonhas.prat2), 7, 7);
	inserirListaOrdenada(&(congonhas.prat2), 8, 8);

	inserirListaOrdenada(&(congonhas.prat3), 9, 9);
	inserirListaOrdenada(&(congonhas.prat3), 10, 10);
	inserirListaOrdenada(&(congonhas.prat3), 11, 11);
	inserirListaOrdenada(&(congonhas.prat3), 12, 12);

	inserirListaOrdenada(&(congonhas.prat4), 13, 13);
	inserirListaOrdenada(&(congonhas.prat4), 14, 14);
	inserirListaOrdenada(&(congonhas.prat4), 15, 15);
	inserirListaOrdenada(&(congonhas.prat4), 16, 16);

	imprimirListaOrdenada(&(congonhas.prat1));
	imprimirListaOrdenada(&(congonhas.prat2));
	imprimirListaOrdenada(&(congonhas.prat3));
	imprimirListaOrdenada(&(congonhas.prat4));
	
	imprimirFilaDinamica(&(congonhas.hangar));
	printf("\noi\n\n");
	passaTempo(&congonhas);
  return 0;
}
