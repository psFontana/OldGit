/*
1-

#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    scanf("%i", &n);
    double v[n];

    for (int i = 0; i < n; i++)
    {
      scanf("%lf", &v[i]);

    }

    for (int i = n-1; i >= 0; i--)
    {
      printf("%.1lf\n", v[i]);
    }
}

2-
*/
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    scanf("%i", &n);
    int v[n];

    for (int i = 0; i < n; i++)
    {
      scanf("%i", &v[i]);
    }

   for (int i = 0; i < n; i++)
    {
      int achou = 0;
      for (int j = 0; j < n; j++)
      {
        if (v[i] == v[j] && i != j)
        {
          achou = 1;
          break;
        }
      }    
      if(!achou){
        printf("%i\n", v[i]);
      }
    }
}