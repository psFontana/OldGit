/*

1-

#include <stdio.h>

int isVogal(char letra){
  if (letra == 'A' || letra == 'E' || letra == 'I' || letra == 'O' || letra == 'U' || letra == 'a' || letra == 'e' || letra == 'i' || letra == 'o' || letra == 'u')
  {
    return 1;
  }else
  {
    return 0;
  }
  
  
}


int main(void){

  char frase[30];
  scanf("%[^\n]s", frase);

  for (int i = 0; frase[i] != '\0'; i++)
  {
    if (isVogal(frase[i]))
    {
      frase[i] = '_';
    }
    
  }

  printf("%s",frase);
  

  return 0;
}

2-

#include <stdio.h>
#include <ctype.h>

int main(void){

  char frase[30];
  scanf("%[^\n]s", frase);

  for (int i = 0; frase[i] != '\0'; i++)
  {
    if (frase[i] == ' '){
      printf(" ");
    }else
    {  
      if (frase[i] == 'z')
      {
        printf("A");
      }else
      {
        frase[i]++;
        printf("%c", toupper(frase[i]));
      }      
    }
    
  } 

  return 0;
}

3-
*/






#include <stdio.h>

int main(void){

  int limit = 0;
  scanf(" %i", &limit);

  int V[limit];
  for (int i = 0; i < limit; i++){
    scanf(" %i", &V[i]);    
  }
  
  char S[61];
  scanf(" %[^\n]s", S);

  for (int i = 0; i < limit; i++)
  {
    printf("%c", S[V[i]]);
    
  }
  
  return 0;
}