---
title: Varias versões do Node.js em apenas um ambiente
description: Como utilizar o NVM para gerenciar várias versões do Node.js em
  apenas um ambiente
date: 2022-01-28 05:08:09
image: assets/img/nvm.png
category: dev
background: "#637a91"
---
## Introdução

Conforme vamos criando projetos em Node.js, percebemos que a versão do node vai atualizando e alguns projetos vão ficando nas versões passadas, o que começa a nos gerar algumas incompatibilidades, em que um servidor possui uma versão especifica do node, e todos os projetos dentro dele precisam seguir essa versão. E nessa dificuldade que entra o NVM, que nos permite utilizar várias versões do node em um mesmo ambiente.

## O que é o NVM

O NVM (Node Version Manager), como o próprio nome já diz, é um gerenciador de versões do node, e ele permite que você instale várias versões do node no seu ambiente. Para instalar o nvm, execute os seguintes comandos:

```jsx
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

```jsx
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Docs: [Github| NVM](https://github.com/nvm-sh/nvm)

## Instalando as versões do Node.js

Agora vamos instalar as versões que queremos usar, a princípio, podemos estar rodando este comando para instalar a versão LTS:

```jsx
nvm install --lts
```

Podemos também instalar uma versão especifica do node, por exemplo, queremos utilizar a versão 12, basta utilizar o comando:

```jsx
nvm install 12
```

## Trocando de versões

Para trocar de versão basta apenas utilizar o comando “nvm use” e digitar a versão:

```jsx
nvm use 16
nvm use --lts
nvm use 12
```

## Como funciona o NVM

Agora que já vimos o funcionamento do nvm, vamos entender um pouco melhor como ele funciona, para podermos entender como outras aplicações podem fazer o use dele.

Basicamente, o nvm armazena as diferentes versões do node no caminho “~/.nvm/versions/node”, e fica alternando o caminhão padrão do sistema entre essas pastas:

```jsx
arthurpedroti in .nvm/versions/node
❯ ls
v12.22.7  v12.22.9  v14.18.1
```

Dentro de cada uma destas pastas, podemos acessar o caminho “bin/node” para apontar uma aplicação e usar diretamente aquela versão do node especificamente.

## Automatizando a troca de versões do node de acordo com cada projeto

Uma das formas de já deixar pre-definido qual versão cada projeto vai usar, é criar um arquivo “.nvmrc” dentro de cada projeto, e dentro deste arquivo colocar a versão desejada do node para aquele projeto:

```jsx
// .nvmrc
12
```

Dessa forma, ao executar o comando “nvm use”, ele vai automaticamente detectar o arquivo “.nvmrc” e utilizar o versão do node indicada por ele.

Isso facilita bastante no ambiente de desenvolvimento, para não ter que ficar consultando o projeto ou outras pessoas para saber em qual a versão do node aquele projeto está sendo desenvolvido. Basta apenas rodar o comando do nvm, e você já vai estar rodando a versão correta do node. Você só terá que implementar a cultura de sempre criar o arquivo “.nvmrc” em todos os projetos.

## Definindo uma versão padrão do node

Uma das coisas que podem fazer você ficar com um pouco de raiva no nvm, é o fato de que toda vez que você abre um novo shell, ele abre como se não tivesse o node, e você precisa digitar o comando do nvm para ativar o node.

Mas isso é bem simples de resolver, basta apenas ativar a versão que você deseja usar como padrão, e executar o seguinte comando:

```jsx
nvm alias default node
```

Pronto, agora toda vez que você abrir um novo shell, o node já vai rodar com essa versão padrão.

## Em produção

Uma das formas de usar o nvm em produção, é utilizar o PM2 juntamente com o nvm, atualmente o PM2 consegue entender os caminhos das versões do nvm de forma automática, mas como vimos anteriormente, você também pode indicar o caminho completo, dependendo da aplicação que você esteja utilizando.

Quando utilizamos o PM2, podemos passar uma flag chamada “interpreter”, e indicar a versão do node que desejamos usar, dessa forma, o PM2 vai utilizar a versão indicada para inicializar a aplicação:

```jsx
pm2 start --interpreter=node@12.22.7 hello.js
```

Ou usando o caminho completo:

```jsx
pm2 start --interpreter=/home/user/.nvm/v0.10.28/bin/node hello.js
```

Você também pode criar um arquivo de configurações do pm2, para manter um comando padrão de inicialização do pm2:

```jsx
// ecosystem.config.js
module.exports = {
  apps : [{
    name: 'hello',
    script: 'hello.js',
    interpreter: 'node@12.22.7'
  }]
};
```

E executar com o comando “pm2 start ecosystem.config.js”

## Conclusão

O nvm é uma ferramenta extremamente útil, porque para instalar, desinstalar, e manter várias versões do node simultaneamente é uma tremenda dor de cabeça, além de ser muito pouco prático, e como vimos, podemos usá-lo tanto em ambiente de desenvolvimento, quanto em produção. Se você tem alguma dúvida ou sugestão, não deixe de comentar aqui embaixo, até a próxima.😉