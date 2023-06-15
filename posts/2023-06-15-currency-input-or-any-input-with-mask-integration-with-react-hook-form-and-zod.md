---
title: Currency Input (or any Input with Mask) integration with React Hook Form
  and Zod
description: How to properly integrate these libraries and their limitations
date: 2023-06-15 10:28:16
image: assets/img/currency-input-or-any-input-with-mask-integration-with-react-hook-form-and-zod.png
category: react
background: "#61dafb"
---
# Currency Input (or any Input with Mask) integration with React Hook Form and Zod

How to properly integrate these libraries and their limitations

*Texto e ortografia revisados: 14/06/2023*

## Introduction

This article aims to show how can you create a Currency Input, or any input you want using masks, commenting about the particularities and details that you must attend to for the correct functioning of all libraries.

I’m using for this example, React Number Format for mask input, React Hook Form for form construction and logic, and Zod for validation.

## Creating the Currency Input

At this first moment, we only create the input using the React Number Format library, like that:

```jsx
import { NumericFormat } from 'react-number-format'

const DolarInput = () => {
  return (
    <NumericFormat
      thousandSeparator=","
      decimalSeparator="."
      prefix="$ "
      decimalScale={2}
    />
  )
}

export default DolarInput
```

So far nothing new, it’s very simple to use the react-number-format, and you can check the docs for more possibilities.

## Integrating with React Hook Form

We cannot directly integrate with react hook form, we need to use the Controller component.

Typically, you use the Controller component passing the “field” spread to the input

```jsx
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";

function App() {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      checkbox: false,
    }
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="checkbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Checkbox {...field} />} // <= here
      />
      <input type="submit" />
    </form>
  );
}
```

But we can’t directly access the ref of react-number-format, if we try to use the field spread directly, we get an error because the component is not properly forwarding the refs:

![Error on submit the input](assets/img/01.png "Error on submit the input")

So we need to get the ref inside the “field” property and use react-number-format’s **getInputRef** property, and spread the rest of the parameters inside the input, as in the example below:

```jsx
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

const DolarInput = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: any) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="currency"
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <NumericFormat
            thousandSeparator=","
            decimalSeparator="."
            prefix="$ "
            decimalScale={2}
            getInputRef={ref}
            {...rest}
          />
        )}
      />
      {!!errors && <span>{errors.currency?.message as string}</span>}
      <button type="submit">Send</button>
    </form>
  )
}

export default DolarInput
```

![Console log of the input submit](assets/img/02.png "Console log of the input submit")

## Integration with Zod

The normal approach is the one below, and it has no notes:

```jsx
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { z } from 'zod'

const formSchema = z.object({
  currency: z.string()
})

type FormData = z.infer<typeof formSchema>

const DolarInput = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="currency"
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <NumericFormat
            thousandSeparator=","
            decimalSeparator="."
            prefix="$ "
            decimalScale={2}
            getInputRef={ref}
            {...rest}
          />
        )}
      />
      {!!errors && <span>{errors.currency?.message as string}</span>}
      <button type="submit">Send</button>
    </form>
  )
}

export default DolarInput
```

But you might have some issues if you try to use some other Zod features, and for that, we have some differences.

For example, to use defaultValues, we need to pass a string following the same pattern as we send the value:

```jsx
const {
  handleSubmit,
  control,
  formState: { errors }
} = useForm<FormData>({
  defaultValues: {
    currency: '$ 10,000'
  },
  resolver: zodResolver(formSchema)
})
```

You may think to use Zod to transform/coerce the string into a number using a function to remove the extra characters, but when you do, you will think it’s working:

```jsx
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { transformCurrencyStrinToNumber } from 'utils/transformCurrencyStrinToNumber'
import { z } from 'zod'

const formSchema = z.object({
	// hypothetic function that transform the string on number
  currency: z.string().transform(transformCurrencyStrinToNumber)
})

type FormData = z.infer<typeof formSchema>

const DolarInput = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      currency: 10000
    },
    resolver: zodResolver(formSchema)
  })

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="currency"
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <NumericFormat
            thousandSeparator=","
            decimalSeparator="."
            prefix="$ "
            decimalScale={2}
            getInputRef={ref}
            {...rest}
          />
        )}
      />
      {!!errors && <span>{errors.currency?.message as string}</span>}
      <button type="submit">Send</button>
    </form>
  )
}

export default DolarInput
```

Render:

![Render of input with the default value](assets/img/03.png "Render of input with the default value")

But when you submit the value, you will see that the input doesn’t really recognize the default value and it is actually empty.

![Error of empty input](assets/img/04.png "Error of empty input")

The react-number-format renders the formatted value, but we can’t change the input value in the first render, and that’s a problem.

And it does not occur with working only with strings, as in the example below:

```jsx
const {
  handleSubmit,
  control,
  formState: { errors }
} = useForm<FormData>({
  defaultValues: {
    currency: '$ 10,000'
  },
  resolver: zodResolver(formSchema)
})
```

Submiting after the first render:

![Console log of the input submit](assets/img/05.png "Console log of the input submit")

Therefore, we suggest you don’t try to transform the value if you want to work with default values. It’s better to handle the data before and after the React Hook Form and Zod, to avoid errors in these transforms and reverse transforms.

## Creating a custom Currency Input

Finally, you can abstract the parameters and the Controller component into a new Component and customize it however you want:

```jsx
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { z } from 'zod'

type DolarInputProps = {
  name: string
  error?: Merge<FieldError, FieldErrorsImpl<{}>> | null
  control: Control<any, any> | undefined
}

const DolarInput = ({ name, error = null, control }: DolarInputProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <NumericFormat
            thousandSeparator=","
            decimalSeparator="."
            prefix="$ "
            decimalScale={2}
            getInputRef={ref}
            {...rest}
          />
        )}
      />
      {!!error && <span>{error?.message}</span>}
    </>
  )
}

const formSchema = z.object({
  currency: z.string()
})

type FormData = z.infer<typeof formSchema>

const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      currency: '$ 10,000'
    },
    resolver: zodResolver(formSchema)
  })

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DolarInput name="currency" control={control} error={errors.currency} />
      <button type="submit">Send</button>
    </form>
  )
}

export default Form
```

## Improving React Hook Form (v7.44.0) integration with Zod and transformed/coerce values

Three weeks ago, react-hook-form released a new version (v7.44.0) with the possibility to use two different types on your form, one for data input and another for output.

Thus, with this new feature, we can use Zod’s native transforms, and our defaultValues will continue to receive the input type, but when we submit the form, we will get the transformed type.

To do that, first of all, we need to get the correct types, and Zod has two methods to infer the input and output of your schema:

```tsx
type FormInputData = z.input<typeof formSchema>
type FormOutputData = z.output<typeof formSchema>
// type FormData = z.infer<typeof formSchema>
```

Now, with the API of react-hook-forma, we can pass these two types in your **useForm**, because now it receives three parameters like that: 

`FormProviderProps<TFieldValues, TContext, TTransformedValues>`

TContext if by default **any**, so we will maintain the same.

Another handy little trick is to use the **Intl.NumberFormat** to turn our transformed number back into a string:

```tsx
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { transformCurrencyStrinToNumber } from 'utils/transformCurrencyStrinToNumber'
import { z } from 'zod'

type DolarInputProps = {
  name: string
  error?: Merge<FieldError, FieldErrorsImpl<{}>> | null
  control: Control<any, any> | undefined
}

const DolarInput = ({ name, error = null, control }: DolarInputProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <NumericFormat
            thousandSeparator=","
            decimalSeparator="."
            prefix="$ "
            decimalScale={2}
            getInputRef={ref}
            {...rest}
          />
        )}
      />
      {!!error && <span>{error?.message}</span>}
    </>
  )
}

const formSchema = z.object({
  currency: z.string().transform((val) => Number(val.replace(/[^\d.-]/g, '')))
})

type FormInputData = z.input<typeof formSchema>
type FormOutputData = z.output<typeof formSchema>

const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormInputData, any, FormOutputData>({
    defaultValues: {
      currency: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(100000.56)
    },
    resolver: zodResolver(formSchema)
  })

  const onSubmit: SubmitHandler<FormOutputData> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DolarInput name="currency" control={control} error={errors.currency} />
      <button type="submit">Send</button>
    </form>
  )
}

export default Form
```

## Conclusion

I hope this article can be useful for you, I have to invest some time to understand the correct way to use react-number-format with react-hook-form, because the example that we have on react-hook-form docs didn’t take off the ref from fields props and got some errors with that, and we need to understand the limitations of the integration of Zod with react-hook-form as well, but as we showed, now we have a new feature to help us, and we can use Zod’s native transformations.

If you have any questions or suggestions on how we can improve these integrations, please comment below, see you soon!