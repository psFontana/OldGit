/*
1-

#include <stdio.h>

typedef struct pessoa_s pessoa_t;
typedef struct data_s data_t;

struct data_s
{
  int dia, mes, ano;
};

struct pessoa_s
{
  int cod;
  char nome[64];
  data_t nasc;
};


void read_person(pessoa_t *ptr){
  scanf( "%i", &ptr->cod);
  scanf(" %[^\n]s", ptr->nome);
  scanf(" %i", &ptr->nasc.dia);
  scanf(" %i", &ptr->nasc.mes);
  scanf(" %i", &ptr->nasc.ano);
}

void print_person(pessoa_t person){
  printf("%d - " ,person.cod);
  printf("%s\n" ,person.nome);
  printf("Nascimento: %i/" ,person.nasc.dia);
  printf("%i/" ,person.nasc.mes);
  printf("%i\n" ,person.nasc.ano);
}

int main(void){
  pessoa_t p;
  read_person(&p);
  print_person(p);
  return 0;
}

2-

#include <stdio.h>

typedef struct produtor_t{
  int codProdutor;
  char grao;
  float quantidade;
}produtor;

void le_graos(struct produtor_t* ptr){
  scanf(" %i", &ptr->codProdutor);
  scanf(" %c", &ptr->grao);
  scanf(" %f", &ptr->quantidade);
}

void imprime_totais(struct produtor_t* vet, int tam){
  printf("Total de toneladas dos Produtos:\n");
  float trigo = 0, soja = 0, milho = 0, feijao = 0;
  for (int i = 0; i < tam; i++){
    switch (vet[i].grao){
    case 'F':
      feijao += vet[i].quantidade;
      break;
    case 'S':
      soja += vet[i].quantidade;
      break;
    case 'M':
      milho += vet[i].quantidade;
      break;
    case 'T':
      trigo += vet[i].quantidade;
      break;
    }
  }
  printf("Feijao: %.2f\nMilho: %.2f\nSoja: %.2f\nTrigo: %.2f", feijao, milho, soja, trigo);   
}

3-
*/
#include <stdio.h>

struct endereco
{
  char rua[64], estado[64], cidade[64];
  int numero;
};

typedef struct cliente
{
  int id;
  char nome[64], telefone[64];
  struct endereco ender;
}cliente;

void ler_cliente(struct cliente* vet, int tam){

  for (int i = 0; i < tam; i++)
  {
    scanf( "%i", &vet[i].id);  
    scanf(" %[^\n]s", vet[i].nome);  
    scanf(" %[^\n]s", vet[i].ender.rua);  
    scanf(" %[^\n]s", vet[i].ender.estado); 
    scanf(" %[^\n]s", vet[i].ender.cidade); 
    scanf(" %i", &vet[i].ender.numero); 
    scanf(" %[^\n]s", vet[i].telefone); 
  }  
}

void buscar_cliente(struct cliente* vet, int tam){
  int idd = 0;
  scanf("%i", &idd);
  for (int i = 0; i < tam; i++)
  {
    if (vet[i].id == idd)
    {
      printf("%i - %s\n%s, %i\n%s - %s\nTel: %s", vet[i].id, vet[i].nome, vet[i].ender.rua, vet[i].ender.numero, vet[i].ender.cidade, vet[i].ender.estado, vet[i].telefone);
    }
  }  
}