---
title: Mocando e testando bibliotecas/funções com React Testing Library e Jest
description: Como mockar e testar bibliotecas e funções em nossas aplicações Javascript
date: 2022-10-25 06:47:27
image: assets/img/mocando-e-testando-bibliotecasfuncoes-com-react-testing-library-e-jest.png
category: js
background: "#D6BA32"
---
## Introdução

Muitas vezes precisamos mockar algumas funções e bibliotecas em nossas aplicações, e na maioria das vezes, precisamos pesquisar no StackOverflow porque mais uma biblioteca não funciona no nosso modo “padrão” de mockar funções.

Então, se quiser parar de ir ao StackOverflow para saber como posso mockar esta ou aquela biblioteca, veja abaixo as maneiras mais simples de contornar qualquer biblioteca que você queira mockar👇

## Testando funções quando são um parâmetro de componente

A primeira ferramenta que temos para simular funções no Jest é a função **jest.fn()**, e isso basicamente cria uma função que não faz nada, e o mais importante, você pode rastrear o que acontece com ela.

Para fazer isso, vamos criar uma função jest.fn() e usar o método expect chamado **toHaveBeenCalledWith()** para testar **com quais** parâmetros esta função foi chamada.

```jsx
// test.tsx
it('should be possible to filter', async () => {
  const handleFilter = jest.fn()

  render(
    <FilterModal
      handleFilter={handleFilter}
    />
  )

	// here you can do the logic of our component

  fireEvent.click(button) // the event that trigger the function

  await waitFor(() =>
    expect(handleFilter).toHaveBeenCalledWith([
      {
        id: 'number',
        value: '011'
      },
      {
        id: 'provider',
        value: 'Arthur'
      }
		])
  })
```

A ideia desse tipo de teste é testar literalmente o parâmetro das funções, pois nesse componente a lógica da função não está dentro dela, então o que esse componente faz é escolher quais os parametros que serão executados nessa função, e testamos se a nossa função foi chamada com esses respectivos parametros.

## Testando funções quando não são um parâmetro de componente

Como no exemplo acima, neste caso continuamos testando o parâmetro que nossa função foi chamada. Mas você não pode facilmente mockar essa função com jest.fn, porque não é mais um parâmetro.

Então, para isso, usaremos outra função, chamada **spyOn**. Essa função substitui a função importada para seu componente com uma função como o jest.fn, e podemos rastrear quais parâmetros essa função foi chamada para testá-la.

Temos que importar a função que vamos espionar no teste também, para o teste conseguir entender o que estamos mockando.

```jsx
// test.tsx
import { api } from 'services/api'
import { render, fireEvent, waitFor } from '@testing-library/react'

  it('should be possible to edit', async () => {
    const spyApi = jest.spyOn(api, 'put') // the function that we want to mock/spy
    render(
      <EditForm />
    )

	// here you can do the logic of our component

  fireEvent.click(button) // the event that trigger the function

    await waitFor(() =>
      expect(spyApi).toHaveBeenCalledWith('order', {
        id: 1,
        observation: 'Lorem ipsum',
				partNumber: '0001',
				qty: 3
      })
    )
  })
```

Observe que estamos usando a função waitFor, pois a chamada da função spyOn é assíncrona, então temos que usar async/await para aguardar a chamada da função.

## Mocando o comportamento de funções de biblioteca

O terceiro caso de uso do qual estamos falando é quando precisamos mockar um comportamento específico da biblioteca. Para isso, usaremos o spyOn novamente, mas adicionando um método que implementa um comportamento específico dessa função.

Em outras palavras, como no exemplo anterior, ao invés de “rastrear” a função usando jest.fn, vamos simular e forçar um comportamento específico para essa função.

```jsx
// test.tsx
it('should render the name', () => {
  jest
    .spyOn(require('@third-party-library'), 'useBreakpointValue')
    .mockImplementationOnce(() => false)

  render(<Header name="Arthur" />)

	// the text only show if the return of the library function is false

  expect(screen.getByText(/Arthur/i)).toBeInTheDocument()
})
```

Às vezes, teremos os seguintes erros fazendo isso:

- “yourFunction” is not declared configurable
- TypeError: Cannot redefine property: “yourFunction”

Esses erros acontecem porque quando o jest mocka o comportamento da função, ele não apenas substitui por uma função “qualquer”, ele tenta substituir a função dentro da biblioteca, e por causa disso, às vezes tem uma incompatibilidade de tipos ou o jest não consegue compreender os tipos.

Para resolver isso, precisaremos substituir a função nativa mockando ela. Portanto, quando mockamos essa função, replicaremos o tipo do mock e evitaremos essas incompatibilidades de tipagem.

```jsx
// test.tsx
jest.mock('@third-party-library', () => {
  return {
    ...jest.requireActual('@third-party-library'),
    useBreakpointValue: () => true
  }
})

it('should render the name', () => {
  jest
    .spyOn(require('@third-party-library'), 'useBreakpointValue')
    .mockImplementationOnce(() => false)

  render(<Header name="Arthur" />)

	// the text only show if the return of the library function is false

  expect(screen.getByText(/Arthur/i)).toBeInTheDocument()
})
```

Também podemos mockar o comportamento de uma função de biblioteca e rastrear esta função com jest.fn():

```jsx
// test.tsx
jest.mock('@third-party-library', () => {
  return {
    ...jest.requireActual('@third-party-library'),
    useToast: () => jest.fn()
  }
})

it('should render a toast at login', async () => {
	const toast = jest.fn()
  jest
    .spyOn(require('@third-party-library'), 'useToast')
    .mockImplementationOnce(() => toast)

  render(<Login />)

	// here you can do the logic of our component

	await waitFor(() =>  
		expect(toast).toHaveBeenCalledWith({
	    title: 'Success',
	    duration: 2000
	  })
	)
})
```

## Mockando erros em funções

O último caso de uso é simular e forçar erros em nossas funções, para testar o comportamento de nossos componentes quando temos esses erros.

Usaremos o último exemplo para simular um erro no login, então passaremos uma função signIn para nosso componente e implementaremos um erro nessa função:

```jsx
// test.tsx
jest.mock('@third-party-library', () => {
  return {
    ...jest.requireActual('@third-party-library'),
    useToast: () => jest.fn()
  }
})

it('should render a toast at login', async () => {
	const toast = jest.fn()
  jest
    .spyOn(require('@third-party-library'), 'useToast')
    .mockImplementationOnce(() => toast)

  const signIn = jest.fn().mockImplementation(() => {
    throw new Error('Something went wrong')
  })

  render(
    <Login handleLogin={signIn} />
  )

	// here you can do the logic of our component

  fireEvent.click(button) // the event that trigger the function

	expect(signIn).toThrowError('Something went wrong')
	await waitFor(() =>  
		expect(toast).toHaveBeenCalledWith({
	    title: 'Login Error',
	    duration: 2000
	  })
	)
})
```

Observe que também podemos testar se o signIn está realmente lançando o erro que implementamos na simulação, e em seguida testar o comportamento do componente nesse erro.

## Conclusão

Esses são os casos de uso do meu dia a dia, espero que possa ser útil para você e que se encaixe em um dos seus casos de uso. Se você quiser contribuir com outras abordagens e casos de uso, ou mesmo outras formas de fazer essas mesmas coisas, sinta-se à vontade para comentar abaixo e compartilhar suas dicas, até logo!😉