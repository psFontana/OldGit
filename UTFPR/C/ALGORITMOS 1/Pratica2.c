/*
1-

#include <stdio.h>

int main(void){
  int n1, n2;
  scanf("%i %i", &n1, &n2);
  if (n2>n1)
  {
    if (n2%n1 == 0)
    {
      printf("Sao Multiplos");
    }
    else{
      printf("Nao sao Multiplos");
    }
    
  }else{
        if (n1%n2 == 0)
    {
      printf("Sao Multiplos");
    }
    else{
      printf("Nao sao Multiplos");
    }
  }
  
}

2-

#include <stdio.h>

int main(void){
  int a,b,c,d;
  scanf("%i %i %i %i", &a, &b, &c, &d);
  if (b > c && d > a && (c+d) > (a+b) && c > 0 && d > 0 && a%2 == 0)
  {
    printf("Valores aceitos");
  }else{
    printf("Valores nao aceitos");
  }
  
}

3-
#include <stdio.h>

int main(void){
int contador = 0;
char telefonou, local, mora, devia, trabalhou;
scanf("%c %c %c %c %c", &telefonou, &local, &mora, &devia, &trabalhou);
if (telefonou == 's')
{
  contador++;
}if (local == 's')
{
  contador++;
}if (mora == 's')
{
  contador++;
}if (devia == 's')
{
  contador++;
}if (trabalhou == 's')
{
  contador++;
}
if(contador < 1){
  printf("Inocente");
}else if (contador <= 2)
{
  printf("Suspeito");
}else if (contador <= 4)
{
  printf("Cumplice");
}else{
  printf("Assassino");
}
}

4-
*/

#include <stdio.h>

int main(void){
int idade, doacoes, peso;
char genero;
scanf("%i %i %c %i", &idade, &peso, &genero, &doacoes);

if (idade >= 18 && idade <= 72 && peso >= 42){
  if (genero == 'm'){
    if (doacoes < 4)
    {
      printf("Pode ser doador");
    }else{
      printf("Nao pode ser doador");
    }
  }else if (genero == 'f'){
    if (doacoes < 5)
    {
      printf("Pode ser doador");
    }else{
      printf("Nao pode ser doador");
    }
  }else{
    printf("Genero invalido");
  }
}else{
      printf("Nao pode ser doador");
    }
}