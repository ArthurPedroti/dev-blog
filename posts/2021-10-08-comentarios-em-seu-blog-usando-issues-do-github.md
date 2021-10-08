---
title: Comentários em seu blog usando issues do Github?
description: Sim, isso mesmo! Nesse post quero mostrar como pode usar as issues
  do Github para incluir uma área de comentários no seu blog!
date: 2021-10-08 02:41:11
image: assets/img/comments.png
category: js
background: "#D6BA32"
---
## Introdução

Criar um banco de dados para registrar os comentários? Usar um third-party application? Pra que isso! Podemos usar as próprias issues do Github como nosso banco de dados de comentários, sem ter nenhum custo e com nenhuma limitação, e tudo isso através de uma ferramenta chamada **utterances.**

## Como isso funciona?

Basicamente você autoriza um bot da utterances, e ele vai automaticamente criar issues no seu repositório, de acordo, como por exemplo, o pathname da página, e este bot, junto com o próprio app do utterances no Github, vai criar os posts no seu repositório como issues, e vai permitir que as pessoas façam uma autenticação com o próprio Github no seu site, e comente no repositório, através do seu site!

![Sessão de comentários com o utterences](assets/img/comments-2.png "Sessão de comentários com o utterences")

## Utilizando em seu projeto

### Configurações iniciais

Basicamente vocês tem que verificar as seguintes configurações:

* Se certificar que seu repositório é público (você pode criar um novo repositório só para os comentários também!)
* Instalar o [utterances app](https://github.com/apps/utterances) no seu repositório.
* Se seu repositório for um fork, se certifique que ele possui esta configuração:

![Configuração necessária em repositórios forks](assets/img/config.png "Configuração necessária em repositórios forks")

### Instalando o utterances

Para o utterances funcionar, basicamente você precisa adicionar o seguinte script ao seu projeto:

```jsx
<script src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

E pronto! Já vai estar funcionando!

Porém...

Se você, assim como eu, trabalha com React.js, vai umas dicas de como eu utilizei o utterances em um projeto com React.

## Utilizando o utterances no React

A primeira coisa que eu fiz, foi criar um componente, chamado de "UtterancesComments", que receberia como parâmetro chamado **commentBox**, que seria uma **ref**, e passaria esta ref para uma **div**:

```jsx
import React from 'react'

import * as S from './styles'

const UtterancesComments = ({ commentBox }) => {
  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comentários</S.CommentsTitle>
      <div ref={commentBox} />
    </S.CommentsWrapper>
  )
}

export default UtterancesComments
```

Depois eu criei uma função separada, que também receberia um **commentBox** com o mesmo ref que eu passei para o componente React, e criaria em cima desse "ref", um elemento **script** e adicionaria a ele todos os **atributos** que o script do utterances precisa para funcionar:

```jsx
export function appendComments(commentBox) {
	const commentScript = document.createElement('script')
  
	commentScript.async = true
  commentScript.src = 'https://utteranc.es/client.js'
  commentScript.setAttribute('repo', 'ArthurPedroti/comments')
  commentScript.setAttribute('issue-term', 'pathname')
  commentScript.setAttribute('theme', 'photon-dark')
  commentScript.setAttribute('crossorigin', 'anonymous')

  if (commentBox && commentBox.current) {
    commentBox.current.appendChild(commentScript)
  } else {
    console.log(`Error adding utterances comments on: ${commentBox}`)
  }
}
```

E prontinho, agora é só importar o componente e a função que criamos, criar uma ref, e chamar tanto a função, quanto o componente, passando essa mesma ref:

```jsx
import React, { useEffect } from 'react'

import UtterancesComments from '../components/UtterancesComments'
import { appendComments } from '../utils/appendComments'

import * as S from '../components/Post/styles'

const BlogPost = () => {
  const commentBox = React.createRef()

  useEffect(() => {
    appendComments(commentBox)
  }, [])

  return (
    <>
			{...}
      <UtterancesComments commentBox={commentBox} />
    </>
  )
}

export default BlogPost
```

E este é o resultado:

![Sessão de comentários com o utterences](assets/img/comments.png "Sessão de comentários com o utterences")

## Conclusão

Essa pequena ferramenta é simplesmente fenomenal, e pode colocar comentários no seu blog de uma maneira extremamente simples e prática, você não vai depender de bancos de dados, de backend, ou de serviços de terceiros, que precisam de manutenção. Então, se seu projeto é **simples**, e você precisa de uma maneira **simples** adicionar um ambiente em que as pessoas possam comentar, o utterances é uma ótima opção!

Espero que você tenha gostado dessa pequena sugestão, para mais informações sobre, vou deixar aqui o link oficial do utterances:

[utterances](https://utteranc.es/)

E se você também quiser ver na prática, como eu adicionei ao meu blog, você pode dar uma olhada direto no meu repositório:

[GitHub - ArthurPedroti/dev-blog](https://github.com/ArthurPedroti/dev-blog)