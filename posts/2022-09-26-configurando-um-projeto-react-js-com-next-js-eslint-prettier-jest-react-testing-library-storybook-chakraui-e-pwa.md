---
title: "Configurando um projeto React.js com Next.js, ESLint/Prettier,
  Jest/React Testing Library, Storybook, ChakraUI e PWA "
description: Aprenda a realizar todas as configurações para utilizar essa stack
  fantástica para o seu frontend
date: 2022-09-26 09:41:07
image: assets/img/configurando-um-projeto-react.js-com-next.js-eslintprettier-jestreact-testing-library-storybook-chakraui-e-pwa.png
category: react
background: "#61dafb"
---
Aprenda a realizar todas as configurações para utilizar essa stack fantástica para o seu frontend

*Texto e ortografia revisados:* 

## Introdução

Conforme vamos adicionando algumas ferramentas ao nosso projeto, precisamos sempre verificar como as diferentes stacks e ferramentas que utilizamos interagem entre si, e se estas possuem integração. Conforme as bibliotecas vão atualizando, essas integrações também vão mudando e precisamos revisar e ir alterando as bases do nosso projeto. Esse post é uma documentação das configurações iniciais do meu boilerplate para meus projetos atuais de frontend, que revisarei conforme as atualizações forem surgindo ao longo do tempo.

Quer aprender a configurar do zero um projeto em Next.js, com ESLint/Prettier para correção do seu código, Jest/React Testing Library para testes, Storybook e ChakraUI para prototipação e estilização, e a configuração para tudo isso funcionar com PWA?

Não vai deixar de conferir, né? Então dá uma olhada abaixo para o post na íntegra👇

## Pré-requisitos

Adicionar as seguintes extensões ao seu VsCode:

* **EditorConfig for VS Code**
* **ESLint**
* **Prettier - Code formatter**

## Instalando o Next.js

Primeiramente vamos estar começando o nosso projeto com o Next.js em Typescript, executando o comando abaixo, será perguntando o nome do proejto, e será criado a pasta com o nosso projeto em Next.js:

```jsx
yarn create next-app --typescript
```

Agora vamos criar uma pasta “src” e mover a pasta “pages” e “styles” para dentro dela. Deletar os arquivos dentro da pasta “styles” e deletar a pasta ”api” dentro da pasta pages, remover a importação dos estilos no _app.tsx e limpar o index.tsx, ficando tudo da seguinte forma:

![Estrutura de pastas](assets/img/next-boilerplate-01.png "Estrutura de pastas")

```jsx
// src/pages/_app.tsx
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
```

```jsx
// src/pages/index.tsx
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Next.js Boilerplate</h1>
    </div>
  )
}

export default Home
```

Um configuração opcional, mas que eu gosto de fazer, é colocar a propriedade **baseURL** no tsconfig.json, para evitar ter que ficar escrevendo “src” em todas as importacões ao longo da aplicação:

```jsx
// tsconfig.json
"compilerOptions": {
  "baseUrl": "src"
	// ...
}
```

## Instalando o EditorConfig

Algumas regras que eu gosto de configurar, como tamanho da indentação, linha no final do arquivo etc., são configuradas através do EditorConfig, e para isso, basta adicionar o seguinte arquivo de configuração (.editorconfig) na raiz do seu projeto:

```jsx
// .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

Ao clicar com o botão direito do mouse na raiz do seu projeto, também é possível acessar a opção abaixo e gerar este arquivo automaticamente:

![Atalho EditorConfig](assets/img/next-boilerplate-02.png "Atalho EditorConfig")

## Instalando o ESLint

O ESLint já vem instalado por padrão na instalação do Next, então podemos passar direto para a configuração dos plugins.

### React-hooks

Esse plugin serve para que o lint consiga entender da maneira correta os hooks do React.

Basicamente instalamos o plugin e adicionamos as configurações abaixo ao nosso eslintrc.json:

```jsx
yarn add eslint-plugin-react-hooks --dev
```

```jsx
// eslintrc.json
{
  "extends": "next/core-web-vitals",
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

[eslint-plugin-react-hooks - npm (npmjs.com)](https://www.npmjs.com/package/eslint-plugin-react-hooks)

### Permitindo a inferência do TypeScript

O Typescript consegue inferir vários tipos enquanto estamos codando, mas se não desativarmos essa regra, ele vai pedir para que typemos mesmo quando o tipo for inferido, e para evitar isso adicionamos a seguinte regra:

```jsx
// .eslintrc.json
{
  "extends": "next/core-web-vitals",
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
```

[typescript-eslint/explicit-module-boundary-types.md at main · typescript-eslint/typescript-eslint (github.com)](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md)

## Instalando o Prettier

Vamos adicionar o pacote do Prettier a nossa aplicação:

```jsx
yarn add --dev --exact prettier
```

As configurações do Prettier dependem de cada pessoa, mas você terá que criar um arquivo “.prettierrc” na raiz do seu projeto, e adicionar as configurações conforme a sua preferência. Segue abaixo as que eu utilizo:

```jsx
// .prettierrc
{
  "trailingComma": "none",
  "semi": false,
  "singleQuote": true,
  "endOfLine": "auto"
}
```

Depois vamos adicionar um plugin para integrar o ESLint com o prettier:

```jsx
yarn add --dev eslint-plugin-prettier eslint-config-prettier
```

E adicionar o plugin ao **extends** na configuração do nosso ESLint:

```jsx
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
```

**Lembre-se!** Qualquer virgula errada no arquivo **eslintrc.json** faz com que pare de funcionar tanto o ESLint quanto o Prettier, então se algo não estiver funcionando, dê uma olhada com atenção no seu arquivo de configuração.

## Instalando o Jest e o React Testing Library

Vamos adicionar os seguintes pacotes abaixo:

```jsx
yarn add --dev @testing-library/jest-dom @testing-library/react @testing-library/user-event jest jest-environment-jsdom
```

Vamos adicionar os seguintes scripts ao nosso package.json, para rodar os nossos testes:

```json
"test": "jest",
"test:watch": "jest --watch",
```

E criar dois arquivos de configuração do Jest (”jest.config.js” e “jest.setup.js”) na raiz do nosso projeto:

```jsx
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.ts(x)?',
    'src/templates/**/*.ts(x)?',
    '!src/**/stories.tsx'
  ]
}

module.exports = createJestConfig(customJestConfig)
```

```jsx
// jest.setup.js
import '@testing-library/jest-dom/extend-expect'
```

O parametro **collectCoverageFrom** indica quais pastas o Jest estará procurando os testes, no exemplo acima, eu coloco os testes dentro das pastas dos componentes e dentro das pastas dos templates, que eu utilizo para construir as minhas páginas, mas fica a seu critério essa configuração.

Se você estiver utilizando a configuração **baseURL** no seu tsconfig, é preciso adicionar uma configuração a mais no seu jest.config.js:



```jsx
// jest.config.js
const customJestConfig = {
	// ...
	modulePaths: ['<rootDir>/src/']
}
```

## Instalando o Storybook

Ao executar o comando abaixo no nosso projeto, o Storybook irá detectar qual é o tipo do nosso projeto e instalará os pacotes e criando os arquivos de configuração:

```jsx
npx storybook init
```

No final da instalação irá perguntar se você deseja instalar o plugin do Storybook para o ESLint (eslintPlugin), pode cancelar essa parte da instalação (digitando “N”).

O Storybook cria uma pasta na raiz do seu projeto com as suas configurações (.storybook), dentro desta pasta, no main.js, vamos configurar o caminho padrão para os nossos stories (propriedade **stories**), e a propriedade **staticDirs**, que indica onde fica localizado os arquivos estáticos da nossa aplicação. O main.js ficará da seguinte forma:

```jsx
// .storybook/main.js
module.exports = {
  staticDirs: ['../public'],
  stories: ['../src/components/**/stories.tsx'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  core: {
    "builder": "@storybook/builder-webpack5"
  }
}
```

Se você estiver utilizando a configuração **baseURL** no seu tsconfig, é preciso adicionar uma configuração a mais no seu main.js:

```jsx
// .storybook/main.js
module.exports = {
// ...
	webpackFinal: (config) => {
	  config.resolve.modules.push(`${process.cwd()}/src`)
	  return config
	}
}
```

Como estamos utilizando o Next.js, existem algumas features que não funcionam automaticamente no Storybook, como o next-router e o next-image, e para isso precisamos de um addon para o Storybook entender essas features, para isso vamos instalar o seguinte pacote:

```jsx
yarn add -D storybook-addon-next
```

E adicionar esse addon ao nosso main.js:

```jsx
// .storybook/main.js
module.exports = {
// ...
	addons: [
		// ...
	  "storybook-addon-next"
	],
//...
}
```

O Storybook tambem cria uma pasta “stories”, dentro da pasta **src**, que podemos deletar.

O Next roda uma versão mais atual do Typescript, que gera alguns avisos devido ao plugin do typescript do Storybook ainda não estar atualizado para essa versão, para evitar esse aviso, você pode regressar a versão do Typescript com o comando abaixo:

```jsx
yarn add -D typescript@4.7.4
```

Atualmente existe o PR para corrigir isso e você pode acompanhar abaixo:

<https://github.com/hipstersmoothie/react-docgen-typescript-plugin/pull/70>

## Instalando o Chakra UI

Agora vamos instalar os pacotes referentes ao Chakra:

Obs: nesse momento eu instalo o pacote “@fontsource/roboto” (no final dessa linha de comando), porque normalmente utilizo a fonte **Roboto** nos meus projetos, mas fica de sua preferência qual fonte você deseja instalar.

```jsx
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion @fontsource/roboto
```

Na nossa pasta de styles, vamos criar um arquivo “theme.ts”:

```jsx
// src/styles/theme.ts
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50'
      },
      option: {
        color: 'gray.900'
      },
      'select option:disabled': {
        color: '#aaa'
      },
      input: {
        colorScheme: 'dark'
      }
    }
  }
})
```

E no _app.tsx, vamos adicionar o contexto do Chakra, que é uma componente que fica por volta da nossa aplicação para fazer o Chakra funcionar, juntamente com o nosso tema, e as fontes que iremos utilizar. Ficando o arquivo da seguinte forma:

```jsx
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
```

Agora vamos integrar o Chakra com o Storybook instalando o seguinte pacote:

```jsx
yarn add -D @chakra-ui/storybook-addon
```

No main.js do storybook vamos adicionar o addon do Chakra e a propriedade **features**, ficando da seguinte forma:

```jsx
// .storybook/main.js
module.exports = {
  staticDirs: ['../public'],
  stories: ['../src/components/**/stories.tsx'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chakra-ui/storybook-addon"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  features: {
    emotionAlias: false,
  }
}
```

Nesta configuração, o local onde ficará as nossas stories é dentro da pasta de cada componente, e os componentes ficarão dentro da pasta “src/components”, mas você pode configurar o caminho da melhor forma que preferir na propriedade **stories**. Importante lembrar, que para executar o Storybook é necessário que essa pasta esteja criada, mesmo que vazia.

Se quiser remover os **stories** que o próprio Chakra adiciona ao seu Storybook por padrão, adicione a seguinte configuração ao main.js:

![Seção do Chakra no Storybook](assets/img/next-boilerplate-05.png "Seção do Chakra no Storybook")

```jsx
// .storybook/main.js
module.exports = {
  ...
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  },
}
```

E no preview.js vamos adicionar as fontes e a propriedade **chakra** para injetar o nosso tema no Storybook:

```jsx
import { theme } from '../src/styles/theme'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme,
  },
}
```

## Configurando o PWA

Para configurar o PWA, vamos adicionar o pacote abaixo:

```jsx
yarn add next-pwa
```

E ajustar as configurações do nosso next.config.js, localizado na raiz do nosso projeto:

```jsx
// next.config.js

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !isProd
})

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true
})
```

## Automatizando a criação de componentes

Um pacote extra que fica a seu critério utilizar, é o Plop, que eu utilizo para gerar os meus componentes já em uma pasta, com um index, testes e stories padrões já criados.

Para isso, vamos instalar o seguinte pacote:

```jsx
yarn add -D plop
```

Adicionar o seguinte script ao nosso package.json:

```json
"generate": "yarn plop --plopfile generators/plopfile.js",
```

E agora vamos criar a seguinte estrutura de pastas:

![Estrutura de pastas](assets/img/next-boilerplate-03.png "Estrutura de pastas")

E seguem as configurações dos arquivos:

```jsx
// plopfile.js
module.exports = (plop) => {
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
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/Component.tsx.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/stories.tsx',
        templateFile: 'templates/stories.tsx.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/test.tsx',
        templateFile: 'templates/test.tsx.hbs'
      }
    ]
  })
}
```

```jsx
// Component.tsx.hbs
import { Heading } from '@chakra-ui/react'

const {{pascalCase name}} = () => <Heading>{{pascalCase name}}</Heading>

export default {{pascalCase name}}
```

```jsx
// stories.tsx.hbs
import { ComponentStory, ComponentMeta } from '@storybook/react'
import {{pascalCase name}} from '.'

export default {
  title: '{{pascalCase name}}',
  component: {{pascalCase name}}
} as ComponentMeta<typeof {{pascalCase name}}>

export const Default: ComponentStory<typeof {{pascalCase name}}> = () => <{{pascalCase name}} />
```

```jsx
// test.tsx.hbs
import { render, screen } from '@testing-library/react'

import {{pascalCase name}} from '.'

describe('<{{pascalCase name}} />', () => {
  it('should render the heading', () => {
    render(<{{pascalCase name}} />)

    expect(screen.getByRole('heading', { name: /{{pascalCase name}}/i })).toBeInTheDocument()
  })
})
```

Agora ao digitar o comando:

```jsx
yarn generate Button
```

Ele automaticamente cria na pasta de componentes, uma pasta com os seguintes arquivos:

![Estrutura de pastas](assets/img/next-boilerplate-04.png "Estrutura de pastas")

Se quiser entender melhor como o Plop funciona, dê uma olhada no post que eu fiz sobre:

[Automatizando a criação de componentes no React | Arthur Pedroti](https://dev.arthurpedroti.com.br/automatizando-a-criacao-de-componentes-no-react/)

## Configurações do VsCode

Ao usar o VsCode, podemos criar uma pasta com algumas configurações para que o nosso VsCode rode o “fix” do ESLint com o Prettier ao salvarmos cada arquivo:

```jsx
// .vscode/settings.json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

Mas você também pode deixar isso previamente configurado por padrão nas configurações do seu VsCode:

```jsx
// settings.json (VsCode)

//Padronização do Eslint
    "[javascript]": {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      }
    },
    "[javascriptreact]": {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      }
    },
    "[typescript]": {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      }
    },
    "[typescriptreact]": {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
```

## Conclusão

Agora já temos tudo configurado e funcionando, o intuito desse artigo é só para ter um passo a passo simples e fácil, para todas as vezes que precisarmos iniciar um novo projeto, não tenhamos que pesquisar em cada documentação sobre como configurar cada etapa. Se você tem alguma dúvida ou sugestão, não deixe de comentar aqui embaixo, até a próxima.😉