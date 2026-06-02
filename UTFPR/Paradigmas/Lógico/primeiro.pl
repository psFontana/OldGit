% Variáveis possuem a 1ª Letra Maiúscula
%% Ou um _ (underline) para variáveis anônimas
% Predicados possuem a 1ª letra minúscula
%% Funções também
% Utiliza . (ponto final) ao invés de ; (ponto e vírgula) para finalizar as expressões
% Lógica "E" é representada por , (vírgula)
% Lógica "OU" é representada por ; (ponto e vírgula)
% Lógica "NOT" é "normal kkkk" -> not(<arguments>)
%% Lógica "NÃO" é representada por \+ (barra invertida e sinal de mais)
% = para objetos
% =:= para números
% \= para "diferente"
% > < >= <= iguais

%- Executa o print
ola_mundo :-
    write('Ola, Mundo!'), 
    nl. % Quebra a linha

% Fato
idade(socrates, 70).

% Predicado que busca a idade e printa na tela
exibir_idade(Pessoa) :-
    idade(Pessoa, Anos),
    format('A idade de ~w eh ~w anos.~n', [Pessoa, Anos]).
    % O ~w serve para receber variáveis e o ~n pula a linha.

% Atividade da aula: Criar uma árvore genealógica simples
% Fatos
feminino('Das').
feminino('Mercedes').
feminino('Gertrudes').
feminino('Ilce').
feminino('Aline').
feminino('Suzane').
feminino('Brunna').
masculino('Sérgio').
masculino('Carlos').
masculino('João').
masculino('Paulo').
masculino('Cleber').
masculino('OutroSergio').

mae('Gertrudes', 'Das').
mae('Mercedes', 'Sérgio').

pai('João', 'Das').
pai('Carlos', 'Sérgio').

mae('Das', 'Paulo').
pai('Sérgio', 'Paulo').

mae('Ilce', 'Cleber').
pai('Sérgio', 'Cleber').

mae('Ilce', 'Aline').
pai('Sérgio', 'Aline').

mae('Ilce', 'Suzane').
pai('Sérgio', 'Suzane').

mae('Das', 'Brunna').
pai('OutroSergio', 'Brunna').

progenitor(X, Y) :- mae(X, Y); pai(X, Y).
avo(X, Y) :- progenitor(X, Z), progenitor(Z, Y).

neto(X, Y) :- avo(Y, X).

irmao(X, Y) :- progenitor(Z, X), progenitor(Z, Y), X \= Y.

ancestral(X, Y) :- progenitor(X, Y).
ancestral(X, Y) :- progenitor(X, Z), ancestral(Z, Y).

descendente(X, Y) :- ancestral(Y, X).