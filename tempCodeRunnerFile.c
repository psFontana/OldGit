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