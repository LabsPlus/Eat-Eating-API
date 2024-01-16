# MODELO PADRÃO DO PROJETO

Este é um **README** para saber como desenvolver o projeto de uma maneira padronizada

## NOMEÇÃO DE ARQUIVOS

Para criar um novo arquivo ou pasta, as palavras deverão ser separadas por "**.**"

Para a criação do arquivo deve seguir a seguinte estrutura de nomeação:

`utilizador.raiz.extensao`

#### Exemplo:

```
|-src/
   |-raiz/
    |  |-outra.pasta/
    |     |-utilizador.raiz.ts
    |
    |-outra.raiz/
       |-utilizador.outra.raiz.ts

```

No exemplo dado, o utilizador é o nome de para quem é direcionado o arquivo, no caso acima o "utilizador" poderia ser "users", e "raiz" é o nome da pasta que está
diretamente ligada a pasta "src"

## NOMEAÇÃO DE CLASSES

Para a criação de uma nova classe deve seguir a seguinte estrutura de nomeação:

`UtilizadorRaiz`

#### Exemplo:

Para uma classe em que o utilizador é "users" e a raiz é "services", o nome deverá ficar:

`UsersServices`

### MÉTODOS DE CLASSES

Para a criação de um novo método na classe deve seguir o padrão de camelCase, onde se o método tiver mais de uma palavra, a diferenciação se deve que o começo da outra é com letra maiúscula

#### Exemplo

`meuMetodoAleatorio`

## INTERFACES

**As interfaces deverão ser criadas caso o método tenha mais de um parâmetro**

Para a criação de uma nova interface deve seguir a seguinte estrutura de nomeação:

`IUtilizadorMétodo`

#### Exemplo:

Para uma classe em que o utilizador é "users" e o método de vai ser utilizado é "create", o nome deverá ficar:

`IUsersCreate`

## ROTAS

Para criação de novas rotas elas devem estar em métodos que correspondente ao seu tipo

A nomeação dos métodos deve ser em camelCase

`tipoRoutes`

#### Exemplo:

Para uma rota do tipo **post**, ela deverá estar em um método chamado **postRoutes**

Para uma rota do tipo **get**, ela deverá estar em um método chamado **getRoutes**

## TESTES

Para a nomenclatura dos arquivos de teste deve seguir o seguinte padrão:

`nome.arquivo.test.ts`

No caso acima o "nome.arquivo" é para qual arquivo está sendo testado

#### Exemplo:

```
|-src/
   |-__tests__
   |   |-users.services.test.ts
   |
   |-services/
       |-outra.pasta/
          |-users.services.ts
```

Nesse caso o que o arquivo de teste indica é que o "users.services.ts" está sendo testado
