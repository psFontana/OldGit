#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_NOS 100 // Define o tamanho máximo do grafo
#define SEM_ARESTA -1
#define INFINITO 100000 // Representa o infinito

// Estrutura para representar o grafo
typedef struct
{
    int numNos;
    int matriz[MAX_NOS][MAX_NOS];
} Grafo;

// Função para inicializar o grafo
void inicializarGrafo(Grafo *g)
{
    g->numNos = 0;
    for (int i = 0; i < MAX_NOS; i++)
    {
        for (int j = 0; j < MAX_NOS; j++)
        {
            g->matriz[i][j] = SEM_ARESTA; // Inicializa todos os pesos como sem aresta
        }
    }
}

// Função para inserir um nó no grafo
void inserirNo(Grafo *g)
{
    if (g->numNos < MAX_NOS)
    {
        g->numNos++;
        printf("Nó %d inserido.\n", g->numNos - 1);
    }
    else
    {
        printf("Número máximo de nós atingido.\n");
    }
}

// Função para inserir uma aresta entre dois nós
void inserirAresta(Grafo *g, int no1, int no2, int peso)
{
    if (no1 < g->numNos && no2 < g->numNos)
    {
        g->matriz[no1][no2] = peso; // Define o peso da aresta
        g->matriz[no2][no1] = peso; // Como o grafo é não direcionado, espelha o valor
        printf("Aresta inserida entre os nós %d e %d com peso %d.\n", no1, no2, peso);
    }
    else
    {
        printf("Erro: nós inválidos.\n");
    }
}

// Função para exibir a matriz de adjacência
void exibirGrafo(Grafo *g)
{
    printf("Matriz de Adjacência:\n");
    for (int i = 0; i < g->numNos; i++)
    {
        for (int j = 0; j < g->numNos; j++)
        {
            if (g->matriz[i][j] == SEM_ARESTA)
            {
                printf("  "); // Deixa em branco se não há aresta
            }
            else
            {
                printf("%d ", g->matriz[i][j]);
            }
        }
        printf("\n");
    }
}

// Função para encontrar a menor distância entre dois nós
void encontrarMenorCaminho(Grafo *g, int origem, int destino)
{

    if (origem >= g->numNos || destino >= g->numNos)
    {
        printf("Nó de origem ou destino inválido.\n");
        return;
    }

    int dist[MAX_NOS];
    bool visitado[MAX_NOS] = {false};

    for (int i = 0; i < g->numNos; i++)
    {
        dist[i] = g->matriz[origem][i] == SEM_ARESTA ? INFINITO : g->matriz[origem][i];
    }
    dist[origem] = 0;

    for (int i = 0; i < g->numNos - 1; i++)
    {
        int no = SEM_ARESTA;
        for (int j = 0; j < g->numNos; j++)
        {
            if (!visitado[j] && (no == SEM_ARESTA || dist[j] < dist[no]))
            {
                no = j;
            }
        }

        if (dist[no] == INFINITO)
        {
            break;
        }
        

        visitado[no] = true;

        for (int k = 0; k < g->numNos; k++)
        {
            if (g->matriz[no][k] != SEM_ARESTA && !visitado[k])
            {
                int novaDistancia = dist[no] + g->matriz[no][k];
                if (novaDistancia < dist[k])
                {
                    dist[k] = novaDistancia;
                }
            }
        }
    }
    int distancia = dist[destino];
    if (distancia == INFINITO)
    {
        printf("Não há caminho do nó %d para o nó %d.\n", origem, destino);
    }
    else
    {
        printf("A menor distância do nó %d para o nó %d é %d.\n", origem, destino, distancia);
    }
}

int main(void)
{
    Grafo g;
    inicializarGrafo(&g);

    // Inserir nós
    inserirNo(&g); // 0
    inserirNo(&g); // 1
    inserirNo(&g); // 2
    inserirNo(&g); // 3

    // Inserir arestas
    inserirAresta(&g, 0, 1, 10);
    inserirAresta(&g, 1, 2, 5);
    inserirAresta(&g, 0, 2, 50);
    inserirAresta(&g, 2, 3, 1);

    // Encontrar menor caminho
    encontrarMenorCaminho(&g, 0, 3);
    return 0;
}