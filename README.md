![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Description

Dockerized NestJS and Postgres project repo demonstrates backend API gateway development in Node Js, Nest JS and Postgres and spinn-up components with Docker.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Spinn-up Docker containers

Use below commands to spinn-up Docker containers.

```bash
# spinn-up Docker containers in detaiched mode
$ docker-compose up -d

# stop Docker containers
$ docker-compose down

# delete project's Docker image (re-spinning Docker containers or facing any issues)
$ docker images
$ docker rmi [image_id]
```

## Documentation

This repo uses SWAGGER documentation and once Docker containers are up and running you can navigate to (`http://localhost:4999/api` or `http://127.0.0.1/api`) on your browser.

## Note:

This repo uses Docker containers to spinn-up Nest JS backend project and Postgresql DB containers. You need to have Docker and Docker desktop installed on you machine.

## Node version

This project is built on Node JS version `14.20.0` and Docker containers also uses same Node Js version.
For any reason, if spinning-up Docker containers does not work on your side, you can double check Node Js version on machine to match above version or you can change Node Js version in project.
