--Limpeza de todas as tabelas (cuidado com o DELETE sem WHERE)
DELETE FROM "Person";
DELETE FROM "LoginAdministrator";
DELETE FROM "Administrator";
DELETE FROM "Category";
DELETE FROM "TypeGrant";
DELETE FROM "Picture";
DELETE FROM "Course";
DELETE FROM "Student";
DELETE FROM "Visitors";
DELETE FROM "Employee";
DELETE FROM "LoginUser";
DELETE FROM "User";

--Visualização de todas as tabelas
SELECT * FROM "LoginAdministrator";
SELECT * FROM "Person";
SELECT * FROM "Administrator";
SELECT * FROM "Category";
SELECT * FROM "TypeGrant";
SELECT * FROM "Picture";
SELECT * FROM "Course";
SELECT * FROM "Student";
SELECT * FROM "Visitors";
SELECT * FROM "Employee";
SELECT * FROM "LoginUser";
SELECT * FROM "User";

--Inserindo na tabela 'Category'
INSERT INTO "Category" (name)
VALUES ('ESTUDANTE'),
       ('VISITANTE'),
       ('FUNCIONARIO');

--Inserindo na tabela 'TypeGrant'
INSERT INTO "TypeGrant" (name)
VALUES ('INTEGRAL'),
       ('PARCIAL'),
       ('NAO_APLICAVEL');

--Inserindo na tabela 'Course'
INSERT INTO "Course" (name)
VALUES ('TECNICO_AGROPECUARIA'),
       ('TECNICO_AGROINDUSTRIA'),
       ('TECNICO_MEIO_AMBIENTE'),
       ('TECNICO_SUBSEQUENTE_AGROPECUARIA'),
       ('TECNICO_SUBSEQUENTE_INFORMATICA'),
       ('TECNICO_SUBSEQUENTE_ALIMENTOS'),
       ('BACHARELADO_SISTEMA_DE_INFORMACAO'),
       ('BACHARELADO_LIBRAS'),
       ('BACHARELADO_EDUCACAO_FISICA'),
       ('POS_ENSINO_DE_CIENCIAS_NATURAIS_E_MATEMATICA'),
       ('POS_LEITURA_E_PRODUCAO_TEXTUAL_APLICADAS_A_EJA');

--Inserindo na tabela 'Person'
INSERT INTO "Person" (name, cpf, born)
VALUES ('Carlos Santos', '072.845.330-48', '1982-07-10'),
       ('Ana Pereira', '386.160.830-81', '1995-03-25'),
       ('Pedro Souza', '229.023.880-55', '1978-11-12'),
       ('Mariana Silva', '459.403.090-46', '2000-08-05'),
       ('Fernando Costa', '456.789.012-43', '1992-01-30'),
       ('Luiza Almeida', '356.435.710-64', '1987-06-18'),
       ('Gabriel Santos', '773.118.910-43', '1980-04-03'),
       ('Carolina Oliveira', '733.674.560-12', '1998-09-14'),
       ('Vinicius Andrade', '447.841.608-76', '2001-12-06'),
       ('Bruno Santos', '123.456.789-11', '1999-06-06'),
       ('Cezar FBC', '123.456.789-12', '1999-06-06');

--Inserindo na tabela 'LoginAdministrator
INSERT INTO "LoginAdministrator" (email, password, "emailRecovery")
VALUES ('carlos_santos@hotmail.com', 'senhadojoao', 'viniciusdsandrade0662@gmail.com'),
       ('ana_pereira@hotmail.com', 'senhadamaria', 'viniciusdsandrade0662@gmail.com'),
        ('pedro_souza@hotmail.com', 'senhadopedro', 'viniciusdsandrade0662@gmail.com'),
        ('mariana_silva@hotmail.com', 'senhadamariana', 'viniciusdsandrade0662@gmail.com'),
        ('fernando_costa@hotmail.com', 'senhadofernando', 'viniciusdsandrade0662@gmail.com'),
        ('luiza_almeida@hotmail.com', 'senhadaluiza','viniciusdsandrade0662@gmail.com'),
        ('gabriel_santos@hotmail.com', 'senhadogabriel', 'viniciusdsandrade0662@gmail.com'),
        ('carolina_oliveira@hotmail.com', 'senhadacarolina', 'viniciusdsandrade0662@gmail.com');

--Inserindo na tabela 'Administrator'
INSERT INTO "Administrator" ("isMaster", "personId", "loginAdmId")
VALUES (true, 1, 1),
       (false, 2, 2),
       (true, 3, 3),
       (false, 4, 4),
       (true, 5, 5),
       (false, 6, 6),
       (true, 7, 7),
       (false, 8, 8);

--Inserindo na tabela 'User
INSERT INTO "User" ("personId")
VALUES (1),
       (2),
       (3),
       (4),
       (5),
       (6),
       (7),
       (8);

INSERT INTO "LoginUser" (email, password, "emailRecovery")
VALUES ('vinicius_andrade2010@hotmail.com', 'GhostSthong567890@', 'viniciusdsandrade0662@gmail.com'),
         ('bruno_santos@hotmail.com', 'SenhaDoBruno', 'viniciusdsandrade0662@gmail.com'),
         ('cezar_fbc@hotmail.com', 'SenhaDoCezar', 'viniciusdsandradeo662@gmail.com');

INSERT INTO "User" ("personId", "categoryId", "typeGrantId", "loginUserId")
VALUES (9, 1, 1, 1),
       (10, 2, 2, 2),
       (11, 3, 3, 3);

INSERT INTO "Student" (enrollment, "courseId", "userId")
VALUES ('22333', 7, 9);

INSERT INTO "Visitors" ("userId")
VALUES (10);

INSERT INTO "Employee" (enrollment,"userId")
VALUES ('33222' , 11);

-- Stored Procedure para Inserir um Estudante
CREATE OR REPLACE PROCEDURE add_student(_name TEXT,
                                        _cpf TEXT,
                                        _born DATE,
                                        _enrollment TEXT,
                                        _courseId INT,
                                        _email TEXT,
                                        _password TEXT,
                                        _emailRecovery TEXT,
                                        _typeGrantId INT)
    LANGUAGE plpgsql
AS
$$
DECLARE
    _personId INT;
    _userId   INT;
BEGIN
    INSERT INTO "Person" (name, cpf, born) VALUES (_name, _cpf, _born) RETURNING id INTO _personId;
    INSERT INTO "User" ("personId",  "typeGrantId","categoryId")
    VALUES (_personId, _typeGrantId, 1)
    RETURNING id INTO _userId;
    INSERT INTO "LoginUser" (email, password, "emailRecovery") VALUES (_email, _password, _emailRecovery);
    INSERT INTO "Student" (enrollment, "courseId", "userId") VALUES (_enrollment, _courseId, _userId);
END;
$$;
CALL add_student('João Silva',
                 '123.456.789-00',
                 '1985-05-10',
                 '22334',
                 7,
                 'joao_silva@hotmail.com',
                 'senhaDoJoao',
                 'joao_silva_recovery@hotmail.com',
                 1);
-- Stored Procedure para Inserir um Visitante
CREATE OR REPLACE PROCEDURE add_visitor(_name TEXT,
                                        _cpf TEXT,
                                        _born DATE,
                                        _email TEXT,
                                        _password TEXT,
                                        _emailRecovery TEXT,
                                        _typeGrantId INT)
    LANGUAGE plpgsql
AS
$$
DECLARE
    _personId INT;
    _userId   INT;
BEGIN
    INSERT INTO "Person" (name, cpf, born) VALUES (_name, _cpf, _born) RETURNING id INTO _personId;
    INSERT INTO "User" ("personId", "typeGrantId", "categoryId")
    VALUES (_personId, _typeGrantId, 2)
    RETURNING id INTO _userId;
    INSERT INTO "LoginUser" (email, password, "emailRecovery") VALUES (_email, _password, _emailRecovery);
    INSERT INTO "Visitors" ("userId") VALUES (_userId);
END;
$$;
CALL add_visitor('Carlos Santos',
                 '072.845.330-49',
                 '1982-07-10',
                 'carlos_santos@example.com',
                 'senhaDoCarlos',
                 'carlos_santos_recovery@example.com',
                 2);
CREATE OR REPLACE PROCEDURE add_employee(_name TEXT,
                                         _cpf TEXT,
                                         _born DATE,
                                         _enrollment TEXT,
                                         _email TEXT,
                                         _password TEXT,
                                         _emailRecovery TEXT,
                                         _typeGrantId INT)
    LANGUAGE plpgsql
AS
$$
DECLARE
    _personId INT;
    _userId   INT;
BEGIN
    INSERT INTO "Person" (name, cpf, born) VALUES (_name, _cpf, _born) RETURNING id INTO _personId;
    INSERT INTO "User" ("personId",  "typeGrantId" ,"categoryId")
    VALUES (_personId, _typeGrantId, 3)
    RETURNING id INTO _userId;
    INSERT INTO "LoginUser" (email, password, "emailRecovery") VALUES (_email, _password, _emailRecovery);
    INSERT INTO "Employee" (enrollment, "userId") VALUES (_enrollment, _userId);
END;
$$;
CALL add_employee('Ana Pereira',
                  '386.160.830-83',
                  '1995-03-25',
                  'EMP12345',
                  'ana_pereira@example.com',
                  'senhaDaAna',
                  'ana_pereira_recovery@example.com',
                  3);

-- Uma View para visualizar os alunos e os cursos que eles estão matriculados
CREATE OR REPLACE VIEW "StudentsWithCourses" AS
SELECT p.name AS student_name, c.name AS course_name
FROM "Person" p
         JOIN "User" u ON p.id = u."personId"
         JOIN "Student" s ON u.id = s."userId"
         JOIN "Course" c ON s."courseId" = c.id;
SELECT * FROM "StudentsWithCourses";

-- Nome e e-mail de todos os administradores master
SELECT p.name, l.email
FROM "Person" p
         JOIN "Administrator" a ON p.id = a."personId"
         JOIN "LoginAdministrator" l ON a."loginAdmId" = l.id
WHERE a."isMaster" = true;

-- Nome e e-mail de todos os administradores (master e não master)
SELECT p.name, l."emailRecovery"
FROM "Person" p
         JOIN "Administrator" a ON p.id = a."personId"
         JOIN "LoginAdministrator" l ON a."loginAdmId" = l.id;

-- Idade de todas as pessoas cadastradas
SELECT p.name AS Nome, EXTRACT(YEAR FROM AGE(p.born)) AS Idade
FROM "Person" p
         JOIN "User" u ON p.id = u."personId";

-- Nome, e-mail e se é administrador master de todos os administradores
SELECT p.name AS Nome,
       la.email AS Email,
       a."isMaster" AS is_master_administrator
FROM "Person" p
         JOIN "Administrator" a ON p.id = a."personId"
         JOIN "LoginAdministrator" la ON a."loginAdmId" = la.id;

-- Nome do aluno e nome do curso que ele está matriculado
SELECT p.name AS student_name, c.name AS course_name
FROM "Person" p
         JOIN "User" u ON p.id = u."personId"
         JOIN "Student" s ON u.id = s."userId"
         JOIN "Course" c ON s."courseId" = c.id;

-- Nome do funcionário e matrícula
SELECT p.name AS user_name, c.name AS category_name
FROM "Person" p
         JOIN "User" u ON p.id = u."personId"
         JOIN "Category" c ON u."categoryId" = c.id;

-- Nome da pessoa e categoria que ela pertence
SELECT c.name AS category_name, COUNT(u.id) AS user_count
FROM "Category" c
         JOIN "User" u ON c.id = u."categoryId"
GROUP BY c.name;

-- Todos os visitantes
SELECT u.id AS user_id, p.name AS visitor_name
FROM "Person" p
         JOIN "User" u ON p.id = u."personId"
         JOIN "Visitors" v ON u.id = v."userId";
