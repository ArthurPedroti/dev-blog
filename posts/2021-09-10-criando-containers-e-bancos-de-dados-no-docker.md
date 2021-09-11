---
title: Criando containers e bancos de dados no Docker
description: Entenda os princípios básicos do Docker, e como criar seu primeiro container
date: 2021-09-10 09:37:36
thumbnail: https://dclogisticsbrasil.com/wp-content/uploads/2018/11/container-qual-usar.jpg
category: jekyll
background: "#B31917"
---
## Introdução

O Docker é uma ferramenta que permite a criação de ambientes isolados e padronizados de uma maneira muito simples e prática. Como por exemplo, podemos criar um servidor inteiro em apenas alguns segundos através do Docker, pois ele funciona na base de "imagens", que seriam uma espécie de "servidor congelado", que são capazes de recriar esses servidores/ambientes, em instantes.

## Docker Images

Como falamos na introdução, o Docker possui o sistema de "imagens", que são meio que servidores "congelados" e padronizados, que são utilizados para dar um Ctrl+c Ctrl+v, e criar um servidor de maneira instantânea.

Logo, o primeiro passo para utilizarmos o Docker, é achar essas imagens para utilizarmos. Há muitas opções disponíveis na internet, incluindo as imagens que o próprio Docker disponibiliza. No link abaixo é o onde o Docker lista todas as imagens disponíveis, e só de você dar uma olhada nessa pagina, você já irá entender o poder que o Docker tem, que é o de criar qualquer tipo de ambiente, pronto para ser usado, em instantes.

[Docker Hub Container Image Library | App Containerization](https://hub.docker.com/)

## Bitnami images

Gosto muito de usar as imagens da bitnami, por que há uma empresa bem grande por trás, que da suporte, tem um bom know-how especializado nesta área, e previamente valida todas as imagens. Vale a pena pesquisar e saber um pouco mais sobre eles e dar uma olhada no que eles tem disponível para ser utilizado.

[Bitnami](https://bitnami.com/)

## Docker run

Agora que já temos uma boa noção do que são as imagens que o Docker utiliza, está na hora de utiliza-las, e basicamente precisamos instalar o Docker no nosso computador e configura-lo da maneira correta, de acordo com o sistema operacional.

[Get Started with Docker | Docker](https://www.docker.com/get-started)

Após o Docker estar devidamente instalado, vamos rodar o comando "docker run", para criamos o nosso primeiro container:

```tsx
$ docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```

As opções que iremos utilizar são:

- Detached (-d): Que fará nosso container rodar em background.
- Name (—name): Apenas para identificar o container.
- Environment variables (-e): Defini variaveis ambientes.
- Publish (-p): Defini o encaminhamento de portas para se comunicar com o container.

Você pode verificar todas as opções com "docker —help", "docker COMMAND —help", ou pela documentação do Docker.

## Praticando...

Agora vamos para a prática, vamos criar um container identificado como "postgres", passando as variáveis ambientes "POSTGRESQL_PASSWORD" e "POSTGRESQL_USERNAME" (que variam de acordo com a imagem que você esta utilizando), utilizando o encaminhamento de portas com a porta padrão do postgres (5432), e utilizando a imagem do PostgreSQL da Bitnami:

```tsx
docker run -d --name postgres -e POSTGRESQL_PASSWORD=postgres -e POSTGRESQL_USERNAME=postgres -p 5432:5432 bitnami/postgresql:latest
```

Só para entender um pouco melhor a questão da configuração das portas, normalmente, em aplicações de produção, é comum passar a opção "-p" para utilizar uma porta diferente da porta padrão do postgres. E é feito desta forma por motivos de segurança mesmo, pois a porta padrão é sempre a primeira tentativa em qualquer tipo de invasão. Dessa forma, podemos passar algo como "-p 78562:5432" para que a única porta que possa se comunicar com o postgres dentro do container, seja a "78562", e não a padrão a "5432". Então, quando as requisições forem feitas a porta "78562", elas serão encaminhadas para a padrão "5432" do postgres, dentro do container.

## Comandos básicos

Agora que já temos nosso container criado, vamos a alguns comando úteis que podem ser utilizados para facilitar o controle dos containers.

- Listar todos os containers ativos: `docker ps`
- Listar todos os containers: `docker ps -a`
- Ligar um container: `docker start nome_do_container`
- Desligar um container: `docker stop nome_do_container`
- Deletar um container: `docker rm nome_do_container`

## Acessando o psql diretamente no container

Algo que as vezes precisamos utilizar, e que pode ser bem útil, é acessar a linha de comando do postgres, o "psql". E para isso, basta apenas executar:

```jsx
docker exec -ti container_name psql -U postgres_username
```

## Criando nosso primeiro banco de dados

Já dentro do psql, vamos agora criar nosso primeiro banco, e também um novo usuário para ser o dono desse novo banco.

### Acessando o psql:

```jsx
docker exec -ti postgres psql -U postgres
```

### Criando usuário:

```jsx
CREATE ROLE username WITH LOGIN ENCRYPTED PASSWORD 'password';
```

### Criando banco com usuário recem criado como dono:

```jsx
CREATE DATABASE mydatabase OWNER mydatabe_username;
```

Normalmente eu replico o nome do próprio banco para o nome do dono (owner), para ficar mais fácil de se lembrar, mas fica a gosto de cada um. Agora já temos nosso container e o nosso primeiro banco criado, basta apenas dar um "exit" e sair do psql.

## Acessando nosso banco dentro do container

Mesmo o nosso banco estando dentro do container, o nosso container ainda está em **localhost**, então basta apenas se conectar pela porta que configuramos no encaminhamento de portas (que indicamos ao criar o container), e iremos entrar diretamente no postgres.

Você pode acessar o banco do nosso container de diversas formas, basta apenas passar as seguintes configurações:

- Host: localhost
- Port: 5432
- Database: mydatabase
- Username: mydatabe_username
- Password: mydatabe_username

Dependendo do que você for fazer no banco, talvez você precise acessar o banco utilizando o usuário "postgres", que é o usuário "root" do postgres, no nosso caso, basta apenas acessar da seguinte forma:

- Username: postgres
- Password: postgres

## Concluindo

O Docker pode parecer um pouco complexo no começo, e talvez você irá precisar consultar algumas vezes a documentação, dependendo do que você deseja fazer, porem, ele é uma ferramenta poderosa, que nos permite criar ambientes totalmente funcionais em poucos segundos. 

Lembrando, não deixe de olhar a documentação! Aqui só falamos de um pouquinho do poder do Docker, cabe a você estudar e se aprofundar no assunto, seguem os links para consultas:

[https://www.docker.com/](https://www.docker.com/)

[https://docs.docker.com/](https://docs.docker.com/)

[https://hub.docker.com/](https://hub.docker.com/)

[https://hub.docker.com/r/bitnami/postgresql/](https://hub.docker.com/r/bitnami/postgresql/)