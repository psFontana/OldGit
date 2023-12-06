#include <stdio.h>
#include <stdlib.h>

typedef struct{
    char descr[31];
    char tipo[10]; // Debito ou Credito
    float vlr;
}rgDados;

rgDados *lerLancamentos(FILE *arq, int tam) {
  rgDados *vet = (rgDados*) malloc(tam * sizeof(rgDados));
  fread(vet, sizeof(rgDados), tam, arq);
  return vet;
}

void mostrarLancamentos(rgDados lanctos[], int tam) {
  float saldo = 0, credito = 0, debito = 0;
  for(int i = 0; i < tam; i++){
    printf("%s R$ %.2f %c\n",lanctos[i].descr, lanctos[i].vlr, lanctos[i].tipo[0]);
    if (lanctos[i].tipo[0] == 'C'){
      credito += lanctos[i].vlr;
    }else{
      debito += lanctos[i].vlr;
    }
  }
  if (credito > debito){
    saldo = credito - debito;
  }else{
    saldo = debito - credito;
  }
  printf("\nCreditos = R$ %.2f\nDebitos  = R$ %.2f\nSaldo    = R$ %.2f %c",credito, debito, saldo, credito>debito? 'C':'D');
}