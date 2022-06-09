---
title: Backend com Node.JS, Express, TypeORM e PostgreSQL - Parte 2
description: Criando um projeto mais bem estruturadoc com Node.js, Express,
  TypeORM e PostgreSQL
date: 2022-02-12 11:28:07
image: assets/img/node-js-api.png
category: node
background: "#3c873a"
---
## Introdução

No começo da minha caminhada começei criando projetos bem simples em Node.js, com algumas rotas e controllers, e acredito que todo mundo começa assim, depois começamos a aprender um pouco sobre ORMs, que facilitam a nossa vida, mas conforme vamos criando e aprendendo coisas novas, nosso projeto pode acabar virando uma bela bagunça. Então vamos aprender a criar um projeto simples, mas com uma boa arquitetura e seguindo boas práticas de DDD, e que pode crescer de maneira simples e organizada. Continuando o post da semana passada, daremos continuidade a criação de toda a arquitetura e organização da nossa aplicação, criando os repositórios, serviços, controllers, rotas etc.

Se você não viu o post da semana passada, vale a pena conferir para entender de onde estamos saindo:

[Backend com Node.JS, Express, TypeORM e PostgreSQL - Parte 1 | Arthur Pedroti](https://dev.arthurpedroti.com.br/backend-com-node-js-express-typeorm-e-postgresql-parte-1/)

## Conectando o TypeORM a nossa aplicação

Agora iremos criar um arquivo index.ts, na nossa pasta database, onde vamos criar a conexão com o nosso banco, e depois importar essa conexão no nosso serviço do express:

```jsx
// database/index.ts
import { createConnection } from "typeorm";

createConnection();
```

```jsx
// server.ts
import 'reflect-metadata';
import express from 'express';
import './database';
...
```

## Criando serviços e repositórios

Agora vamos criar nosso primeiro serviço, dentro da pasta “products/services”, que será o serviço de criação do produto:

```jsx
// CreateProductService.ts
import Product from "../infra/typeorm/entities/Product";

type IRequest = {
  name: string;
  description: string;
}

export class CreateProductService {
  async execute({ name, description }: IRequest): Promise<Product> {}
}
```

Nessa etapa é que entendemos a pattern que o TypeORM usa, chamada **Data Mapper**, que usa o que chamamos de repositórios, para criar os métodos que fazem as alterações no banco de dados, e esses métodos são utilizados pelos serviços, de acordo com as suas necessidades.

Então para utilizarmos esses repositórios no nosso serviço, vamos precisar cria-los, e para isso vamos criar dentro da pasta “typeorm” do produto, a nossa pasta de repositórios e o repositório dos produtos:

```jsx
// ProductsRepository.ts
import { getRepository, Repository } from "typeorm";
import Product from "../entities/Product";

interface ICreateProductDTO {
  name: string;
  description: string;
}

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({ name, description }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description
    });

    await this.ormRepository.save(product);

    return product;
  }
}

export default ProductsRepository;
```

Nesse arquivo criamos uma classe para o repositório, utilizamos a função “getRepository” para chamar os métodos padrões do typeorm na manipulação de uma tabela, e depois utilizamos esses métodos para criar os nossos próprios, como o “create” no exemplo acima. Repare que o typeorm tem um método para instanciar a criação da entidade (create), e outro método para realmente salvar a entidade no banco (save).

Ficando as pastas da seguinte maneira:

![Estrutura de pastas da aplicação](assets/img/node-typeorm2.png "Estrutura de pastas da aplicação")

Uma boa prática também, é utilizar pastas e arquivos separados para as interfaces que criamos no repositório, pois por se tratar de interfaces, podem se tornar grandes arquivos de tipagem e com muita informação, desta forma você poderia organizar da seguinte maneira, separando as interfaces:

![Estrutura de pastas da aplicação](assets/img/node-typeorm3.png "Estrutura de pastas da aplicação")

Agora precisamos importar o nosso repositório no nosso serviço, mas qual seria a melhor maneira de fazer isso, seria apenas importando normalmente?

Depois de algum tempo importando e instanciando classes e mais classes, você vai perceber que não compensa, e que o código vai começar a fica meio poluído, e que principalmente, se você precisar testar esses serviços depois, você vai ter problemas, pois não vai ser tão simples mockar esses repositórios, mas para resolver isso é simples, bastar usarmos injeção de dependências, e para isso, vamos instalar a biblioteca tsyringe:

```jsx
yarn add tsyringe
```

<https://github.com/microsoft/tsyringe>

Agora vamos criar um novo arquivo para registrar nossas dependências, mas como esse arquivo vai conter vários repositories diferentes, vamos criar uma pasta separada para armazená-lo:

```jsx
// src/shared/container/index.ts
import { container } from 'tsyringe'

import ProductsRepository from '../../modules/products/infra/typeorm/repositories/ProductsRepository'
import IProductsRepository from '../../modules/products/repositories/IProductsRepository'

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
	ProductsRepository
)
```

O tsyringe criar esse “container” e injeta as instancias do nosso repositório nele, e depois, basta apenas usar o tsyringe para injetar essas mesmas dependências seja no nosso service, ou nos nossos controllers, como vamos ver a seguir.

Uma última configuração que precisamos fazer é no nosso server.ts, para que também o nosso server possa ter acesso ao container das nossas dependências:

```jsx
// server.ts
import 'reflect-metadata';
import express from 'express';
import './database';
import './shared/container'
...
```

Voltando ao nosso serviço, agora podemos injetar o nosso repositório, e chamar o método create do nosso repositório, para criar um produto no BD:

```jsx
import { inject, injectable } from "tsyringe";
import Product from "../infra/typeorm/entities/Product";
import IProductsRepository from "../repositories/IProductsRepository";

type IRequest = {
  name: string;
  description: string;
}

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      description
    });

    return product;
  }
}
```

Para injetar a dependência basta apenas utilizar os decorators “injectable” e “inject”.

A parte interessante da injeção de dependências, é que podemos injetar vários repositórios diferentes e utilizá-los no nosso serviço de maneira muito simples e fácil. E também, podemos instanciar qualquer outro repositório no nosso service de maneira manual, sobrepondo o repositório injetado pelo tsyringe, e isso facilita **muito** para fazer os testes dos nossos serviços, pois podemos criar um repositório fake, e simplesmente “injetá-lo” ou instanciá-lo, de modo manual nos nossos testes.

## Controllers

Agora finalmente chegamos aos controllers, dentro da pasta de infra, vamos criar uma pasta para os controllers e uma para as rotas, e vamos criar o controller do nosso produto:

![Estrutura de pastas da aplicação](assets/img/node-typeorm4.png "Estrutura de pastas da aplicação")

```jsx
// ProductsController.ts
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductService } from "../../../services/CreateProductService";

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      description
    });

    return response.json(product);
  }
}
```

Note que usamos o tsyringe para instanciar o service de criação de produtos e injetar as dependências, depois só executamos o serviço normalmente.

## Routes

Vamos criar uma nova pasta no shared, que irá agrupar as rotas de cada um dos nossos módulos, e depois vamos criar um arquivo chamado “products.routes.ts” dentro da pasta de rotas do nosso produto, criando um router dentro do produto, e depois exportando ele para as rotas dentro da pasta shared.

```jsx
// products.routes.ts
import { Router } from "express";
import ProductsController from "../controllers/ProductsController";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post("/", productsController.create);

export default productsRouter;
```

```jsx
// shared/routes/index.ts
import { Router } from "express";
import productsRouter from "../../modules/products/infra/http/routes/products.routes";

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
```

E depois importar as nossas rotas no nosso server.ts:

```jsx
// server.ts
import 'reflect-metadata';
import express from 'express';
import './database';
import './shared/container'
import routes from './shared/routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000, () => {
  console.log('listening on port 3000');
})
```

Ficando assim nossa estrutura final:

![Estrutura de pastas da aplicação](assets/img/node-typeorm5.png "Estrutura de pastas da aplicação")

Se tudo estiver certo, vamos fazer uma requisição do tipo post em http://localhost:3333 e teremos um produto criado:

![Requisição de post na aplicação](assets/img/node-typeorm6.png "Requisição de post na aplicação")

## Conclusão

Pode parecer que fizemos uma volta gigantesca para fazer uma simples requisição de post, mas lembrando, esse artigo não é para te ensinar a fazer um CRUD, ou uma simples requisição, é para você entender como estruturar um projeto de node, que mesmo sendo um monolito, ou seja, todo o backend apenas em lugar, ainda assim consegue sem bem arquitetado, com as entidades bem separadas, de forma que é fácil expandir e dar manutenção em toda a estrutura. Se você tem alguma dúvida ou sugestão, não deixe de comentar aqui embaixo, até a próxima.😉