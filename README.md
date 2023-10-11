# API Dindin

Trata-se de uma Restful API de uma aplicação de controle de despesas que permite que os usuários realizem operações como: cadastrar, logar, detalhar, e atualizar usuario;  também de cadastrar, listar, filtrar, deletar, emitir, detalhar, e atualizar transacao; e por fim, listar categorias. Os dados ficam persistidos em um banco de dados de forma local.
Essa aplicação foi resultado de um desafio técnico proposto pela Cubos Academy, em parceria com Ifood, e foi desenvolvida em dupla com Eduardo Vinagre.

## Sumário

- [Visão geral](#visão-geral)
  - [Prints](#prints)
- [O processo](#o-processo)
  - [Desenvolvido com](#desenvolvido-com)
  - [Recursos utilizados](#recursos-utilizados)
  - [Pré-Requisitos](#pré-requisitos)
- [Como rodar o código?](#como-rodar-o-código)
  - [Passo 1 - Clone ou baixe o projeto](#passo-1---clone-ou-baixe-o-projeto)
  - [Passo 2 - Instalando dependências](#passo-2---instalando-dependências)
  - [Passo 3 - Configuração do Banco de Dados](#passo-3---configuração-do-banco-de-dados)
  - [Passo 4 - Configurando variáveis de ambiente](#passo-4---configurando-variáveis-de-ambiente)
  - [Passo 5 - Iniciando o projeto](#passo-5---iniciando-o-projeto)
  
- [Uso](#Uso)
- [Contribuição](#Contribuição)
- [Autor](#autor)

## Visão geral

### Prints

![image](https://github.com/alexandreSouza31/API_Restful_Banco_digital/assets/112407769/f6a018bc-1d2f-492c-821d-c30ffbae6f54)

![image](https://github.com/alexandreSouza31/API_Restful_Banco_digital/assets/112407769/0fd56063-eb38-4ae4-bb41-af979e0d2bc4)

![image](https://github.com/alexandreSouza31/API_Restful_Banco_digital/assets/112407769/4b41f3ab-d8ab-4954-97be-d45b53236d4c)

![image](https://github.com/alexandreSouza31/API_Dindin/assets/112407769/c4364383-5bcf-4d49-b768-ef876ff72472)

![image](https://github.com/alexandreSouza31/API_Dindin/assets/112407769/c336283e-d3ba-45b0-b13b-59ebcfe3ba98)


## O processo

### Desenvolvido com

- Javascript
- lógica de programação
- Node.JS
- Postgres
  
### Recursos utilizados

- [Express](https://expressjs.com/pt-br/) - Framework Node mais popular e a biblioteca subjacente para uma série de outros frameworks do Node.

- [bcrypt](https://www.npmjs.com/package/bcrypt) - Biblioteca de auxílio pra criação de hash de senhas.

- [Nodemon](https://nodemon.io/) - Monitora as mudanças nos arquivos do seu projeto e reinicia automaticamente o servidor Node. js quando necessário.
  
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Biblioteca que cria um token de autenticação na sessão do usuário.
  
- [pg](https://www.npmjs.com/package/pg) - Biblioteca que faz a conexão do banco de dados Postgres com o Node.

## Pré-Requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) - Um ambiente de tempo de execução JavaScript que você pode usar para executar o servidor backend;
  
- [Postgres](https://www.postgresql.org/download/) - Banco de dados SQL. 


### Como rodar o código?? 


#### passo 1 - Clone ou baixe o projeto

1. Abra o terminal do seu editor de código;
2. Navegue até a pasta onde deseja instalar o projeto;
3. Clone o projeto ```ex: git clone https://github.com/seu-usuario/seu-projeto-backend.git```, ou se preferir,baixe clicando no cotão verde chamado "Code" no repositório desse projeto, e depois "Download zip.

#### passo 2 - Instalando dependências

1. npm - Digite o seguinte comando no terminal `npm install`;
2. nodemon - Digite o seguinte comando no terminal `npm install -D nodemon`;


#### passo 3 - Configuração do Banco de Dados

1. Criando o Banco de Dados e as Tabelas no Banco
    a)Abra um terminal e acesse o PostgreSQL usando seu cliente preferido (por exemplo, psql, beekeeper, ou a extensão no VSCode Database Client);
     
    b)Para criar as tabelas necessárias, copie e/ou execute as tabelas do arquivo dump.sql, na pasta sql em seu client PostgreSQL;

2. Populando a tabela Categorias
     a)Copie e/ou execute as tabelas do arquivo inserir.sql, na pasta sql em seu client PostgreSQL;

#### passo 4 - Configurando variáveis de ambiente
1. Renomeie o arquivo .env.exemple, na raiz do projeto para .env
2. Configure os campos no arquivo modificando de acordo com a sua configuração na hora de configurar o Postgres.Já no campo SENHA_JWT você define a senha neste momento.
   Obs: Lembre-se de apenas preencher dentro das aspas, ou seja, não as apague!

#### passo 5 - Iniciando o projeto
1. Inicie o servidor digitando `npm run dev` no terminal;
2.  O servidor estará em execução em http://localhost:3000;
3. Use o Insomnia, Postman ou alguma extensão no seu programa de ambiente de desenvolvimento como o Thunder client do VS Code, por exemplo, para fazer as requisições;
4. Para testar os endpoints escreva as rotas com os parâmetros, a depender, de cada requisição;

## Uso
A seguir estão as funcionalidades e endpoints da API:

### Rotas de Usuários

#### Cadastrar Usuário

- **Descrição**: Permite o cadastro de um novo usuário na aplicação.
- **Método HTTP**: POST
- **Rota**: `/usuario`
- **Intermediários**:
  - Verifica se o e-mail informado já está em uso.
  - Valida os campos obrigatórios do usuário.
- **Controlador**: `cadastrarUsuario`

#### Login

- **Descrição**: Permite que um usuário existente faça login na aplicação.
- **Método HTTP**: POST
- **Rota**: `/login`
- **Controlador**: `login`
  ```diff
  > Atenção: Após requisitar essa rota, será criado um token para autenticação daquele usuário logado. A partir dela todas as rotas abaixo precisam ter esse token no bearer token!

#### Detalhar Usuário

- **Descrição**: Retorna as informações detalhadas do usuário logado.
- **Método HTTP**: GET
- **Rota**: `/usuario`
- **Intermediários**:
  - Verifica se o usuário está autenticado.
- **Controlador**: `detalharUsuario`

#### Atualizar Usuário

- **Descrição**: Permite que o usuário atualize suas informações.
- **Método HTTP**: PUT
- **Rota**: `/usuario`
- **Intermediários**:
  - Verifica se o usuário está autenticado.
  - Valida os campos de atualização do usuário.
- **Controlador**: `atualizarUsuario`

### Rotas de Transações

#### Listar Categorias

- **Descrição**: Retorna a lista de categorias disponíveis.
- **Método HTTP**: GET
- **Rota**: `/categoria`
- **Controlador**: `listarCategorias`

#### Emite Extrato

- **Descrição**: Gera o extrato das transações do usuário logado.
- **Método HTTP**: GET
- **Rota**: `/transacao/extrato`
- **Intermediários**:
  - Verifica se o usuário está autenticado.
- **Controlador**: `emiteExtrato`

#### Detalhar Transação

- **Descrição**: Retorna informações detalhadas de uma transação específica com base em seu ID.
- **Método HTTP**: GET
- **Rota**: `/transacao/:id`
- **Intermediários**:
  - Verifica se o usuário está autenticado.
- **Controlador**: `detalharTransacao`

#### Atualizar Transação

- **Descrição**: Permite que o usuário atualize uma transação específica com base em seu ID.
- **Método HTTP**: PUT
- **Rota**: `/transacao/:id`
- **Intermediários**:
  - Verifica se o usuário está autenticado.
  - Valida os campos de atualização da transação.
- **Controlador**: `atualizarTransacao`

#### Cadastrar Transação

- **Descrição**: Permite que o usuário registre uma nova transação na aplicação.
- **Método HTTP**: POST
- **Rota**: `/transacao`
- **Intermediários**:
  - Verifica se o usuário está autenticado.
  - Valida os campos obrigatórios da transação.
- **Controlador**: `cadastraTransacao`

#### Listar Transações

- **Descrição**: Retorna a lista de todas as transações do usuário logado. Se um filtro de categoria for especificado, retorna apenas as transações com a categoria correspondente.
- **Método HTTP**: GET
- **Rota**: `/transacao`
- **Parâmetros**:
  - `filtro` (opcional): Uma lista de categorias para filtrar as transações.
- **Intermediários**:
  - Verifica se o usuário está autenticado.
- **Controlador**: `listaTransacao`

Exemplos:

  - Listar todas as transações:
    `GET /transacao`
  - Filtrar uma transação por categoria:
    `GET /transacao?filtro[]=salário`
  - Filtrar transações múltiplas  por categoria:
    `GET /transacao?filtro[]=salário&filtro=presentes`


#### Deletar Transação

- **Descrição**: Permite que o usuário exclua uma transação específica com base em seu ID.
- **Método HTTP**: DELETE
- **Rota**: `/transacao/:id`
- **Intermediários**:
  - Verifica se o usuário está autenticado.
- **Controlador**: `deletaTransacao`



### Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar pull requests para melhorar este projeto.

:)

## Autores

- LinkdIn - Alexandre Mariano(https://www.linkedin.com/in/alexandresouza31/)
- LinkdIn - Eduardo Vinagre(https://www.linkedin.com/in/eduvinagre/)  | - Github(https://github.com/eduvinagre)

  Foi uma experiência incrível trabalhar contigo, irmão! Que venham outras!
