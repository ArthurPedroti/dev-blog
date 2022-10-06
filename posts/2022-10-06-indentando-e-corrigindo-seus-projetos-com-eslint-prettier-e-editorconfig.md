---
title: Indentando e corrigindo seus projetos com ESLint, Prettier e EditorConfig
description: Como configurar as ferramentas ESLint, Prettier e EditorConfig em
  seus projetos Javascript e Typescript, tanto no frontend (React.js), quanto no
  backend (Node.js)
date: 2022-10-06 08:16:23
image: assets/img/indentando-e-corrigindo-seus-projetos-com-eslint-prettier-e-editorconfig.png
category: js
background: "#D6BA32"
---
## Introdução

Ter ferramentas para te ajudar  a indentar e corrigir o meu código são fundamentais para acelerar e evitar erros no seu desenvolvimento, nesse post eu escrevi um passo a passo com todos os detalhes de como instalar de forma simples e rápida o ESLint, Prettier e EditorConfig em qualquer projeto React.js e Node.js, tanto em  Javascript quanto em Typescript.

Não vai deixar de conferir, né? Então dá uma olhada abaixo para o post na íntegra👇

## Pré-requisitos

Adicionar as seguintes extensões ao seu VsCode:

* **EditorConfig for VS Code**
* **ESLint**
* **Prettier - Code formatter**

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

![Gerando configuração do Editor Config](assets/img/next-boilerplate-02.png "Configuração do Editor Config")

## Instalando o ESLint

Execute o comando:

```jsx
npx eslint --init
```

Escolha as seguintes opções:

* Digite “y”caso ele diga que precisa instalar o pacote “@eslint/create-config”
* Selecione: To check syntax and find problems
* Selecione: JavaScript modules (import/export)
* “React” se for no frontend e “None” se for no backend
* “Yes” se estiver utilizando Typescript e “No” se estiver utilizando Javascript
* Browser se for no frontend e Node se for no backend (utilize a tecla “espaço” para selecionar e deselecionar as opções)
* JSON (ou o formato que você preferir)
* “Yes” e em seguida escolha o gerenciador de pacotes da sua preferência

## Plugins e Rules para o ESLint

### React-hooks

Esse plugin serve para que o lint consiga entender da maneira correta os hooks do React.

Basicamente instalamos o plugin e adicionamos as configurações abaixo ao nosso eslintrc.json:

```jsx
yarn add eslint-plugin-react-hooks --dev
```

```jsx
// eslintrc.json
"plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
```

[eslint-plugin-react-hooks - npm (npmjs.com)](https://www.npmjs.com/package/eslint-plugin-react-hooks)

### Desativar o prop-types

Caso esteja utilizando o Typescript, é importante desativarmos os props types, para que o React não fique pedindo para criar os prop-types o tempo todo:

```jsx
// eslintrc.json
"rules": {
	// ...
  "react/prop-types": "off"
}
```

[eslint-plugin-react/prop-types.md at master · yannickcr/eslint-plugin-react (github.com)](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md)

### Desativar React in JSX Scope

Se você estiver usando o Next ou as novas versões do React, você não vai precisar ficar importando o React em todos os seus componentes, e para desativar isso, basta aplicar a seguinte regra:

```jsx
// eslintrc.json
"rules": {
	// ...
  "react/react-in-jsx-scope": "off"
}
```

[eslint-plugin-react/react-in-jsx-scope.md at master · yannickcr/eslint-plugin-react (github.com)](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md)

### Permitindo a inferência do TypeScript

O Typescript consegue inferir vários tipos enquanto estamos codando, mas se não desativarmos essa regra, ele vai pedir para que typemos mesmo quando o tipo for inferido, e para evitar isso adicionamos a seguinte regra:

```jsx
// eslintrc.json
"rules": {
	// ...
  "@typescript-eslint/explicit-module-boundary-types": "off"
}
```

[typescript-eslint/explicit-module-boundary-types.md at main · typescript-eslint/typescript-eslint (github.com)](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md)

### Configurando a versão do React

O ESLint pode precisar da versão do React do seu projeto para algumas regras, e para isso basta adicionar a seguinte configuração:

```jsx
// eslintrc.json
"settings": {
    "react": {
        "version": "detect"
    }
},
```

E se você também quiser, para facilitar a verificação do lint, você pode estar criando um script para o seu projeto:

```jsx
// package.json
"lint": "eslint src"
```

## Instalando o Prettier

Execute o comando abaixo:

```jsx
yarn add --dev --exact prettier
```

As configurações do Prettier dependem de cada pessoa, mas você terá que criar um arquivo “.prettierrc” na raiz do seu projeto, e adicionar as suas configurações:

```jsx
// .prettierrc
{
  "trailingComma": "none",
  "semi": false,
  "singleQuote": true,
  "endOfLine": "auto"
}
```

Depois vamos adicionar um plugin para integrar o ESLint com o Prettier:

```jsx
yarn add --dev eslint-plugin-prettier eslint-config-prettier
```

E adicionar a seguinte configuração no nosso ESLint:

```jsx
// eslintrc.json
"extends": [
    // ...
    "plugin:prettier/recommended"
],
```

**Lembre-se!** Qualquer virgula errada no arquivo do eslintrc faz com que pare de funcionar tanto o ESLint quanto o Prettier, então se algo não estiver funcionando, dê uma olhada com atenção no seu arquivo de configuração.

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

//AutoLint on Save from Eslint
"editor.formatOnSave": false,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```

## Conclusão

Agora já temos tudo configurado e funcionando! O intuito desse artigo é ter um passo a passo simples e fácil, para que todas as vezes que precisarmos configurar ou iniciar um novo projeto, não tenhamos que consultar várias e várias documentações diferentes. Se você tem alguma dúvida ou sugestão, não deixe de comentar aqui embaixo, até a próxima.😉