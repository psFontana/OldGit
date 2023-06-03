#include <stdio.h>
#include <string.h>

int contaVogal(char palavra[]){
  int numeroVogais = 0;
  for (int i = 0; i < strlen(palavra); i++)
  {
    if (palavra[i] == 'a' || palavra[i] == 'A' || palavra[i] == 'e' || palavra[i] == 'E' || palavra[i] == 'i' || palavra[i] == 'I' || palavra[i] == 'o' || palavra[i] == 'O' || palavra[i] == 'u' || palavra[i] == 'U')
    {
      numeroVogais++;
    }
  } 
  return numeroVogais;
  }

int main(){
  char palavra[]="";
  scanf("%s", &palavra);
  int vogais = contaVogal(palavra);
  int consoantes = strlen(palavra) - vogais;
  if (vogais > consoantes)
  {
    printf("Ha mais vogais que consoantes.");
  }else if (consoantes > vogais)
  {
    printf("Ha mais consoantes que vogais.");
  }else{
    printf("Empate!");
  }
  
}

