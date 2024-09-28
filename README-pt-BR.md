![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)


*Este readme também pode ser lido em  [Português](README-pt-BR.md) ou [English](README.md).*


## Polls-Backend

Este é o backend para o sistema de votos, desenvolvido utilizando Node.js, Express, Typescript, Prisma ORM com PostgreSQL.

## Requisitos

- Node.js v20.0.0 ou superior
- PostgreSQL
- pnpm ou npm
- Docker

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ThiLourenco/polls-backend.git
cd polls-backend
```
2. Instale as dependências:
```bash
pnpm install
ou
npm install
```

3. Instalação com Docker:

Este repositório contém os artefatos necessários para executar usando Docker. Primeiro de tudo, você precisará instalar alguns pré-requisitos, caso ainda não estejam instalados:

* Instalar o [Docker](https://docs.docker.com/get-docker/).

```bash 
  docker compose up
```

4. Configure o banco de dados PostgreSQL e crie um arquivo .env na raiz do projeto com a URL do banco de dados:

```bash
DATABASE_URL=postgresql://<usuario>:<senha>@<host>:<porta>/<database>?schema=public
```
5. Execute as migrações do Prisma para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev --name init
```

6. Gere o cliente Prisma:
```bash
npx prisma generate
```
## Executando o Servidor

Para iniciar o servidor em modo de desenvolvimento, use:
```bash
pnpm dev
ou
npm run dev
```
O servidor será iniciado em http://localhost:3333 ou sua porta preferida.

## Executando testes
```bash
pnpm test
or 
npm run test
```

## Contribuição
Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (git checkout -b minha-feature).
3. Commit suas alterações (git commit -am 'Adiciona nova feature').
4. Envie para o branch (git push origin minha-feature).
5. Crie um novo Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [**MIT License**](https://github.com/ThiLourenco/polls-backend/blob/main/LICENSE) para mais detalhes.

