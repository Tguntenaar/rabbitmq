## Description


A GraphQL API using NestJS that does basic CRUD operations into a Postgres database and that sends events into a RabbitMQ queue

## Prerequisites

- Docker installed
- Node package manager installed

## Installation

```bash
$ pnpm install
```

Install and run the RabbitMQ server on Mac silicon chips 

[Other operating systems](https://www.rabbitmq.com/docs/platforms)

```bash
$ brew install rabbitmq
```

Pull postgres server via a docker image
```bash
$ docker pull postgres
```

## Running the app

Run postgress
```bash
$ docker run --name rabbitmq-nestjs-edge -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

Run RabbitMQ server

``` bash
CONF_ENV_FILE="/opt/homebrew/etc/rabbitmq/rabbitmq-env.conf" /opt/homebrew/opt/rabbitmq/sbin/rabbitmq-server
```

Run NestJS
```bash
$ pnpm run start
```

Now open `localhost:3000/graphql` for the graphql playground.

### Prisma

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).

### Stay in touch

- Author - [Thomas Guntenaar](https://thomasguntenaar.com)
