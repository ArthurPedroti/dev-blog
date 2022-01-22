---
title: Automatizando a criação de componentes no React
description: Como criar toda a estrutura de um componente usando apenas uma linha de comando
date: 2022-01-22 09:46:58
image: assets/img/plop_thumb.jpg
category: dev
background: "#637a91"
---
## Introdução

Quantas vezes você já precisou criar uma pasta para um componente, depois um index.js, escrever os imports, o componente básico, depois criar um styles.js, importar o styled-components, e tantas outros códigos como testes, storybook, etc?

Nesse post vou mostrar como é possível criar tudo isso com um nome variável, e com apenas uma linha de comando!

## O que é o Plop?

O Plop é uma ferramenta que utiliza arquivos de templates (handlebars), para a criação automática de vários arquivos padrões no seu projeto, alterando somente as partes variáveis que **você mesmo** define.

## Utilizando o plop

No site oficial do plop (<https://plopjs.com/>), temos já um arquivo padrão que vamos usar para começar, mas antes de mais nada, vamos instalar o Plop no nosso projeto:

```jsx
yarn add -D plop
```

Agora iremos criar uma pasta chamada "generators" (que eu prefiro criar fora do meu src), para adicionar as configs e os templates do plop.

E nela já vamos criar nosso arquivo de configuração:

![Pasta "generators" com "plopfile.js"](assets/img/plop01.png "Pasta \"generators\" com \"plopfile.js\"")

Segue uma breve explicação de cada parte do código:

![Arquivo de configuração inicial do plop](assets/img/plop02.png "Arquivo de configuração inicial do plop")

Agora vamos ajustar um pouco, simulando a criação da pasta de um componente, com um arquivo index.js:

```jsx
// plopfile.js
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.js',
        templateFile: 'templates/index.js.hbs'
      }
    ]
  })
}
```

Vamos criar uma pasta chamada "templates" dentro da pasta “generators”, e criar o nosso primeiro template "index.js.hbs":

```jsx
// index.js.hbs
import React from 'react'

const {{pascalCase name}} = () => (
  <>
    <h1>{{pascalCase name}}</h1>
  </>
)

export default {{pascalCase name}}
```

Note que estou utilizando o padrão "pascalCase" nas minhas variáveis, e isso também pode ser modificado conforme a documentação:

![Lista de tipos de modificadores de texto](assets/img/plop03.png "Lista de tipos de modificadores de texto")

Basicamente é só colocar o padrão desejado, um espaço, e o nome da variável.

## Gerando nossos primeiros arquivos

Agora vamos testar, criando um novo script no nosso package.json:

```jsx
// package.json
"generate": "yarn plop --plopfile ./generators/plopfile.js"
```

<aside>
💡 O caminho padrão do plopfile.js é a raiz do projeto, porém você pode passar a flag "—plopfile" e especificar onde se encontra o seu arquivo plopfile.js

</aside>

E rodar o script:

```jsx
yarn generate
What is your component name? button
```

E pronto, já está criado, e o "button" também foi adaptado ao pascalCase:

![Pasta "Button" com "index.tsx"](assets/img/plop04.png "Pasta \"Button\" com \"index.tsx\"")

```jsx
// index.js
import React from 'react'

const Button = () => (
  <>
    <h1>Button</h1>
  </>
)

export default Button
```

## Melhorando nosso plopfile

Agora vamos automatizar a criação do nosso styles.js, criando uma nova "action" no nosso arquivo de plopfile.js, um novo template do nosso style.js, e atualizar também o nosso index.js:

```jsx
// plopfile.js
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.js',
        templateFile: 'templates/index.js.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/styles.js',
        templateFile: 'templates/styles.js.hbs'
      }
    ]
  })
}
```

```jsx
// index.js.hbs
import React from 'react'
import * as S from './styles'

const {{pascalCase name}} = () => (
  <S.Wrapper>
    <h1>{{pascalCase name}}</h1>
  </S.Wrapper>
)

export default {{pascalCase name}}
```

```jsx
// styles.js.hbs
import styled from 'styled-components'

export const Wrapper = styled.main``
```

E vamos rodar o nosso script já passando como parâmetro o nome do nosso componente para pular a pergunta:

```jsx
yarn generate button
```

![Pasta "Button" com "index.tsx" e "styles.js"](assets/img/plop05.png "Pasta \"Button\" com \"index.tsx\" e \"styles.js\"")

E pronto! Já temos automatizado a criação dos nossos componentes, utilizando templates padrões, e sem ter que ficar dando vários Ctrl+c Ctrl+v e renomeando variáveis.

## Conclusão

O Plop é uma mini framework de geração de arquivos, e tem muitas mais configurações e possibilidades do que fizemos nesse exemplo, visite o site deles e consulte a documentação para saber mais.

Site oficial: <https://plopjs.com/>
Docs: <https://plopjs.com/documentation/>

Se você tem alguma dúvida ou sugestão, não deixe de comentar aqui em baixo, até a próxima.😉