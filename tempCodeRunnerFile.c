canf("%d", &n);        
  p = aloca_matriz_quadrada(n);  
      
  for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
          p[i][j] = (i*n) + (j+1);
      }
  }
  for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
          printf("%d ", p[i][j]);
      }
      printf("\n");
  }