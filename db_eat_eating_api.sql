--Limpeza de todas as tabelas (cuidado com o DELETE sem WHERE)
DELETE FROM public."Person";
DELETE FROM public."LoginAdministrator";
DELETE FROM public."Administrator";
DELETE FROM public."Category";
DELETE FROM public."TypeGrant";
DELETE FROM public."Picture";
DELETE FROM public."Course";
DELETE FROM public."Student";
DELETE FROM public."Visitors";
DELETE FROM public."Employee";
DELETE FROM public."LoginUser";
DELETE FROM public."User";

--Visualização de todas as tabelas
SELECT * FROM public."LoginAdministrator";
SELECT * FROM public."Person";
SELECT * FROM public."Administrator";
SELECT * FROM public."Category";
SELECT * FROM public."TypeGrant";
SELECT * FROM public."Picture";
SELECT * FROM public."Course";
SELECT * FROM public."Student";
SELECT * FROM public."Visitors";
SELECT * FROM public."Employee";
SELECT * FROM public."LoginUser";
SELECT * FROM public."User";

--Inserindo na tabela 'Category'
INSERT INTO public."Category" (name)
VALUES ('ESTUDANTE'),
       ('VISITANTE'),
       ('FUNCIONARIO');

--Inserindo na tabela 'TypeGrant'
INSERT INTO public."TypeGrant" (name)
VALUES ('INTEGRAL'),
       ('PARCIAL'),
       ('NAO_APLICAVEL');

--Inserindo na tabela 'Course'
INSERT INTO public."Course" (name)
VALUES ('TECNICO_AGROPECUARIA'),
       ('TECNICO_AGROINDUSTRIA'),
       ('TECNICO_MEIO_AMBIENTE'),
       ('TECNICO_SUBSEQUENTE_AGROPECUARIA'),
       ('TECNICO_SUBSEQUENTE_INFORMATICA'),
       ('TECNICO_SUBSEQUENTE_ALIMENTOS'),
       ('BACHARELADO_SISTEMA_DE_INFORMACAO'),
       ('BACHARELADO_CIENCIA_DA_COMPUTACAO'),
       ('BACHARELADO_LIBRAS'),
       ('BACHARELADO_EDUCACAO_FISICA'),
       ('POS_ENSINO_DE_CIENCIAS_NATURAIS_E_MATEMATICA'),
       ('POS_LEITURA_E_PRODUCAO_TEXTUAL_APLICADAS_A_EDUCACAO_DE_JOVENS_E_ADULTOS');

--Inserindo na tabela 'Person'
INSERT INTO public."Person" (name, cpf, born)
VALUES ('João da Silva', '123.456.789-10', '1990-05-15'),
       ('Maria Oliveira', '987.654.321-00', '1985-09-20');

--Inserindo na tabela 'LoginAdministrator
INSERT INTO public."LoginAdministrator" (email, password, "emailRecovery")
VALUES ('joao_silva@hotmail.com', 'senhadojoao', 'viniciusdsandrade0662@gmail.com'),
       ('maria_oliveira@hotmail.com', 'senhadamaria', 'viniciusdsandrade0662@gmail.com');

--Inserindo na tabela 'Administrator'
INSERT INTO public."Administrator" (is_master, "personId", "loginAdmId")
VALUES (true, 1, 1),
       (false, 2, 2);

--Inserindo na tabela 'User
INSERT INTO public."User" ("personId")
VALUES (1),
       (2);

--Exemplo de consultas com o intuito de validar as relações de PK e FK entre as tabelas

-- Nome e e-mail de todos os administradores master
SELECT p.name, l.email
FROM "Person" p
         JOIN "Administrator" a ON p.id = a."personId"
         JOIN "LoginAdministrator" l ON a."loginAdmId" = l.id
WHERE a.is_master = true;

-- Nome e e-mail de todos os administradores (master e não master)
SELECT p.name, l."emailRecovery"
FROM "Person" p
         JOIN "Administrator" a ON p.id = a."personId"
         JOIN "LoginAdministrator" l ON a."loginAdmId" = l.id;

-- Idade de todas as pessoas cadastradas
SELECT p.name, EXTRACT(YEAR FROM AGE(p.born)) AS age
FROM "Person" p
         JOIN "User" u ON p.id = u."personId";


-- Listar todas as pessoas com 'is_master' da tabela 'Administrator' com seus respectivos e-mails de login:
SELECT p.name AS Nome,
       la.email AS Email,
       a.is_master AS is_master_administrator
FROM public."Person" p
         JOIN public."Administrator" a ON p.id = a."personId"
         JOIN public."LoginAdministrator" la ON a."loginAdmId" = la.id;
