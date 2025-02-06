#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h> // para a função sleep

#define NUM_FILOSOFOS 5

pthread_mutex_t garfo[NUM_FILOSOFOS]; // Mutexes para os garfos

// Função que simula o filósofo comendo
void* comer(void* id) {
    int filosofo_id = *((int*)id);

    while (1) {
        // Tenta pegar os garfos (mutexes)
        int garfoEsquerdo = filosofo_id;
        int garfoDireito = (filosofo_id + 1) % NUM_FILOSOFOS;

        printf("Filósofo %d está tentando comer...\n", filosofo_id + 1);

        pthread_mutex_lock(&garfo[garfoEsquerdo]);  // Pega o garfo da esquerda
        pthread_mutex_lock(&garfo[garfoDireito]);   // Pega o garfo da direita

        // Comer
        printf("Filósofo %d está comendo.\n", filosofo_id + 1);
        sleep(1);  // Simula o tempo de comer

        // Libera os garfos (mutexes)
        pthread_mutex_unlock(&garfo[garfoEsquerdo]);
        pthread_mutex_unlock(&garfo[garfoDireito]);

        printf("Filósofo %d terminou de comer.\n", filosofo_id + 1);

        // Pensar
        printf("Filósofo %d está pensando...\n", filosofo_id + 1);
        sleep(2);  // Simula o tempo de pensar
    }

    return NULL;
}

int main() {
    pthread_t filosofos[NUM_FILOSOFOS];
    int ids[NUM_FILOSOFOS];

    // Inicializa os mutexes para os garfos
    for (int i = 0; i < NUM_FILOSOFOS; i++) {
        pthread_mutex_init(&garfo[i], NULL);
    }

    // Cria os threads para os filósofos
    for (int i = 0; i < NUM_FILOSOFOS; i++) {
        ids[i] = i;
        pthread_create(&filosofos[i], NULL, comer, &ids[i]);
    }

    // Espera todos os filósofos terminarem (teoricamente, nunca vai acontecer)
    for (int i = 0; i < NUM_FILOSOFOS; i++) {
        pthread_join(filosofos[i], NULL);
    }

    // Destrói os mutexes
    for (int i = 0; i < NUM_FILOSOFOS; i++) {
        pthread_mutex_destroy(&garfo[i]);
    }

    return 0;
}
