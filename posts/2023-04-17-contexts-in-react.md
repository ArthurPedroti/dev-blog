---
title: Contexts in React
description: Understanding contexts with a simple example
date: 2023-04-17 02:37:17
image: assets/img/contexts-in-react.png
category: react
background: "#61dafb"
---
## Introduction

Hey guys, today we are going to understand in a simple way, how we can use the React Context API. A few years ago, as the complexity of React applications increased, developers realized the need for a better way to share states and functions in React instead of using params and more params, causing issues like prop drilling.

At that time, developers needed to create many libraries to work around this problem, and these libraries were called state management libraries, the most famous being Redux, which made it a basic knowledge required for all React developers.

But after that, the React team itself started to develop its own React tools to handle state management and sharing in React, and the React Context API was born.

So let’s build a simple but complete example to understand the power of contexts, and how they share everything you want with your React components and pages.

Youtube Version: [A simple example of how to use React's Context API - YouTube](https://www.youtube.com/watch?v=o0O3MRKzotg)


## Creating your first Context

Creating a context in React is simple like that:

```jsx
// CounterContext.tsx

import { createContext } from 'react'

export const CounterContext = createContext({})
```

You can do that inside your component or in a separate file. I’m used to separating my contexts from the components to keep my original components clean and isolated from context logic.

The next step is to create our context Provider, the provider is a component that involves all the other components that you want to share the states. In other words, the provider is like an html tag that’s open and close, and all components that are inside this tag can access the data shared by the context.

```jsx
// CounterContext.tsx

import { createContext, ReactNode } from 'react'

// Provider Context Types
interface CounterContextProviderProps {
  children: ReactNode
}

export const CounterContext = createContext({})

// Provider Context
export function CounterContextProvider({ children }: CounterContextProviderProps) {
  return <CounterContext.Provider value={{}}>{children}</CounterContext.Provider>
}
```

Now, we can create a component to call the context provider and involve the other components that want to consume the shared state:

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

You can also share the states with the entire application, to do this, you need to put the provider in the main component that renders the application:

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

## Sharing our first state

As I said, the main feature of context is sharing information with many components, to exemplify this, we will create a React state and share it with our components.

A little trick on types, is that we need to type all things we pass to our components through the context, and the "set function" of the useState has a little complicated type, so we will overwrite this function creating a more simple function that calls it.

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

## Using the shared states and function

To use all information that our contexts provide, we need to use a react hook called useContext, and we will have access to all information of our context:

```jsx
// component01.tsx

import { useContext } from "react"
import { CounterContext } from "./CounterContext"

export const Component01 = () => {
  const { counter, setContextCounter } = useContext(CounterContext)

  return (
    <div>
      <h1>Component 01</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={() => setContextCounter(counter + 1)}>Add +1</button>
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
      <h1>Component 02</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={() => setContextCounter(counter + 1)}>Add +1</button>
    </div>
  )
}
```

If you click on any of the buttons you will see the two counter updates at the same time, we are sharing your states!

## Conclusion

You can create how many states and functions you want to share, from simple counters to more complex objects with diverse information and functions to handle them. Use this documentation like the initial setup of your contexts and use your imagination to improve even more!

If you have any questions or suggestions, don't hesitate to comment below, until next time.😉