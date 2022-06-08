---
title: Vários dados na mesma coluna no React-Table
description: Como adaptar as colunas do react-table para mostrar mais de um dado
date: 2022-06-08 08:54:09
image: assets/img/coding-g37fc53127_1920.jpg
category: react
background: "#61dafb"
---
## Introdução

Quando você tem alguma informação na tabela e precisa compactar esses dados em uma tabela média/grande, uma das melhores abordagens é juntar uma ou mais colunas/dados em apenas uma coluna. Mas a documentação do react-table não têm bons exemplos mostrando essa abordagem e explicando como o react-table realmente usa esse tipo de abordagem em filtros e agrupamento.

## 1º Escolhendo o dado mestre

Neste exemplo, usaremos este modelo de dados:

```jsx
export type User = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: string
}
```

Nesta forma, vamos juntar o firstName e lastName na mesma coluna.

Em seguida, precisamos criar uma coluna e escolher um desses dois dados para ser o dado “mestre”, no qual usaremos para os filtros e para o agrupamento.

Uma coisa realmente importante a destacar é que, quando você coloca dois ou mais dados na mesma coluna, não podemos filtrar os dois dados ou agrupar com os dois dados. Principalmente porque quando agrupamos, mostraremos apenas o dado mestre em cada linha, e com filtro é da mesma forma, podemos filtrar apenas o dado mestre, se você quiser filtrar e agrupar esses dado específico, não coloque isso em uma coluna de dados múltiplos!

Sabendo disso, temos que escolher sabiamente qual será o nosso dado mestre, neste exemplo, escolheremos o firstName como o nosso dado mestre.

Então, em um primeiro momento, vamos construir a coluna firstName normalmente:

```jsx
{
  Header: "First Name",
  accessor: "firstName",
  aggregate: "count",
  Aggregated: ({ value }) => `${value} Names`
},
```

## 2º Obtendo os outros dados

Agora, temos que obter os outros dados que usaremos, e para isso, não iremos criar a coluna lastName e esconder ela depois, vamos obter esses data sem criar essa coluna mesmo.

No react-table esses dados realmente não existem e só existe um lugar para pegar isso, e é em uma propriedade da row chamada “original”, essa propriedade mostra exatamente os dados que a tabela recebe, então precisamos passar todos os dados para o react-table, e após processar as colunas, o react-table exclui os dados que não possuem uma coluna correspondente.

Agora, vamos adaptar nossa coluna para usar a propriedade **original** e mostrar o dado firstName:

```jsx
{
  Header: "First Name",
  accessor: "firstName",
  aggregate: "count",
  Aggregated: ({ value }) => `${value} Names`,
  Cell: ({ row }) => row.original.firstName
},
```

Se você fizer alguns testes usando essa abordagem, verá que, se tentar agrupar a coluna firstName, seu código irá quebrar. Isso porque quando você usa o recurso de agrupamento, a propriedade “original” desaparece da row, então precisamos fazer algumas condicionais para usar outra propriedade quando o mês for agrupado, e usaremos uma nova propriedade que aparece quando agrupamos uma coluna, chamado “groupByVal”, e retornamos o valor agrupado de firstName.

```jsx
{
  Header: "First Name",
  accessor: "firstName",
  aggregate: "count",
  Aggregated: ({ value }) => `${value} Names`,
  Cell: ({ row }) => row.original ? row.original.firstName : row.groupByVal
},
```

Agora nossa coluna com a propriedade row está funcionando de forma normal e agrupada.

## 3º Mostrando de dados

A última parte é pegar os outros valores da propriedade original, no nosso caso, vamos pegar o lastName e mostrá-lo ao lado do nome:

```jsx
{
  Header: "First Name",
  accessor: "firstName",
  aggregate: "count",
  Aggregated: ({ value }) => `${value} Names`,
  Cell: ({ row }) =>
    row.original ? row.original.firstName + ' ' + row.original.lastName : row.groupByVal
},
```

![Tabela React-table](assets/img/react-table-01.png "Tabela React-table")

![Tabela React-table Agrupada](assets/img/react-table-02.png "Tabela React-table Agrupada")

Para filtrar, lembre-se que você não pode filtrar por lastName, pois lastName não existe para o react-table, então você só filtra ou agrupa pelo firstName.

Para ver este exemplo funcionando, segue o link do sandbox:

<https://codesandbox.io/s/multi-data-in-one-colum-at-react-table-gps6li?file=/src/App.js>

## Conclusão

Espero que este artigo tenha sido útil para você, porque eu tive que me aprofundar nessas abordagens e objetos que o react-table renderiza para finalmente chegar a essa solução. Se você tiver algum comentário ou sugestão, sinta-se à vontade para comentar abaixo, até mais!