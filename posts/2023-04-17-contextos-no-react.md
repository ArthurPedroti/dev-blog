---
title: Contextos no React
description: Entendendo contextos com um exemplo simples e fácil
date: 2023-04-17 04:26:00
image: assets/img/contextos-no-react.png
category: react
background: "#61dafb"
---
## Introdução

E aí pessoal, hoje vamos entender de uma maneira simples como podemos usar a API de Contexto do React. Há alguns anos, à medida que a complexidade das aplicações React aumentava, os desenvolvedores perceberam a necessidade de criar uma maneira melhor de compartilhar estados e funções no React, em vez de usar parâmetros e mais parâmetros, causando problemas como *prop drilling*.

Naquela época, os desenvolvedores precisavam criar muitas bibliotecas para contornar esse problema, e essas bibliotecas eram chamadas de bibliotecas de gerenciamento de estado, sendo a mais famosa o Redux, que se tornou um conhecimento básico exigido para todos os desenvolvedores do React.

Mas depois disso, a própria equipe do React começou a desenvolver suas próprias ferramentas para lidar com o gerenciamento de estado e compartilhamento no React, e a API de Contexto do React nasceu.

Então, vamos construir um exemplo simples, mas completo, para entender o poder dos contextos e como eles compartilham tudo o que você quiser com seus componentes e páginas do React.

Versão no YouTube: [Um simples exemplo de como usar a API de contexto do React - YouTube](https://www.youtube.com/watch?v=Kq_8b5hTfhI)

## Criando seu primeiro Contexto

Criar um contexto no React é simples assim:

```jsx
// CounterContext.tsx

import { createContext } from 'react'

export const CounterContext = createContext({})
```

Você pode fazer isso dentro do seu componente ou em um arquivo separado. Eu costumo separar meus contextos dos componentes para manter meus componentes originais limpos e isolados da lógica do contexto.

O próximo passo é criar nosso **Provedor (Provider)** de contexto. O provedor é um componente que envolve todos os outros componentes que você deseja compartilhar os estados. Em outras palavras, o provedor é como uma tag HTML que está aberta e fechada, e todos os componentes que estão dentro desta tag podem acessar os dados compartilhados pelo contexto.

```jsx
 CounterContext.tsx

import { createContext, ReactNode } from 'react'

// Tipos do Provider Context
interface CounterContextProviderProps {
  children: ReactNode
}

export const CounterContext = createContext({})

// Provider Context
export function CounterContextProvider({ children }: CounterContextProviderProps) {
  return <CounterContext.Provider value={{}}>{children}</CounterContext.Provider>
}
```

Agora podemos criar um componente para chamar o provider e envolver os outros componentes que desejam consumir o estado compartilhado:

```jsx
// App.tsx

import { Component01 } from "./Component01"
import { Component02 } from "./Component02"
import { CounterContextProvider } from "./CounterContext"

function App() {
  return (
    <CounterContextProvider>
      <Component01 />
      <Component02 />
    </CounterContextProvider>
  )
}

export default App
```

Você também pode compartilhar os estados com toda a aplicação, para fazer isso, é preciso colocar o provider no componente principal que renderiza a aplicação:

```jsx
// main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CounterContextProvider } from './CounterContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CounterContextProvider>
      <App />
    </CounterContextProvider>
  </React.StrictMode>,
)
```

## Compartilhando nosso primeiro estado

Como eu disse, a principal característica do contexto é compartilhar informações com vários componentes. Para exemplificar isso, criaremos um estado no React e o compartilharemos com nossos componentes.

Um pequeno truque nos tipos é que precisamos typar todas as coisas que passamos para nossos componentes por meio do contexto, e a função "set" do useState tem um tipo um pouco complicado, então sobrescreveremos essa função criando uma função mais simples que chama essa função.

```jsx
// CounterContext.tsx

import { ReactNode, createContext, useState } from "react";

interface CounterContextProviderProps {
  children: ReactNode
}

interface CounterContextProps {
  counter: number
  setContextCounter: (counter: number) => void
}

export const CounterContext = createContext({} as CounterContextProps)

export function CounterContextProvider({ children }: CounterContextProviderProps) {
  const [counter, setCounter] = useState(0)

  function setContextCounter(counter: number) {
    setCounter(counter)
  }

  return (
    <CounterContext.Provider value={{ counter, setContextCounter }}>
      {children}
    </CounterContext.Provider>
  )
}
```

## Usando os estados e funções compartilhados

Para usar todas as informações que nossos contextos fornecem, precisamos usar um hook do react chamado useContext e teremos acesso a todas as informações do nosso contexto:

```jsx
// component01.tsx

import { useContext } from "react"
import { CounterContext } from "./CounterContext"

export const Component01 = () => {
  const { counter, setContextCounter } = useContext(CounterContext)

  return (
    <div>
      <h1>Componente 01</h1>
      <h2>Contador: {counter}</h2>
      <button onClick={() => setContextCounter(counter + 1)}>Adicionar +1</button>
    </div>
  )
}
```

```jsx
// component02.tsx

import { useContext } from "react"
import { CounterContext } from "./CounterContext"

export const Component02 = () => {
  const { counter, setContextCounter } = useContext(CounterContext)

  return (
    <div>
      <h1>Componente 02</h1>
      <h2>Contador: {counter}</h2>
      <button onClick={() => setContextCounter(counter + 1)}>Adicionar +1</button>
    </div>
  )
}
```

Se você clicar em qualquer um dos botões, verá que os dois contadores são atualizados ao mesmo tempo, estamos compartilhando nossos estados!

## Conclusão

Você pode criar quantos estados e funções quiser compartilhar, de contadores simples a objetos mais complexos com diversas informações e funções para manipulá-los. Use esta documentação como a configuração inicial de seus contextos e use sua imaginação para melhorar ainda mais!

Se tiver alguma dúvida ou sugestão, não hesite em comentar abaixo. Até a próxima. 😉