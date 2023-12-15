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

#credenciais para autentição
ACCESS_LOCAL_KEY_TOKEN_REFRESH = 123456
ACCESS_LOCAL_KEY_TOKEN = 4567890

#nodemailer credenciais para envio de email
USER_EMAIL = 35e9b6df75846
PASSWORD_EMAIL = a3f84dce442daf
HOST = sandbox.smtp.mailtrap.io #transportador de email
NODEMAILER_EMAIL = exemplo@gmail.com

LINK = localhost:3001 # link do front end onde sera usado no email para redirecionar para a pagina de redefinição de senha
```

### Rotas da aplicação

- /createUser `rota post` recebe um email, um password e um emailRecovery e retorna um usuario criado no banco de dados
- /auth `rota post` recebe um email, um password e retorna um objeto com o token um refresh token com seu tempo de inspiração e o usuario autenticado
- /refreshToken `rota post` recebe um refresh token e retorna o refresh token e seu tempo de expiração

\*/updatePassword recebe uma senha e token para resetar senha, altera a senha do usuario com o token retorna o usuario com a senha alterada.

/forgotPassword recebe um email de usuario envia um email para usuario que quer trocar a senha com o token para trocar a senha e retorna uma mensagem de sucesso da operação

Crie um banco de dados com o nome "eateating" usando o PostgreSQL.

## Instalação

1. Clone este repositório
2. Na raiz do projeto, instale as dependências: `npm install`
3. Inicie a aplicação: `npm start`
