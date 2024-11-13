// 1ª Função (profundidade)
int profundidade(PtrNoArvore no, int valor) {
  if (no == NULL) {
    return -1;
  }
  if (no->chave == valor) {
    return 1;
  }
  int profundidadeEsquerda = 0;
  profundidadeEsquerda = profundidade(no->esquerda, valor);
  if (profundidadeEsquerda != -1) {
    return profundidadeEsquerda + 1;
  }
  int profundidadeDireita = 0;
  profundidadeDireita = profundidade(no->direita, valor);
  if (profundidadeDireita != -1) {
    return profundidadeDireita + 1;
  }
  return -1;
}

(*no)

// 2ª Função (internal):
int internal(PtrNoArvore no){
  if (no == NULL || (no->direita == NULL && no->esquerda == NULL))// Se for nulo ou folha retornará 0, se não 1 + os filhos
  {
    return 0;
  }
  return 1 + internal(no->esquerda) + internal(no->direita);  
}

// 3ª Função (cut):
void cutRecursivo(PtrNoArvore *no, int profundidade, int atual) {
    if (*no == NULL) {
        return;
    }
  
    if (atual < profundidade) {// Navegando até a profundidade desejada
        cutRecursivo(&(*no)->esquerda, profundidade, atual + 1);
        cutRecursivo(&(*no)->direita, profundidade, atual + 1);
    } else {// A partir daí começa a matança
        cutRecursivo(&(*no)->esquerda, profundidade, atual + 1);
        cutRecursivo(&(*no)->direita, profundidade, atual + 1);
        
        free(*no);
        *no = NULL;
    }
}

// No arquivo da CCH solicitava apenas 1 inteiro como parâmetro, então tive que criar a outra função para que a minha lógica funcionasse e essa aqui apenas chamando a outra
void cut(PtrNoArvore *raiz, int profundidade) {
    if (*raiz == NULL) {
        return;
    }
    cutRecursivo(raiz, profundidade, 0);
}