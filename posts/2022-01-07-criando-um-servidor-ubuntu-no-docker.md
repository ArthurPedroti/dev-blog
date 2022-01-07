---
title: Criando um servidor Ubuntu no Docker
description: Como criar um Ubuntu Server para testes rápidos pelo Docker e
  algumas dicas de configuração
date: 2022-01-07 02:04:27
image: assets/img/docker-ubuntu.png
category: docker
background: "#007bff"
---


## Introdução

Queria testar alguns processos de instalação e configuração para o Ubuntu Server, mas não queria ter que criar uma máquina virtual nova, só queria ver se realmente não tinha nenhum detalhe que eu tinha esquecido, e pensei logo no docker, que poderia criar pra mim um container do Ubuntu bem rápido e fácil. É um post bem simples, mas que mostra alguns conceitos e detalhes da linha de comando do Docker que vale a pena saber.

## Imagem do Ubuntu

No [Docker Hub](https://hub.docker.com/) você encontra todas as imagens disponíveis para o Docker, e consequentemente a imagem oficial do Ubuntu:

[Ubuntu - Official Image | Docker Hub](https://hub.docker.com/_/ubuntu)

Existem algumas “tags” que são colocadas na linha de comando na criação do container, para sinalizar qual o tipo do ubuntu que você quer criar. A tag pode ser a própria versão “18.04”, ou o nome da versão: “bionic”. A tag padrão é a “latest”, que baixa a última versão LTS do ubuntu.

Como no meu caso, eu gostaria de usar a linha de comando para testar as primeiras configurações, eu descobri que também preciso usar uma opção chamada de **pseudo-TTY**(-it), que cria um terminal interativo para você executar os comandos pelo bash (o shell do Ubuntu).

E por fim usei a opção “—name” para nomear o container. Ficando da seguinte forma:

```bash
docker run --name ubuntu -it ubuntu
```

E depois, para acessar o root, usamos:

```bash
docker exec -it ubuntu bash
```

## Dicas

### Expondo portas

Se você deseja acessar esse container para fazer determinados testes, é aconselhável expor uma porta na **criação do container**, porque se não, você irá ter que criar outro container só para conseguir expor essa porta, mas se você já criou o seu container sem fazer isso, você pode comitar o container atual, criando uma nova imagem, e recriar o container utilizando essa mesma imagem, isso vai te poupar um pouco de trabalho.

Para expor uma porta, basta apenas utilizar a opção “-p”, seguido da porta que vai ser usada pelo host, e depois a porta que será usada pelo container:

```jsx
docker run --name ubuntu -p 3333:3333 -it ubuntu
```

Neste caso, toda vez que você fizer uma requisição para a porta 3333 na sua máquina, vai ser redirecionado para a porta 3333 do seu container.

Docs: [Container networking | Docker Documentation](https://docs.docker.com/config/containers/container-networking/)

### Problemas de conexão

Mesmo expondo a porta do seu container, pode ser que você enfrente algumas dores de cabeça com a conexão, eu mesmo tive alguns problemas, mas o mais complicado e que eu demorei para resolver, foi o de eu expor uma porta do container, por uma aplicação para rodar, e mesmo assim, quando eu tentava acessar o container, dava um erro de resposta como “ERR_EMPTY_RESPONSE**”**, ou “Empty reply from server”.

Esse erro especificamente, ocorre devido ao hostname configurado na sua aplicação, no meu caso, estava utilizando e definindo “localhost” como hostname, e só funcionou quando eu alterei para “0.0.0.0”.

Link que me ajudou a resolver: [node.js - Docker: Empty response from server - Stack Overflow](https://stackoverflow.com/questions/52524289/docker-empty-response-from-server)

## Flags úteis

Algumas vezes, mesmo você logando no shell pelo usuário root, alguns comandos podem acusar que não tem permissão para serem executados por que o usuário não é o root(mesmo você sendo o root rs), nesse caso você pode usar uma a opção “—privileged”, que estende alguns privilégios ao acesso, e evita esses erros.

```jsx
docker exec -it --privileged ubuntu bash
```

## Concluindo

Este foi um post rápido e simples, mas que eu estarei atualizando conforme eu for me deparando com problemas que venham a surgir, se você tem alguma dúvida ou sugestão, não deixe de comentar aqui em baixo, até a próxima.😉