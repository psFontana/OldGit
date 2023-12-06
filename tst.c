#include <stdio.h>

// int multiplicacao_recursiva(int n1, int n2){
//   if(n1 == 1){
//     return n2;
//   }
//   return n2 + multiplicacao_recursiva(n1-1, n2);
// }

// int main(void){
//   int num1, num2;
//   scanf("%i %i", &num1, &num2);
//   printf("%i", multiplicacao_recursiva(num1, num2));
// }

// int somatorio(int n){
//   if(n == 1){
//     return 1;
//   }
//   return somatorio(n-1) + n;
// }
// int main(void){
//   int num;
//   scanf("%i", &num);
//   printf("%i", somatorio(num));
// }

// int sizeofs(char* string){
//   if(*string == '\0'){
//     return 1;
//   }
//   return 1 + sizeofs(string+1);
// }

// int main(void){
//   char *string = "oie";
//   printf("%i", sizeofs(string));
// }


int contaCaractere(char letra, char* palavra){
  if(*palavra == '\0'){
    return 0;
  }
  if(*palavra == letra){
    
    return contaCaractere(letra, palavra+1) + 1;
  } 
  return contaCaractere(letra, palavra+1);
}

int main(void){
  char* palavra = "oieaaas";
  char letra = 'a';
  printf("%i", contaCaractere(letra, palavra));
}