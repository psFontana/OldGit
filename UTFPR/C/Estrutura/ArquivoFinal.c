void exercicio1(int num, PilhaDinamica *p) {
    while (num >= 2) {
        inserirPilhaDinamica(p, num % 2);
        num /= 2;
    }
    //o While tem a função de inserir na pilha todos os restos da divisão do número a ser convertido enquanto ele for maior ou igual a 2
    if (num == 1) {
        inserirPilhaDinamica(p, 1);
    }
    //caso seja igual a 1, será necessário adicionar o 1 ao topo da pilha, o if tem essa função
}