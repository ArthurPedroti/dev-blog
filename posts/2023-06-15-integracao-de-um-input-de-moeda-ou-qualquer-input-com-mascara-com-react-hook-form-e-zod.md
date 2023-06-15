---
title: Integração de um Input de Moeda (ou qualquer input com máscara) com React
  Hook Form e Zod
description: Como integrar corretamente essas bibliotecas e suas limitações
date: 2023-06-15 02:36:34
image: assets/img/integracao-de-um-input-de-moeda-ou-qualquer-input-com-mascara-com-react-hook-form-e-zod.png
category: react
background: "#61dafb"
---
## **Introdução**

Este artigo tem como objetivo mostrar como você pode criar um input de moeda, ou qualquer outro input que você queira usando máscaras, comentando sobre as particularidades e detalhes que você deve prestar atenção para o funcionamento correto de todas as bibliotecas.

Para este exemplo, estou usando o React Number Format para o input com máscara, o React Hook Form para a construção e lógica do formulário, e o Zod para a validação.

## **Criando o Input de Moeda**

Neste primeiro momento, apenas criamos o input usando a biblioteca React Number Format, assim:

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

Até agora, nada de novo. É muito simples usar o react-number-format, e você pode consultar a documentação para obter mais possibilidades.

## **Integrando com o React Hook Form**

Não é possível integrar diretamente com o React Hook Form, é necessário usar o componente Controller.

Normalmente, você usa o componente Controller passando o spread "field" para o input.

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

Mas não podemos acessar diretamente a **ref** do react-number-format. Se tentarmos usar o spread "field" diretamente, ocorrerá um erro porque o componente não está encaminhando corretamente as referências (refs):

![Erro ao enviar o formulário](assets/img/01.png "Erro ao enviar o formulário")

Portanto, precisamos obter a ref dentro da propriedade "field" e usar a propriedade **getInputRef** do react-number-format e espalhar o restante dos parâmetros dentro do input, como no exemplo abaixo:

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

![Console log do submit do input](assets/img/02.png "Console log do submit do input")

## **Integração com o Zod**

A abordagem normal é a seguinte e não tem observações:

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

Mas você pode ter alguns problemas se tentar usar outros recursos do Zod e, para isso, temos algumas diferenças.

Por exemplo, para usar defaultValues, precisamos passar uma string seguindo o mesmo padrão que enviamos o valor:

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

Você pode pensar em usar o Zod para transformar/coerce a string em um número usando uma função para remover os caracteres extras, mas quando você fizer isso, vai apenas achar que está funcionando:

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

![Renderização do input com valor default](assets/img/03.png "Renderização do input com valor default")

Mas quando você enviar o valor, verá que o campo de entrada não reconhece realmente o valor padrão e na verdade está vazio.

![Erro de input vazio](assets/img/04.png "Erro de input vazio")

O react-number-format renderiza o valor formatado, mas não podemos alterar o valor do campo de entrada na primeira renderização, e isso é um problema.

E isso não ocorre quando trabalhamos apenas com strings, como no exemplo abaixo:

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

Enviar após a primeira renderização:

![Console log do submit do input](assets/img/05.png "Console log do submit do input")

Portanto, sugerimos que você não tente transformar o valor se quiser trabalhar com valores padrão. É melhor lidar com os dados antes e depois do React Hook Form e do Zod, para evitar erros nessas transformações e transformações reversas.

## \***\*Criando um input de moeda personalizado\****

Por fim, você pode abstrair os parâmetros e o componente Controller em um novo componente e personalizá-lo como desejar:

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

## **Melhorando a integração do React Hook Form (v7.44.0) com Zod e valores transformados/coagidos**

Há três semanas, o react-hook-form lançou uma nova versão (v7.44.0) com a possibilidade de usar dois tipos diferentes em seu formulário, um para entrada de dados e outro para saída.

Assim, com esse novo recurso, podemos usar as transformações nativas do Zod, e nossos defaultValues continuarão recebendo o tipo de entrada, mas quando enviarmos o formulário, obteremos o tipo transformado.

Para fazer isso, em primeiro lugar, precisamos obter os tipos corretos, e o Zod possui dois métodos para inferir a entrada e a saída do seu esquema:

```tsx
type FormInputData = z.input<typeof formSchema>
type FormOutputData = z.output<typeof formSchema>
// type FormData = z.infer<typeof formSchema>
```

Agora, com a API do react-hook-forma, podemos passar esses dois tipos no seu **useForm**, pois agora ele recebe três parâmetros dessa forma:

**`FormProviderProps<TFieldValues, TContext, TTransformedValues>`**

Por padrão, TContext é **any**, então manteremos o mesmo.

Outra dica útil é usar o **Intl.NumberFormat** para transformar nosso número transformado de volta em uma string:

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

## **Conclusão**

Espero que este artigo seja útil para você. Foi necessário investir algum tempo para entender a maneira correta de usar o react-number-format com o react-hook-form, porque o exemplo que temos na documentação do react-hook-form não removeu a ref das props do campo e causou alguns erros, e também precisamos entender as limitações da integração do Zod com o react-hook-form. Mas, como mostramos, agora temos um novo recurso para nos ajudar e podemos usar as transformações nativas do Zod.

Se você tiver alguma dúvida ou sugestão sobre como podemos melhorar essas integrações, por favor, comente abaixo. Até logo!