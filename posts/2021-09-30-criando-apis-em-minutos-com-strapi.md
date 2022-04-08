---
title: Criando APIs em minutos com Strapi
description: Apresentando o Strapi, um headless CMS totalmente em Javascript,
  muito fácil e prático de se usar
date: 2021-09-30 10:26:39
image: assets/img/strapi.png
category: js
background: "#D6BA32"
---
## Introdução

Quem nunca pensou no tanto de código e estrutura de arquivos que precisamos muitas vezes construir, para criar uma simples aplicação com login e senha? Embora seja obvio que vamos ter um template, com tudo já funcionando e padronizado, ainda assim, precisamos nos certificar de vários detalhes, e garantir que tudo esteja em pleno funcionamento.

Além disso, muitas vezes precisamos de um CMS (Content Management System), para estar dando ao usuário final a possibilidade de alterar certos dados, para que não seja preciso toda santa vez, falar com um desenvolvedor para ele alterar uma simples string da aplicação, e só para construir essa estrutura, já temos um bom trabalho.

Unindo o útil ao agradável, o Strapi é um CMS escrito 100% em javascript, Open Source, e totalmente customizável. Ele é instalado localmente, e você literalmente tem todo o código no seu repositório, e pode customizar o quanto quiser! E a melhor parte, é 100% em Javascript, o que nos permite ter uma facilidade ainda maior, para alterar tudo o que desejarmos.

Ele também é focado em ser developer-first, ou seja, tudo que você vai ver, incluindo os plugins, a forma como as pastas e arquivos são organizados, a interface do CMS, a forma para personalizar os detalhes, criar rotas, etc. É tudo pensado em ser de fácil entendimento para o desenvolvedor.

E por fim, ele ainda roda um GraphQL, e o um REST ao mesmo tempo! Para você poder brincar bastante, e fazer de tudo o que você imaginar!

Nem tudo é perfeito, e é claro que o Strapi tem suas limitações, porém, a cada dia mais, ele tem se mostrado ser uma excelente ferramenta, e tem entregado atualizações constantemente, para melhorar ainda mais a ferramenta.

## Instalando o Strapi

Sem mais delongas, vamos instalar o Strapi, e para isso, estaremos apenas seguindo a documentação, e é sempre bom dar uma olhada nela, caso algo tenha mudado com o passar do tempo:

[Strapi Developer Documentation](https://strapi.io/documentation/developer-docs/latest/getting-started/introduction.html)

### Banco de dados

Pra instalarmos o Strapi, precisamos já ter criado um banco de dados, para que o Strapi possa rodar os scripts iniciais e preparar todo o banco para nós.

Atualmente o Strapi suporta os seguintes bancos:

![Bancos de dados do Strapi](assets/img/bancos-de-dados-strapi.png "Bancos de dados do Strapi")

Porém, isso pode mudar, então é sempre bom dar uma olhada na documentação.

Se você não sabe criar um banco de maneira simples e fácil, sem ter que instalar um monte de coisa, sugiro dar uma olhada neste post, em que eu mostro como criar um banco de dados PostgreSQL em um container, utilizando o Docker:

[Criando containers e bancos de dados no Docker](https://dev.arthurpedroti.com.br/criando-containers-e-bancos-de-dados-no-docker/)

### Criando nosso projeto

Agora iremos rodar o seguinte comando para começar a instalação:

```tsx
yarn create strapi-app my-project
```

Vai aparecer duas opções de instalação, e vamos selecionar a opção "Custom". Depois ele vai perguntar se queremos utilizar algum template, digitamos "n", pois nesse exemplo não será necessário utilizar um.

E então ele vai perguntar em qual banco você deseja instalar, neste exemplo irei utilizar o PostgreSQL, após selecionar o banco, você informa os dados que o Strapi irá utilizar para acessar o bando de dados. E no final, quando perguntar sobre habilitar a conexão SSL, pode selecionar não.

Após isso, o Strapi vai estar fazendo toda a instalação e deixando tudo pronto para você.

### Comandos básicos

Esses são os comandos básicos do Strapi:

* yarn develop - Roda o Strapi no modo de desenvolvimento, observando as alterações
* yarn build - Gera os arquivos da build de produção do Strapi
* yarn start - Roda o Strapi em produção

## Primeiros passos

Agora que já temos nossa aplicação pronta, vamos a uma noção básica de como o Strapi funciona.

Essa é a estrutura atual do Strapi e a função de cada pasta:

[Project Structure - Strapi Developer Documentation](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/file-structure.html)

![Estrutura de pastas do Strapi](assets/img/pastas-strapi.png "Estrutura de pastas do Strapi")

Se você reparar no tanto de "customs" que tem nas descrições dessas pastas, você vai perceber o "por que" do Strapi ser tão interessante, que é pelo seu alto poder de customização.

Sugiro que você dê uma olhada, e aos poucos vá conhecendo e entendo cada parte, pois tem bastante coisa para ver, e não daria para explicar tudo por aqui. 

Mas por exemplo, se fomos até o arquivo "/config/database.js", você vai notar que nesse arquivo, temos todas as configurações que definimos no setup inicial do nosso banco de dados, quando instalamos o Strapi. E se quisermos, podemos simplesmente altera-los por aqui, e vai continuar funcionando da mesma forma.

## Rodando o Strapi

Agora vamos rodar nosso projeto para ver como o Strapi funciona, rode o seguinte comando dentro da pasta do projeto:

```tsx
yarn develop
```

Agora basta acessar: <http://localhost:1337/admin> (se já não tiver aberto automaticamente para você)

Na primeira vez que rodamos o Strapi, ele vai pedir para cadastrarmos o usuário que será o administrador.

![Formulário de cadastro do usuário administrador](assets/img/login-strapi.png "Formulário de cadastro do usuário administrador")

E pronto, já estamos na tela inicial do Strapi!

## Conceitos básicos

Agora vou estar dando uma pequena introdução aos conceitos e nomes que o Strapi utiliza para se organizar, para que você já possa ter uma ideia inicial, e começar a mexer e brincar com o Strapi.

### Collection-Types

 Acessando a aba "Content-Types Builder", podemos estar acessando a parte de criação das **collection-types**.

As collection-types do Strapi, são como as tabelas de qualquer banco de dados, em que você vai construindo e selecionando as colunas que você deseja, que no caso do Strapi, são os "fields".

Então o Strapi vai gerar uma tabela dessa **collection-type** para você, onde já vai ter um CRUD todinho pronto para você usar! Isso mesmo, só de criar uma collection-type, ele já gera um CRUD especifico pra ela, para você pode ler, inserir, atualizar e deletar os dados da maneira que você quiser.

### Single-type

Na mesma aba "Content-Types Builder", podemos estar acessando a parte de criação das **single-types**.

As singles-types, são como a collection-types, mas ao invés de criamos uma "tabela" com várias informações e linhas, a ideia das single-types é armazenarem apenas um **único** dado, e podem ser muito utilizados para informações, como por exemplo, da landing page de um site.

## Criando nossa primeira collection-type

Para exemplificarmos um pouco, vou criar uma collection-type chamada **order**, com dois fields, **number** e a **description**

Collection-type **order**:

![Formulário de criação do collection type order](assets/img/order-strapi.png "Formulário de criação do collection type order")

Field **number**:

![Formulário de criação do field number](assets/img/number-strapi.png "Formulário de criação do field number")

Field **description**:

![Formulário de criação do field description](assets/img/description-strapi.png "Formulário de criação do field description")

Algo bem simples mesmo, só para vermos como funciona.

Agora não esqueça de clicar em "Save", para que o Strapi realmente crie tudo que você inseriu.

![Indicação de onde fica o "save" para criação do collection type](assets/img/save-strapi.png "Indicação de onde fica o \\\\"save\\\\" para criação do collection type")

Quando você criar uma collection ou single type, você pode ir até a pasta "api" do seu projeto, e lá você verá toda a configuração que você fez ali pela interface, só que no formato de código.

Por exemplo, ao acessar "/api/order/models/order.settings.json", podemos verificar as configurações que fizemos do content-type e dos fields nesse arquivo, e também podemos estar alterando por aqui, se preferirmos.

O Strapi também vai gerar os arquivos das **rotas** das orders na pasta "config", vai gerar os **controllers** e os **services**, e tudo você pode personalizar conforme você desejar, e por isso que o Strapi é tão interessante! Só por essa pastinha que ele cria, as possibilidades e personalizações que podemos criar são infinitas!

E se você for até o banco de dados, vai ver que o Strapi já criou nossa tabela também, exatamente conforme configuramos ela:

![Campos da tabela orders no PostgreSQL](assets/img/table-postgres-strapi.png "Campos da tabela orders no PostgreSQL")

![Tabela orders no PostgreSQL](assets/img/table-postgres-strapi-2.png "Tabela orders no PostgreSQL")

### Rotas e CRUD

Agora acessando o menu "Settings > Roles > Authenticated". Na parte de "Permissions", já podemos selecionar e liberar as rotas da nossa tabela de orders. Podemos liberar as rotas tanto no modo público, quanto no modo de autenticação, basta na parte na página das "Roles", selecionar qual dos dois tipos você deseja liberar.

![Formulário de liberação das rotas do Strapi](assets/img/routes-order-strapi.png "Formulário de liberação das rotas do Strapi")

## Concluindo

Simples não? Temos um banco, nossa tabela, e um CRUD prontinho para usarmos, com apenas alguns minutinhos. Percebe o quão prático é utilizar essa ferramenta?

A documentação do Strapi é enorme, e as possibilidades ainda maiores, tem toda a parte de login e tipos de usuários, relacionamento dos collection-types, conexões com third-party applications, o GraphQL, envio de e-mails, recuperação de senha, e assim vai...

Agora cabe a você ler a documentação do Strapi, e explorar essa poderosa ferramenta. Futuramente estarei escrevendo de forma mais detalhada sobre os detalhes ao se criar os collection-types, relacionamentos, possibilidades, também tem toda a parte de configuração e playground do GraphQL, que também quero escrever sobre, e muitas outras coisas, então fique atento as minhas redes e ao blog para não perder as novidades😉

No mais, seguem os links do site do Strapi, e da documentação, agora cabe a você estudar e se aprofundar nessa incrível ferramenta:

<https://strapi.io/>

<https://strapi.io/documentation/>