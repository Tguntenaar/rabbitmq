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


## Playground instructions

Now open `localhost:3000/graphql` for the graphql playground.

1. Add the queries and mutation
2. Add the Query variables
3. Execute!
<details>
<summary>
Queries and Mutation
</summary>

```graphql
mutation createEdge($createEdgeInput: CreateEdgeInput!) {
 	createEdge(createEdgeInput: $createEdgeInput) {
    node1_alias
    node2_alias
    id
    created_at
    updated_at
  }
}

query getEdges {
  getEdges {
    id
    node1_alias
    node2_alias
    created_at
    updated_at
    edge_peers
	}
}

query getEdge($getEdgeInput: GetEdgeInput!) {
  getEdge(getEdgeInput: $getEdgeInput) {
    id
    node1_alias
    node2_alias
    created_at
    updated_at
    edge_peers
	}
}


```
</details>


<details>
<summary>
Query variables
</summary>

```json
{
	"createEdgeInput":  {
     "node1_alias": "13",
     "node2_alias": "12"
  },
  "getEdgeInput": {
  	 "id": "e5751d1-1229-4303-9160-daafda770b4a"
  }
}
```
</details>

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
