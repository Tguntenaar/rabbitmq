## Description


A GraphQL API using NestJS that does basic CRUD operations into a Postgres database and that sends events into a RabbitMQ queue

## Prerequisites

- [Docker installed](https://docs.docker.com/get-docker/)
- Node package manager installed npm, yarn, pnpm

## Installation

```bash
$ pnpm install
```

## Running the app

Run postgres
```bash
$ docker run --name rabbitmq-nestjs-edge -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

Copy the `.env.example` file and call in `.env`. Add the database URL and set the correct password.

Run RabbitMQ server

``` bash
$ docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management
```

Open another terminal window and run NestJS
```bash
$ pnpm run start
```
or in dev mode
```bash
$ pnpm run start:dev
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

### NestJS

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
