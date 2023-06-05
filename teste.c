// #include <stdio.h>
// #include <stdbool.h>

// bool isVogal(char letra){
//     if (letra == 'a' || letra == 'A' || letra == 'e' || letra == 'E' || letra == 'i' || letra == 'I' || letra == 'o' || letra == 'O' || letra == 'u' || letra == 'U')
//     {
//       return true;
//     }else{
//       return false;
//     }

//   }

// int main(){
//   char letter;
//   scanf("%c", &letter);
//   if (isVogal(letter))
//   {
//     printf("e... poise");
//   }else{printf("ne nao...");}

// }

// #include <stdio.h>
// #include <string.h>

// int contaVogal(char palavra[]){
//   int numeroVogais = 0;
//   for (int i = 0; i < strlen(palavra); i++)
//   {
//     if (palavra[i] == 'a' || palavra[i] == 'A' || palavra[i] == 'e' || palavra[i] == 'E' || palavra[i] == 'i' || palavra[i] == 'I' || palavra[i] == 'o' || palavra[i] == 'O' || palavra[i] == 'u' || palavra[i] == 'U')
//     {
//       numeroVogais++;
//     }
//   } 
//   return numeroVogais;
//   }

// int main(){
//   char palavra[]="";
//   scanf("%s", palavra);
//   int vogais = contaVogal(palavra);
//   int consoantes = strlen(palavra) - vogais;
//   if (vogais > consoantes)
//   {
//     printf("Ha mais vogais que consoantes.");
//   }else if (consoantes > vogais)
//   {
//     printf("Ha mais consoantes que vogais.");
//   }else{
//     printf("Empate!");
//   }
  
// }

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
  char palavra[100];
  scanf("%s", palavra);
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

  printf("%s", palavra);
  
}



