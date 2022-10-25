---
title: Mocking and Testing Libraries/Functions with React Testing Library and Jest
description: How mock and test libraries and functions in our Javascript applications
date: 2022-10-25 06:43:08
image: assets/img/mocking-and-testing-librariesfunctions-with-react-testing-library-and-jest.png
category: js
background: "#D6BA32"
---
## Introduction

Many times we need to mock some functions and libraries in our applications, and most of the time, we need to search at StackOverflow why another library doesn’t work our “default” way of mock functions.

So, if want to stop to going to StackOverflow to find how can I mock this or that library, see below the simplest ways to workaround any library you want to mock👇

## Testing functions when they are a component param

The first tool we have to mock functions in Jest is the **jest.fn()** function, and this basically creates a function that does nothing, and more important, you can track what happens to it.

To do this, let’s create a jest.fn() function and use the expect method called **toHaveBeenCalledWith()** to test **with which** params this function have been called.

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

The idea of this test is to literally test the param of the functions, because on this type of component, the logic of the function in not inside it, so what this component does is choose which params will be executed in this function, and we test if our function was call with these respective params.

## Testing functions when they are not a component param

Like in the example above, in this case we continue testing the param that our function was called. But you can’t easily mock that function with jest.fn, because it’s not a param anymore.

So, to do that we will use another function, called **spyOn**. This function overwrites the function imported into your component with a function like jest.fn, and we can track which params this function was called to test it.

We have to import the function we are going to spyOn on the test too, for jest understand what we are mocking.

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

Note we are using the waitFor function, because the call of the funcion spyOn is asynchronous, so we have to use async, to await the for the function call.

## Mocking the behavior of our library functions

The third use case we are talking about is when we need to mock a specific behavior of the library. To do this, we will use the spyOn again, but adding a method that implements a specific behavior of this function.

In other words, as in the previous example, instead of “track” the function using jest.fn, we are going to mock and force a specific behavior for the function.

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

Sometimes we will get these errors doing this:

- “yourFunction” is not declared configurable
- TypeError: Cannot redefine property: “yourFunction”

These errors happen because when jest mocks the behavior of the function, it doesn’t only replace with an “any” function, it tries to replace the function inside the library, and because of that, sometimes has a type mismatch or jest may not understand the types.

To solve this, we will need to overwrite the native function mocking this. So when we mock that function, we will replicate the type of the mock and avoid these type mismatches.

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

We can also mock the behavior of a library function and track this function with jest.fn():

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

## Mocking errors on functions

The last use case is mock and force errors in our functions, to test the behavior of our components when we have these errors.

We will use the last example to mock a login error, so we will pass a signIn function to our component and implement an error in that function:

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

Note that we can also test whether the signIn is actually throwing the error we implement in the mock, and then test the component behavior on that error.

## Conclusion

These are my day to day use cases, I hope it can be useful to you and that it fit one of your use cases. If you’d like to contribuited with other approaches and use cases, or even other ways to do these same things, feel free to comment bellow and share your tips, see you later!😉