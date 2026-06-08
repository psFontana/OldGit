% 1) O diagrama representa um conjunto de pacientes (nome, idade) que são atendidos por um determinado médico. 
% Crie fatos e regras para representar o conhecimento apresentado neste diagrama. 
% Baseando-se nos fatos, crie uma regra que valide se um médico é pediatra ou não.

% Considere que o médico é pediatra somente se ele atendeu pelo menos uma pessoa com menos de 12 anos de idade (Peso 5,0):
% [Médica 1] Dra. Juliana Alves
%  ├── [Paciente] Carlos Alberto, 50 anos
% [Médico 2] Dr. Rafael Lima
%  ├── [Paciente] Ana Carla, 5 anos
%  └── [Paciente] Lucas Eduardo, 10 anos

% É possível resolver sem listas:
idade("Carlos Alberto", 50).
idade("Ana Carla", 5).
idade("Lucas Eduardo", 10).

atende("Dra. Juliana Alves", "Carlos Alberto").
atende("Dr. Rafael Lima", "Ana Carla").
atende("Dr. Rafael Lima", "Lucas Eduardo").

pediatra(Medico) :- atende(Medico, Paciente), idade(Paciente, Idade), Idade < 12.

% Porém como o conteúdo da aula é sobre listas, suponho que devo resolver utilizando listas:
medico("Dra. Juliana Alves", [paciente("Carlos Alberto", 50)]).
medico("Dr. Rafael Lima", [paciente("Ana Carla", 5), paciente("Lucas Eduardo", 10)]).


ehPaciente(Paciente, [Paciente |_]).
ehPaciente(Paciente, [_| ListaPacientes]) :- ehPaciente(Paciente, ListaPacientes).

ehPediatra(Medico) :- medico(Medico, ListaPacientes), ehPaciente(paciente(_, Idade), ListaPacientes), Idade < 12.

% 2) Considere que o diagrama a seguir descreve quais pessoas participaram de quais eventos/festas que foram realizadas em determinados locais (Peso 5,0):
% Igreja
%   ├──Casamento 1
%   │     ├──Alvaro
%   │     ├──Bianca
%   │     └──Carlos
% Auditório
%   ├──Casamento 2
%   │     ├──Alvaro
%   │     ├──Carlos
%   │     ├──Elton
%   └──Formatura
%         ├──Daiane
%         ├──Elton
%         └──Fabiana

% A seguinte base de fatos e regras pode ser utilizada para descrever o diagrama anterior em Prolog.
% Utilizando ela, crie a regra participou(Pessoa, Evento, Local). para validar se a Pessoa participou do Evento que foi realizado em um determinado Local:

% festa("Casamento1", "Igreja", ["Alvaro", "Bianca", "Carlos"]).
% festa("Casamento2", "Audit rio", ["Alvaro", "Carlos", "Elton"]).
% festa("Formatura", "Audit rio", ["Daiane", "Elton", "Fabiana"]).
% pertence(X, [X | _]).
% pertence(X, [_| Cauda]):- pertence(X, Cauda).
% Seguem alguns exemplos de resultados esperados para as consultas realizadas com a regra
% participou(Pessoa, Evento, Local).:
% Consulta                                        │ Resultado Esperado
% participou(‘Elton’, ‘Casamento1’, ‘Igreja’).    │ false
% participou(‘Elton’, ‘Casamento2’, ‘Igreja’).    │ false
% participou(‘Elton’, ‘Casamento2’, ‘Audit rio’). │ true

festa("Casamento1", "Igreja", ["Alvaro", "Bianca", "Carlos"]).
festa("Casamento2", "Audit rio", ["Alvaro", "Carlos", "Elton"]).
festa("Formatura", "Audit rio", ["Daiane", "Elton", "Fabiana"]).
pertence(X, [X | _]).
pertence(X, [_| Cauda]):- pertence(X, Cauda).

participou(Pessoa, Evento, Local) :- festa(Evento, Local, Lista), pertence(Pessoa, Lista).