---
title: A melhor forma de entender a função map do Javascript
description: Descubra como transformar seus dados com a facilidade da função map
date: 2023-02-09 11:05:45
image: assets/img/a-melhor-forma-de-entender-a-funcao-map-do-javascript.png
category: js
background: "#D6BA32"
---
## Introdução

Você já ouviu falar da função **`map`** do JavaScript, mas ainda não entende completamente como ela funciona? Se sim, então você veio ao lugar certo! A função **`map`** é uma das operações mais comuns em programação e é fundamental para o desenvolvimento de aplicações eficientes e de alta performance.

## A função map

A função **`map`** é usada para transformar cada elemento de um array em um novo elemento. Isso é feito aplicando uma determinada lógica ou transformação em cada elemento, resultando em um novo array com os elementos transformados. Essa operação é muito útil quando precisamos transformar dados brutos em dados processados e estruturados.

A sintaxe da função map consiste em duas partes principais: a função map em si e a função callback. E aqui que normalmente as pessoas começam a se perder, porque a função map é uma função que recebe outra função como parametro, no caso a callback. Mas calma, vamos entender isso de uma maneira menos complicada.

A função map tem a seguinte sintaxe:

```jsx
array.map(callback)
```

Onde a função map é aplicada a um array e a função callback é executada em cada elemento desse array.

A função callback tem a seguinte sintaxe:

```jsx
callback(currentValue, index, array)
```

Onde "currentValue" é o valor atual sendo processado no array, "index" é o índice do elemento atual sendo processado no array e "array" é o próprio array que está sendo processado.

A função map retorna um novo array com os resultados da função (o “return” da função) callback aplicada a cada elemento do array original.

Aqui está um exemplo de como usar a função **`map`** para aumentar o valor de cada elemento de um array em 1:

```jsx
const numbers = [1, 2, 3, 4, 5];
const result = numbers.map(number => number + 1);
console.log(result);
// [2, 3, 4, 5, 6]
```

# Implementando a função map no JavaScript

A melhor maneira de realmente entender como funciona a função map do javascript é implementando ela você mesmo, ou seja, fazendo a sua própria função map. Isso lhe dará uma compreensão profunda da funcionalidade e dos conceitos por trás dessa função.

Aqui está a implementação da função map:

```jsx
function map(array, callback) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(callback(array[i], i, array));
  }
  return newArray;
}
```

Esta implementação é simples e fácil de seguir, e ilustra claramente como a função map funciona. 

A implementação da função map começa com a criação de um array vazio chamado **`newArray`**, que será preenchido com os resultados da função callback aplicada a cada elemento do array original.

Em seguida, temos um loop **`for`**, que itera através de cada elemento do array original, sendo a quantidade de repetições do loop `for` igual ao tamanho do array original (array.length). A variável **`i`** é usada como índice para acessar cada elemento do array original. Dentro do loop, a função callback é executada para cada elemento, passando três argumentos: o valor atual do elemento (**`array[i]`**), o índice desse elemento (**`i`**) e o array original completo (**`array`**).

O resultado da função callback é empurrado para o **`newArray`** usando o método **`push`**. Este processo é repetido para cada elemento do array original até que todos os elementos tenham sido processados e o loop **`for`** seja concluído.

Finalmente, o **`newArray`** preenchido é retornado como o resultado da função map.

A função callback é uma parte crucial da implementação da função map, pois é a função que determina como os elementos do array serão processados. Você pode escrever qualquer tipo de função callback que desejar, desde que ela aceite pelo menos um argumento e retorne um valor. A função callback pode ser tão simples ou tão complexa quanto você desejar, desde que seus resultados possam ser usados para preencher o **`newArray`**.

Em resumo, a implementação da função map usa um loop **`for`** para iterar através dos elementos do array original, e a função callback para processar cada elemento. Juntos, esses dois componentes produzem o novo array preenchido com os resultados da função callback aplicada a cada elemento do array original.

Ao escrever a função map você mesmo, você poderá experimentar diferentes tipos de funções callback e ver como isso afeta o resultado final. Além disso, você pode também adicionar recursos adicionais à sua implementação da função map, o que lhe dará uma compreensão ainda mais profunda da funcionalidade e dos conceitos por trás da função.

Em resumo, implementar a função map você mesmo é a maneira mais fácil e eficaz de entender como ela funciona e como pode ser usada em seu código.

## Praticando um pouquinho

### Exemplos de transformações de arrays de números em arrays de objetos

Considere o seguinte array de números:

```jsx
const numbers = [1, 2, 3, 4, 5];
```

Usando a função map, podemos transformar esse array em um array de objetos, onde cada objeto contém o número atual e o seu dobro:

```jsx
const doubledNumbers = numbers.map(number => {
  return {
    number,
    double: number * 2
  };
});

console.log(doubledNumbers);
// Output: [
//   { number: 1, double: 2 },
//   { number: 2, double: 4 },
//   { number: 3, double: 6 },
//   { number: 4, double: 8 },
//   { number: 5, double: 10 }
// ]
```

### Exemplos de transformações de arrays de objetos em array de strings

Considere o seguinte array de objetos:

```jsx
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Jim', age: 35 }
];
```

Usando a função map, podemos transformar esse array de objetos em um array com apenas os nomes dos usuários:

```jsx
const names = users.map(user => user.name);

console.log(names);
// Output: ['John', 'Jane', 'Jim']
```

### Exemplos de transformações de arrays de objetos em array de funções

Considere o seguinte array de objetos:

```jsx
const products = [
  { name: 'Laptop', price: 1000 },
  { name: 'Smartphone', price: 500 },
  { name: 'Tablet', price: 700 }
];
```

Usando a função map, podemos transformar esse array de objetos em um array de funções que retornam o preço do produto em questão:

```jsx
const getPrices = products.map(product => {
  return () => product.price;
});

console.log(getPrices[0]()); // Output: 1000
console.log(getPrices[1]()); // Output: 500
console.log(getPrices[2]()); // Output: 700
```

Com esses exemplos simples, você já pode ter uma noção de como a função map pode ser útil para transformar arrays de diferentes formas. Além disso, ao implementar a função map você aprende mais sobre como funciona o loop `for` e a função `callback` internamente.

# Conclusão

A função map é uma ferramenta extremamente versátil e poderosa na manipulação de dados. O retorno da função pode ser qualquer coisa, desde arrays simples, até arrays de objetos ou funções. Isso permite uma grande flexibilidade na estruturação de dados e na transformação de dados de uma forma para outra. 

Por isso, a função map é amplamente utilizada em muitos projetos de programação, tornando-se uma habilidade valiosa para qualquer programador. Ao entender completamente o funcionamento da função map, os programadores podem aproveitar seu potencial para solucionar problemas complexos de uma forma simples e eficiente.

Se você tem alguma dúvida ou sugestão, não deixe de comentar aqui em baixo, até a próxima.😉