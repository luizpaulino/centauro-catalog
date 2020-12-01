# Centauro

A ideia é expor uma solução que permita consultar valores dos produtos em todas as moedas atendidas.

### Pré requisitos para rodar o projeto
 - Docker compose
 ou
 - NodeJS [14.x]
 - yarn [1.x]
 - redis [6.x]

### Build do projeto com docker-compose
Dentro da raiz do projeto executar o comando

```sh
docker-compose up
```

### Build do projeto sem o docker

Após o clone do projeto, garantir que o redis está UP:

Configurar o arquivo .env (usar como exemplo o .env.example)
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASS=
APP_PORT=3333
```

Exeutar a sequência de comandos:

```sh
yarn install

yarn dev:server
```

### Executar testes unitários do projeto com docker-compose
Dentro da raiz do projeto executar o comando

```sh
docker-compose run test
```

### Executar testes unitários do projeto sem docker-compose
Garantir que o comando abaixo já tenha sido executado com sucesso:
```sh
yarn install
```

Dentro da raiz do projeto executar o comando

```sh
yarn test
```

Documentação das rotas da API
https://app.swaggerhub.com/apis-docs/luizpaulino/centauro-catalog/1.0.0
