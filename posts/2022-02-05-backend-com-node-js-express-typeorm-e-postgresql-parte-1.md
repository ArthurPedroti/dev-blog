---
title: Backend com Node.JS, Express, TypeORM e PostgreSQL - Parte 1
description: Criando um projeto mais bem estruturado com Node.js, Express,
  TypeORM e PostgreSQL
date: 2022-02-05 10:38:14
image: assets/img/node-js-api.png
category: node
background: "#3c873a"
---
## Introdução

No começo da minha caminhada comecei criando projetos bem simples em Node.js, com algumas rotas e controllers, e acredito que todo mundo começa assim. Depois começamos a aprender um pouco sobre ORMs, que facilitam a nossa vida, mas conforme vamos criando e aprendendo coisas novas, nossos projetos podem acabar virando uma bela bagunça. Então vamos aprender a criar um projeto simples, mas com uma boa arquitetura e seguindo boas práticas de DDD, e que pode crescer de maneira simples e organizada.

## Instalando e conhecendo nossas ferramentas

Vamos começar nosso projeto, e logo depois já vamos instalar o express.

```jsx
yarn init -y
yarn add express
yarn add @types/express -D
```

O express é um dos frameworks mais famosos do mercado, e nos permite construir excelentes aplicações. Agora, vamos instalar o typescript e o ts-node-dev:

```jsx
yarn add typescript ts-node-dev -D
```

Utilizaremos typescript, pois usaremos interfaces para nos organizar, e o typescript por si só já otimiza o nosso desenvolvimento em mil vezes, pois sabemos todas as propriedades, métodos etc., de tudo que estamos utilizando, economizando muito o nosso tempo e a nossa paciência.

 E o ts-node-dev, é a biblioteca que nos ajudará a ler o typescript em desenvolvimento, sem ter que transformar ele em javascript o tempo todo.

Agora vamos gerar o arquivo de configuração do typescript e fazer alguns ajustes:

```jsx
yarn tsc --init
```

```jsx
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2021",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": false,
    "skipLibCheck": true
  }
}
```

Só alterei o **target** para “es2021” e o **strict** para “false”, para que apenas o typescript confira e acuse os erros no nosso código.

Se quiser consultar melhor sobre todas as configurações do typescript, acesse o link:

[TypeScript: TSConfig Reference - Docs on every TSConfig option (typescriptlang.org)](https://www.typescriptlang.org/tsconfig#strict)

Agora vamos criar uma pasta “src” e um arquivo “server.ts”, e o nosso script para rodar o typescript:

```jsx
// src/server.ts
import express from 'express';

const app = express();
app.use(express.json());

app.listen(3333, () => {
  console.log('listening on port 3333');
})
```

```jsx
// package.json
"scripts": {
    "dev": "ts-node-dev --transpile-only src/server.ts"
},
```

Execute “yarn dev” no seu terminal e veja se está funcionando normalmente, a flag “—transpile-only” é para deixar o ts-node-dev mais rápido, para um ambiente de desenvolvimento em que já existe uma boa quantidade de código.

Para instalar o typeorm, precisamos adicionar três pacotes, sendo que um pacote, é obrigatório para o typeorm funcionar, e o outro varia de acordo com o banco que você utilizará.

```jsx
yarn add typeorm reflect-metadata pg
```

Para mais detalhes:

[TypeORM - Amazing ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases. Works in NodeJS, Browser, Ionic, Cordova and Electron platforms.](https://typeorm.io/#/)

Agora vamos adicionar o reflect-metadata ao nosso server.ts, e adicionar duas configurações ao nosso tsconfig, que o typeorm pede para habilitarmos:

```jsx
// server.ts
import 'reflect-metadata'
import express from 'express';

const app = express();
app.use(express.json());

app.listen(3333, () => {
  console.log('listening on port 3333');
})
```

```jsx
// tsconfig.json
...
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,             
  }
}
```

Agora vamos criar um novo arquivo chamado “ormconfig.json”, onde fica as configurações de conexão do typeorm, e o caminhos para algumas pastas que vou estar explicando com mais detalhes depois:

```jsx
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "tutorialnode",
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
```

Você vai precisar ajustar essas configurações de acordo com o banco que você tenha instalado na sua máquina, se você não sabe como instalar ou não tem o postgres na sua máquina, dê uma olhada neste post:

[Criando containers e bancos de dados no Docker | Arthur Pedroti](https://dev.arthurpedroti.com.br/criando-containers-e-bancos-de-dados-no-docker/)

## Criando tabelas

O typeorm utiliza o que chamamos de **migrations**, para criar uma espécie de histórico do seu banco de dados, ou seja, são um conjunto de instruções de quais tabelas e relações criar, em qual ordem, e de como desfazer cada uma delas.

Isso pode parecer confuso e até desnecessário, mas isso é extremamente útil na hora do desenvolvimento, de dar manutenção no banco de dados, desfazer alguma mudança que foi feita, e entender como aquele banco foi criado.

Para começarmos a utilizar as migrations, primeiro nós precisamos indicar onde elas serão salvas, o que já fizemos no nosso arquivo **ormconfig.json** na config “migrationDir”, e depois, utilizar a cli do typeorm para gerar e executar essas migrations, indicando também onde essas se encontram, na config “migrations”.

Eu particularmente prefiro usar o próprio pacote do typeorm, que vem com a cli, ao invés de instalar o cli na minha máquina, e para fazer isso, precisamos apenas configurar um script no nosso package.json:

```jsx
// package.json
...
	"scripts": {
      "dev": "ts-node-dev --transpile-only src/server.ts",
      "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
	},
...
```

Agora, para criar nossa primeira migration, vamos executar o seguinte comando:

```jsx
yarn typeorm migration:create -n CreateProducts
```

Passamos a flag “-n” para nomear a migration, e logo após executar, irá aparecer um arquivo novo no caminho src/database/migrations.

```jsx
// {timestamp}-CreateProducts.ts
import { MigrationInterface, QueryRunner } from "typeorm";

  export class CreateProducts1643634450284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
```

Para entender a migration, vamos primeiro reparar que ela possui dois métodos diferentes, o up e o down, onde o up irá executar os comandos para a criação/alteração do BD, e no down, vai ser exatamente o contrário, ou seja, desfazer o que foi feito no up. Dessa forma, é como se você fosse avançar ou retroceder na “linha do tempo” do seu banco de dados.

Nesse exemplo vamos criar um tabela de produtos, com nome, descrição, e campos de data da criação e data da última atualização, ficando da seguinte forma:

```jsx
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1643634450284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
												generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                      },
                      {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                      },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
```

A forma que o typeorm estrutura as migrations é muito simples de entender, e não tem tanto mistério, por isso não vou me delongar muito explicando cada detalhe, mas você pode consultar e entender melhor dando uma olhada na documentação.

Agora basta rodar o comando para executar as migrations:

```jsx
yarn typeorm migration:run
```

Se tudo der certo e as configurações do banco estiverem corretas, ele vai ter criado a tabela no banco de dados para você, e para testar o método de down, você pode rodar o comando abaixo, para reverter a última migration:

```jsx
yarn typeorm migration:revert
```

Você também irá notar que o typeorm cria uma tabela chamada migrations, em que ele armazena as migrations que já foram executas no banco, e as utiliza para reverter essas migrações.

## Entidades

As entidades no typeorm, que seriam como os models de um MVC, são os que representam a identidade dos itens de uma determinada tabela e como eles funcionam, essas entidades são usadas pelo próprio typeorm para se guiar na manipulação do BD.

Quando pensamos em DDD, temos que analisar o seguinte, eu posso criar uma pasta dentro da minha pasta database, e colocar todas as entidades dentro dela, e continuar fazendo isso para todos os arquivos que estaremos criando, mas, conforme o projeto for crescendo, isso começa a virar uma verdadeira bagunça, e se torna muito difícil de pensar, em como no futuro desacoplar um pedaço da nossa aplicação.

Então, pensando de forma mais simples, sem adentrar muito no mérito do DDD em si, para cada entidade que criarmos, vamos por padrão criar toda a lógica dela, da maneira mais separada possível, para que aquela entidade vire realmente um domínio da aplicação, e possa ser enxergada de maneira isolada.

Abrindo um adendo importante, o motivo de criar uma espécie de “domínio” para cada entidade, é puramente didático, para entender quando realmente uma entidade deve ou não ser um domínio, ou estar dentro de outro domínio, sugiro a cada um que estude mais afundo a questão do DDD, para refletir e entender quando ocorre cada situação.

Na prática, vamos criar uma pasta chamada “modules”, depois uma chamada products > infra > typeorm > entities, dessa forma:

![Imagem das estruturação das pastas](assets/img/node-typeorm1.png "Imagem das estruturação das pastas")

E você já deve estar se perguntando para que tanta pasta dentro de pasta, mas em breve vamos ver que organização nunca é demais, e isso vai nos permitir, como dissemos acima, ver o domínio do produto de maneira totalmente separada na aplicação, facilitando bastante nosso trabalho no futuro.

```jsx
// Product.ts
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn() 
  updated_at: Date;
}

export default Product;
```

Nesse arquivo, basicamente utilizamos os **decorators** do typeorm para indicar como cada campo da nossa entidade se comporta e o que ele representa.

## Continua...

Para esse artigo não ficar demasiadamente longo e cansativo, ele será dividido em duas partes. Então semana que vem já postarei a segunda parte. Se você tem alguma dúvida ou sugestão, não deixe de comentar aqui embaixo, até a próxima.😉