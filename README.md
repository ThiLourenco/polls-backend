![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=%20DEVELOPMENT&color=GREEN&style=for-the-badge)

<p align="center">
<img src="https://img.shields.io/github/contributors/ThiLourenco/polls-backend" alt="GitHub contributors" />
<img src="https://img.shields.io/github/discussions/ThiLourenco/polls-backend" alt="GitHub discussions" />
<img src="https://img.shields.io/github/issues/ThiLourenco/polls-backend" alt="GitHub issues" />
<img src="https://img.shields.io/github/issues-pr/ThiLourenco/polls-backend" alt="GitHub pull request" />
</p>

*This readme can also be read in [Portuguese](README-pt-BR.md) or [English](README.md).*


## Polls-Backend

This is the backend of the polls system, developed in Node.js, fastify, Typescript, Prisma ORM with PostgreSQL.

## Requirements

- Node.js Version >= v20.17.0
- PostgreSQL
- pnpm ou npm
- Docker

## Run Locally

1. Clone the repository:

```bash
git clone https://github.com/ThiLourenco/polls-backend.git
cd polls-backend
```
2. Install dependencies:
```bash
pnpm install
or
npm install
```
3. Installation with Docker-Compose:

This repository contains the artifacts necessary to run using Docker. First of all, you will need to install some prerequisites, if they are not already installed:

  * Install [Docker](https://docs.docker.com/get-docker/).

```bash 
  docker compose up
```


4. Configure the PostgreSQL database and create a .env file in the project root with the database URL: 
  

```bash
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>?schema=public
```
5. Run Prisma migrations to create the tables in the database:

```bash
npx prisma migrate dev --name init
```

6. Generate the Prisma client:
```bash
npx prisma generate
```
## Running the Server



To start the server in development mode, use:
```bash
pnpm dev
or 
npm run dev
```
The server will start at http://localhost:3333 or your preferred port.

## Contribution
If you want to contribute to this project, follow the steps below:

1. Fork the repository.
2. Create a branch for your feature (git checkout -b my-feature).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin my-feature).
5. Create a new Pull Request.


## License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/ThiLourenco/polls-backend/blob/main/LICENSE) file for details.