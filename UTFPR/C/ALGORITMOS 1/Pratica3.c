/*
1-

#include <stdio.h>
int main (void){
  int mes = 0;
  scanf("%i", &mes);
  switch (mes)
  {
  case 1:{
    printf("Janeiro");
    break;
  }
  case 2:{
    printf("Fevereiro");
    break;
  }
  case 3:{
    printf("Marco");
    break;
  }
  case 4:{
    printf("Abril");
    break;
  }
  case 5:{
    printf("Maio");
    break;
  }
  case 6:{
    printf("Junho");
    break;
  }
  case 7:{
    printf("Julho");
    break;
  }
  case 8:{
    printf("Agosto");
    break;
  }
  case 9:{
    printf("Setembro");
    break;
  }
  case 10:{
    printf("Outubro");
    break;
  }
  case 11:{
    printf("Novembro");
    break;
  }
  case 12:{
    printf("Dezembro");
    break;
  }

  default:
  printf("Mes invalido");
    break;
  }
  return 0;
}

2-

#include <stdio.h>
int main (void){
  int produto = 0, quantidade = 0;
  float preco = 0;
  scanf("%i %i", &produto, &quantidade);
  switch (produto)
  {
  case 1:{
    preco = 4 * quantidade;
    printf("Total: R$ %.2f", preco);
    break;
  }
  case 2:{
    preco = 4.5 * quantidade;
    printf("Total: R$ %.2f", preco);
    break;
  }
  case 3:{
    preco = 5 * quantidade;
    printf("Total: R$ %.2f", preco);
    break;
  }
  case 4:{
    preco = 2 * quantidade;
    printf("Total: R$ %.2f", preco);
    break;
  }
  case 5:{
    preco = 1.5 * quantidade;
    printf("Total: R$ %.2f", preco);
    break;
  }
  default:
  printf("Codigo invalido");
    break;
  }
  return 0;
}

3-

#include <stdio.h>
int main (void){
  char nota;
  scanf("%c", &nota);
  switch (nota)
  {
  case 'a':
  case 'A':{
    printf("Excelente! Parabens!");
    break;
  }
  case 'C':
  case 'B':
  case 'c':
  case 'b':{
    printf("Voce foi bem.");
    break;
  }
  case 'd':
  case 'D':{
    printf("Foi por muito pouco!");
    break;
  }
  case 'f':
  case 'F':{
    printf("Estudar mais na proxima.");
    break;
  }
  default:
  printf("Valor invalido.");
    break;
  }
  return 0;
}

4-

*/

#include <stdio.h>
int main (void){
  int ddd = 0;
  scanf("%i", &ddd);
  switch (ddd)
  {
  case 11:{
    printf("Sao Paulo");
    break;
  }
  case 21:{
    printf("Rio de Janeiro");
    break;
  }
  case 31:{
    printf("Belo Horizonte");
    break;
  }
  case 32:{
    printf("Juiz de Fora");
    break;
  }
  case 61:{
    printf("Brasilia");
    break;
  }
  case 71:{
    printf("Salvador");
    break;
  }
  case 19:{
    printf("Campinas");
    break;
  }
  case 27:{
    printf("Vitoria");
    break;
  }
  default:
  printf("DDD nao cadastrado");
    break;
  }
  return 0;
}