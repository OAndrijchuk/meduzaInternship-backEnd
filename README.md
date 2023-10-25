## Description

Global variables must be added before use (exemple theyr are in .env.sample
filed):

- DB_HOST - write your dataBase link
- PORT - wite port when you want to start this project

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Docker

To simplify work with Docker, you can use the
[make](https://linuxhint.com/install-use-make-windows/) utility. To work with
the utility, a "Makefile" file is used in the root of the project, which
describes simplified commands that can be easily changed and added.

```bash
$ make build
# docker build -t internship-back:v0.01 .
```

```bash
$ make run
# docker run -p 3001:3001 -d --rm --name internship-back-cont --env-file ./.env -v logs:/app/data internship-back:v0.01
```

```bash
$ make stop
# docker stop internship-back-cont
```

If desired, you can use regular docker commands

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
