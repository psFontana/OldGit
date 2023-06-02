/*

1-

#include <stdio.h>
int main(void){
  int n;
  scanf("%i", &n);
  while (n<=2 || n >=1000){
    printf("Valor invalido! Tente novamente!\n");
    scanf("%i", &n);
  }
  for (int i = 1; i < 11; i++){
  printf("%i X %i = %i\n",i, n, n*i);
}          
}

2-

#include <stdio.h>
int main(void){
  char palavra;
  scanf("%c", &palavra);
  int letras = 0, consoantes = 0, vogais = 0;
  while (palavra != '!')  {
    letras++;
    if(palavra == 'a' || palavra == 'e' || palavra == 'i' || palavra == 'o' || palavra == 'u' || palavra == 'A' || palavra == 'E' || palavra == 'I' || palavra == 'O' || palavra == 'U')
    {
      vogais++;
    }else{
      consoantes++;
    } 
    scanf("%c", &palavra);
  }
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

3-

#include <stdio.h>
int main(void){
  char palavra;
  scanf("%c", &palavra);
  int letras = 1, a = 0, e = 0,i = 0, o = 0,u = 0;
  while (palavra != 'x')  {
    letras++;
    switch (palavra)
    {
    case 'A':
    case 'a':{
     a++;
     break;
    }
    case 'E':
    case 'e':{
     e++;
     break;
    }
    case 'O':
    case 'o':{
     o++;
     break;
    }
    case 'I':
    case 'i':{
     i++;
     break;
    }
    case 'U':
    case 'u':{
     u++;
     break;
    }
  }
    scanf("%c", &palavra);
}
  printf("a: %i, e: %i, i: %i, o: %i, u: %i, total de letras: %i", a, e, i, o, u, letras);
}

n <= 100 && n >= -100 

4-
*/
#include <stdio.h>
int main(void){
int n;
scanf("%i", &n);
while (n != -101 )
{
  if(n <= 100 && n >= -100 ){
    if(n == 0){
  printf("NULL\n");
}else{
  if(n %2 == 0){
    printf("EVEN ");
  }else{
    printf("ODD ");
  }
if(n < 0){
  printf("NEGATIVE\n");
}else{
  printf("POSITIVE\n");
}}
  }else{
    printf("Valor invalido! Tente novamente!\n");
  }
scanf("%i", &n);
} 
}
