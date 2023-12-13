# Eat Eating API

Este repositório está vinculado ao projeto da API do sistema Eat Eating

# API Eat-Eating

API construída em NodeJS e ExpressJS utilizando TDD para garantir a qualidade do código. A API permite o controle de acesso de usuários, com funcionalidades de cadastro, exclusão, atualização e busca de usuários.

# Aviso

Cada alteração deve ser documentada, a exemplo das rotas, com detalhes sobre os parâmetros esperados e o formato de retorno. Variaveis de ambientee pacotes novos adicionados e possiveis problemas futuros sobre debugar o projeto e etc.

## Tecnologias utilizadas

- <p>NodeJS</p>
- <p>ExpressJS</p>
- <p>SequelizeJS</p>
- <p>postgresSQL</p>
- <p>Typescript</p>

IMPORTANTE: É necessário ter pelo menos a versão estável mais recente do Node e NPM. Certifique-se de tê-los instalados corretamente para instalar as dependências necessárias e executar o projeto.

Na pasta "api", crie um arquivo chamado: .env com o seguinte formato:

```
# user auth
DB_USER = admin
DB_PASSWORD = 1234

# database
DATABASE_URL = 'DIALECT://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME'

Por exemplo:
DATABASE_URL = 'postgres://labsif:1234@localhost:5432/eateating'

# localhost
PORT = 3000
```

Crie um banco de dados com o nome "eateating" usando o PostgreSQL.

## Instalação

1. Clone este repositório
2. Na raiz do projeto, instale as dependências: `npm install`
3. Inicie a aplicação: `npm start`
