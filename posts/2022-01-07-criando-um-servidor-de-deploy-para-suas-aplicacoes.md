---
title: Criando um servidor de deploy para suas aplicações
description: Como criar um servidor simples e eficiente para rodar suas
  aplicações em produção
date: 2022-01-13 03:59:55
image: assets/img/deploy.png
category: dev
background: "#637a91"
---
## Introdução

Quando estamos começando a programar e fazendo nossas primeiras aplicações para testes, chega uma hora que precisamos realmente colocar elas para rodar, e está tudo rodando perfeitamente no ambiente de desenvolvimento da nossa máquina, mas então vem a pergunta, como colocar isso para todo mundo usar? Muitas vezes não sabemos como fazer para criar um ambiente minimamente viável para que outras pessoas possam ter acesso as nossas aplicações, e eu mesmo, na primeira que vez que fui fazer isso, demorei umas duas semanas para realmente descobrir o jeito mais simples e viável de ser feito.

Então nesse post, vou mostrar como configurar um servidor de maneira simples, porém eficiente, para estar rodando suas aplicações.

## Os agentes do servidor

O primeiro passo, e o mais importante, é entendermos o que vai estar acontecendo no nosso servidor, quais são os agentes e o que cada um deles faz, por que com esse entendimento, fica muito mais fácil de entender que não é a ferramenta “x” ou “y” que faz determinado papel, e sim, que você tem várias ferramentas para desempenhar cada papel.

Criaremos um ambiente com os seguintes agentes:

![Um fluxograma mostrando os agentes do servidor: Serviço da aplicação, Gerenciado de serviços, Proxy reverso, Gerenciador de certificados](assets/img/deploy01.png "Os agentes do servidor")

* **Serviço da aplicação**: O serviço que vai rodar dentro do seu servidor, por exemplo, quando você está executando sua aplicação em desenvolvimento, ela tem um serviço que é responsável por manter ela funcionando, da mesma forma aqui, sendo que podem ser vários serviços de diferentes aplicações.
* **Gerenciado de serviços**: É o responsável por manter todos os serviços funcionando, nele você consegue ver os logs de cada serviço, ele vai reiniciar o serviço sozinho caso ele caia, e nele você vai poder configurar todas as políticas de como você deseja que estes serviços funcionem.
* **Proxy reverso**: Faz um papel de recepcionista do seu servidor, ele que vai encaminhar cada requisição para o serviço certo, por exemplo, se eu acessar o servidor pelo endereço “server01.com.br”, ele vai me encaminhar para o “serviço01”, que eu configurei previamente.
* **Gerenciador de certificados**: Responsável por criar e manter os certificados ssl das nossas aplicações.

Agora vamos dar nomes aos bois, mas lembrando que existem várias alternativas para desempenhar cada um desses papeis, e cabe a você entender o que se encaixa melhor para cada situação, mas as ferramentas que vamos utilizar aqui também são excelentes, e são ótimas opções para começar.

Então, para o nosso exemplo, vamos utilizar o Node.js para construir o serviço da nossa aplicação, o PM2 para gerenciar o serviço, o Nginx como proxy reverso, e o Certbot para lidar com os nossos certificados.

![Um fluxograma mostrando as aplicações dos agentes do servidor: Node.js, PM2, Nginx, Certbot](assets/img/deploy02.png "Os agentes do servidor")

## Servidor da aplicação

Como utilizaremos o Node.js nesse exemplo, o primeiro passo é estar instalando ele no seu servidor, neste exemplo, vamos estar utilizando como servidor o Ubuntu Server 20.04. Se você quiser testar essa abordagem de um modo fácil, você pode instalar um container do Ubuntu, seguindo este outro post: [Criando um servidor Ubuntu no Docker | Arthur Pedroti](https://dev.arthurpedroti.com.br/criando-um-servidor-ubuntu-no-docker/)

Para instalar o node, execute os seguintes comandos:

```jsx
cd ~
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
sudo apt install nodejs
```

Para verificar se o node foi instalado corretamente, digite:

```bash
node -v
```

```jsx
// Output
v14.4.0
```

Agora iremos instalar o npm(o gerenciador de pacotes do node), e para garantir que ele esteja funcionando corretamente, instalamos depois uma build de pacotes essenciais:

```bash
sudo apt install npm
sudo apt install build-essential
```

Agora vamos criar uma aplicação de um único arquivo, só para simular uma aplicação real:

```bash
cd ~
nano hello.js
```

```jsx
// hello.js
const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Salve o arquivo e pronto, esse é apenas uma aplicação que ouve na porta 3000 em localhost e retorna “Hello World”.

Pra verificar que está funcionando, apenas execute:

```bash
node hello.js
```

E você recebera a seguinte mensagem: `Server running at http://localhost:3000/`

Para sair da execução da aplicação, pressione `Ctrl+c`.

## Gerenciador de serviços

Agora iremos instalar o PM2 para gerenciar os serviços, como o que acabamos de executar com o node.

Para instalar utilizaremos o npm, execute o comando:

```bash
sudo npm install pm2@latest -g
```

E agora iremos executar o serviço do node que acabamos de criar pelo PM2:

```bash
pm2 start hello.js
```

Você pode consultar os serviços que estão rodando pelo comand `pm2 list`

![Imagem da tabela que mostra os serviços no PM2](assets/img/deploy03.png "\"pm2 list\" output")

Como você pode ver, ele assumiu o nome do nosso arquivo como o nome de serviço, e agora ele já está gerenciando esse serviço, e mesmo que a aplicação tenha algum crash, ele já vai automaticamente reiniciar para você.

Agora vamos executar um comando para que o PM2 seja executado ao inicializar o sistema, com uma lista de serviços previamente salva.

```bash
pm2 startup systemd
```

E comando abaixo salva a lista atual de serviços que estão rodando como a lista padrão para quando o servidor inicializar:

```bash
pm2 save
```

E para monitorar os serviços, você também pode usar o comando `pm2 monit`

## Proxy reverso

Agora vamos configurar o nosso recepcionista, que vai encaminhar as requisições que chegam no nosso servidor direto para o serviço do hello.js, lembrando que o serviço do hello.js está rodando em localhost na porta 3000.

E para isso vamos instalar o Nginx:

```bash
apt install nginx
```

O Nginx funciona da seguinte forma, ele possui duas pastas principais, a “sites-available” e a “sites-enabled”. E elas funcionam da seguinte maneira, na pasta “sites-avaiable”, nós colocamos as configurações de cada uma das nossas aplicações, e se quisermos habilitar essa configuração, criamos um link simbólico (vulgo atalho, mas esse é o nome dado no linux), desse arquivo de configuração para a pasta “sites-enabled”.

Na prática será assim, vamos acessar a pasta de “sites-available”: 

```bash
cd /etc/nginx/sites-available/
```

Copiar a configuração default:

```bash
cp default hello
```

E ajustar a configuração nesse novo arquivo:

```bash
nano hello
```

Arquivo hello:

```bash
server {
        server_name hello.com.br;

server_name _;

location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Se atentando que a linha 2, diz qual será o endereço de referência, e a linha 7, para onde o Nginx deve encaminhar o cliente quando ele solicitar esse endereço.

Ou seja, essa configuração diz que quando você digitar “hello.com.br”, você vai direto para a nossa aplicação do hello.js, que está rodando no “localhost:3000”.

E para habilitar essa configuração, vamos até a pasta de “sites-enabled”:

```bash
cd ..
cd sites-enabled/
```

E criar o nosso link simbólico:

```bash
ln -s /etc/nginx/sites-available/hello hello
```

Em seguida deletamos o link simbólico do arquivo default:

```bash
rm default
```

E para testar se a configuração está funcionando corretamente, executamos:

```bash
nginx -t
```

```jsx
// Output
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Agora iremos reiniciar o serviço do nginx:

```jsx
service nginx reload
service nginx restart
```

Por fim, vamos habilitar as portas 80 e 443 do nosso servidor para ele que possa estar ouvindo as requisições por elas sem nenhum bloqueio:

```jsx
ufw allow 80
ufw allow 443
```

### Entendendo melhor

Lembrando que dessa forma nós estamos configurando para que ao digitar “hello.com.br” você seja encaminhado a porta 3000 do localhost, pelo próprio nginx, mas para que isso funcione, o DNS do domínio “hello.com.br” tem que estar sendo direcionado corretamente para o ip do seu servidor.

Por exemplo, se o ip do seu servidor é “192.168.2.200”, então ao acessar “192.168.2.200:3000”, você já vai estar acessando diretamente o hello.js, por que você está indicando a porta em que ele está sendo executado, enquanto para acessar pelo domínio “hello.com.br”, você deve primeiro configurar o DNS para esse domínio apontar para o ip “192.168.2.200”, e quando você acessar o domínio, que vai estar encaminhando para o ip correspondente, o Nginx vai entender aquela requisição e associar a configuração que você fez, e direcionar aquela requisição para a porta 3000.

Ou seja, o papel do proxy reverso é de permitir que você acesse o domínio“hello.com.br” sem ter que indicar uma porta nele, como “hello.com.br:3000”, por que o proxy reverso que vai ter a configuração prévia para saber que porta ele deve direcionar cada requisição de acordo com o endereço utilizado.

## Gerenciador de certificados

Por fim, vamos criar um certificado SSL para o nosso domínio, e para isso iremos utilizar o [Certbot](https://certbot.eff.org/). Para isso, vamos verificar se o snap está na sua versão mais recente:

```jsx
snap install core
snap refresh core
```

E depois vamos instalar o certbot:

```jsx
snap install --classic certbot
```

Preparando o comando do certbot:

```jsx
ln -s /snap/bin/certbot /usr/bin/certbot
```

Executando o certbot e gerando o certificado:

```jsx
sudo certbot --nginx
```

## Concluindo

Pronto, agora seu domínio já possui um certificado SSL, o Nginx já está encaminhando todas as requisições para o serviço correto, e o PM2 nos garante que a sua aplicação vai ficar ativa 24/7.

Espero que este post tenha de ajudado um pouco a pelo menos sair do 0, entender como funciona, e quais são os papeis e elementos para colocar uma aplicação em produção. Se você tem alguma dúvida ou sugestão, não deixe de comentar aqui em baixo, até a próxima.😉