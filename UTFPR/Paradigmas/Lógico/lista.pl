1) Considerando a base de conhecimento abaixo com os fatos do predicado pessoa(Nome, Idade)., crie uma regra que verifique se uma pessoa é mais velha que outra (Peso 3,0):
% pessoa("André", 33).
% pessoa("Cris", 26).
% pessoa("Juca", 57).
% maisvelha(Pessoa1, Pessoa2) :- .....

pessoa("André", 33).
pessoa("Cris", 26).
pessoa("Juca", 57).
maisvelha(Pessoa1, Pessoa2) :- pessoa(Pessoa1, Idade1), pessoa(Pessoa2, Idade2), Idade1 > Idade2.


% 2) Considere uma fila com as seguintes pessoas (Peso 3,5):
% Início da Fila -> Júlia -> João -> Maria -> Pedro -> Ana -> Carlos -> Fim da Fila
% a) Crie uma base de conhecimento descrevendo a fila de pessoas com o fato:
% antes(Pessoa1, Pessoa2). Este fato deve indicar que a Pessoa1 está na frente da Pessoa2 na fila;
% b) Crie uma regra para o predicado depois(Pessoa1, Pessoa2). que deve ser o inverso de antes(Pessoa1, Pessoa2).
% c) Escreva uma regra entre(Meio, Anterior, Posterior). que deve indicar que a pessoa do Meio está:
% - Imediatamente antes da pessoa Posterior, e
% - Imediatamente depois da pessoa Anterior.

% a)
antes("Júlia", "João").
antes("João", "Maria").
antes("Maria", "Pedro").
antes("Pedro", "Ana").
antes("Ana", "Carlos").

% b)
depois(Pessoa1, Pessoa2) :- antes(Pessoa2, Pessoa1).

% c)
entre(Meio, Anterior, Posterior) :- antes(Meio, Posterior), depois(Meio, Anterior).

% 3) Considere a hierarquia de funcion´arios de uma empresa (Peso 3,5):
% [Diretor] Rogerio
%  ├── [Gerente] Sandro
%  │    ├── [Funcionário] Mafalda
%  │    └── [Funcionário] Rebeca
%  ├── [Gerente] Roberto
%  │    └── [Funcionário] Osmar
%  └── [Gerente] Micheli
%       ├── [Funcionário] Wesley
%       └── [Funcionário] Sara
% a) Crie a base de conhecimento descrevendo a hierarquia de funcionários com o fato:
% chefe(X, Y). Este fato deve indicar que X é o(a) chefe imediato(a) da pessoa Y.
% b) Utilizando recursividade, crie uma regra que valide se a pessoa X é chefiada direta ou indiretamente pela pessoa Y

% a)
chefe("Rogerio", "Sandro").
chefe("Sandro", "Mafalda").
chefe("Sandro", "Rebeca").
chefe("Rogerio", "Roberto").
chefe("Roberto", "Osmar").
chefe("Rogerio", "Micheli").
chefe("Micheli", "Wesley").
chefe("Micheli", "Sara").

% b)
chefiado(X, Y) :- chefe(Y, X).
chefiado(X, Y) :- chefe(Z, X), chefiado(Z, Y).