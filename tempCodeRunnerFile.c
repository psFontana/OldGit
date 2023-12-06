int somatorio(int n){
  if(n == 1){
    return 1;
  }
  return somatorio(n-1) + n;
}