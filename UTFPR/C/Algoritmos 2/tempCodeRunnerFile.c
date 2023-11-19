int contaCaracteresArquivo(FILE* arq){
  int i;
  char c = fgetc(arq);
  for (i = 0; c != EOF;c = fgetc(arq))
  {
    if(c >= 'a' || c <= 'z' || c >= 'A' || c <= 'Z'){
      i++;
      }
  }
  rewind(arq);
  return i; 
}

char *findAlphabeticFile(FILE *f){
  char* v = (char*)calloc(contaCaracteresArquivo(f)+1, sizeof(char));
  int pos = 0;
  char c = fgetc(f);
  for (int i = 0; i < sizeof(v); i++)
  {
    if (c >= 'a' || c <= 'z' || c >= 'A' || c <= 'Z')
    {
     v[pos] = c;
     pos++; 
    }
    c=fgetc(f);
  }
  v[pos] = '\0';
  return v;
}
