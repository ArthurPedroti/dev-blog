---
title: "[ENG] Multiple Data on the same column in React-Table"
description: How adapt the columns in react-table to show more than one data
date: 2022-06-08 06:37:29
image: assets/img/coding-g37fc53127_1920.jpg
category: react
background: "#61dafb"
---
## Introduction

When you have some information in the table, and you need to compress this data in a middle/large table, one of the best approaches is to join one or more columns/data into just one column. But react-table docs don’t have any good examples showing this approach and explaining how react-tables actually use this kind of approach in filters and grouping.

## 1º Choosing the master data

In this example, we will use this data model:

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

In this shape, we are going to join the firstName and lastName in the same column.

Then we need to create a column and choose one of these two datas to be the “master” data, in which we will use for filtering and grouping.

One really important thing to highlight is, when you put two or more data in the same column, we can’t filter both data, or group with both data. Mainly because when we group, we will only  show the master data in each row, and with filter it is the same way, we can filter only the master data, if you want to filter and group these specific data, don’t put this in a multiple data column!

Knoing this, we have to choose wisely what will be our master data, in this example, we will choose the firstName like our master data.

So, in a first moment, let’s build the fisrtName column normally:

```jsx
{
  Header: "First Name",
  accessor: "firstName",
  aggregate: "count",
  Aggregated: ({ value }) => `${value} Names`
},
```

## 2º Getting the other datas

Now, we have to get the other data we will use, and we not going to create the lastName column and hide it later, we are going to get this data without creating this column.

In react-table this data really doesn’t exist and there’s only in one place to get that, and it’s in a row property called “original”, this property shows exactly data that the table receives, so we need to pass all the data to react-table, and after process the columns, react-table deletes data that doesn’t have a corresponding column.

Now, let’s  adapt our column to use original property and show the firstName data:

```jsx
{
  Header: "First Name",
  accessor: "firstName",
  aggregate: "count",
  Aggregated: ({ value }) => `${value} Names`,
  Cell: ({ row }) => row.original.firstName
},
```

If you do some tests using this approach, you will see that if you try to group the firstName column, your code will break. This is because when you use the grouping feature, the original property disappear from the row, so we need to do some conditionals to use other property when the month is grouped, and we will use a new property that appears when we group a column, called “groupByVal”, and we return the grouped value of the firstName.

```jsx
{
  Header: "First Name",
  accessor: "firstName",
  aggregate: "count",
  Aggregated: ({ value }) => `${value} Names`,
  Cell: ({ row }) => row.original ? row.original.firstName : row.groupByVal
},
```

Now our column with the row property is working both normaly and grouped way. 

## 3º Showing the datas

The last part is getting the other values from the original property, in our case, we are going to get the lastName and show it next to the name:

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

![React Table](assets/img/react-table-01.png "React Table")

![React Table Grouped](assets/img/react-table-02.png "React Table Grouped")

To filter, remember that you can’t filter by lastName, as lastName doesn’t exist to react-table, so you only filter by the firstName.

To see this example working, follow the sandbox link:

<https://codesandbox.io/s/multi-data-in-one-colum-at-react-table-gps6li?file=/src/App.js>

## Conclusion

I hope this article was helpful to you, because I had to dig into these approaches and objects that react-table render to finally get to this solution. If you have any comments or suggestions, feel free to comment below, see you!