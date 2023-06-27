---
title: Como Fazer Upload, Download e Exclusão de Arquivos com Strapi, React e AWS S3
description: Como integrar todas essas ferramentas para fazer upload, download e
  exclusão de arquivos através da API/Painel de Administração do Strapi
date: 2023-06-27 05:21:11
image: assets/img/como-fazer-upload-download-e-exclusao-de-arquivos-com-strapi-react-e-aws-s3.png
category: js
background: "#D6BA32"
---
## Introdução

Hoje vamos ver como podemos criar componentes no React para fazer upload, download e exclusão de arquivos usando o Strapi como nosso backend. Também vamos aprender como configurar o Strapi para usar o AWS S3 como nosso provedor de hospedagem de arquivos e como personalizar o Strapi para excluir os arquivos de mídia vinculados às nossas entradas quando excluímos essas entradas, pois esse não é o comportamento padrão do Strapi.

## Criando seu backend com o Strapi

Inicialmente, precisamos criar nossa infraestrutura de backend e, para isso, vamos usar o Strapi. Para instalar o Strapi com o script de inicialização rápida, execute o seguinte comando:

```tsx
npx create-strapi-app backend --quickstart
```

E crie um content type para os nossos testes:

![Untitled](assets/img/how-to-upload-download-and-delete-files-with-strapi-react-and-aws-s3-01.png)

Nada de novo até aqui, apenas criei uma tabela "test" com uma coluna chamada **name** (tipo texto) e **files** (tipo mídia múltipla).

Para entender melhor como o Strapi funciona, você pode consultar a documentação.

## Componente de Upload em React

Para criar nosso componente de upload em React, o maior desafio é entender como devemos enviar nosso formulário frontend para a API do Strapi.

A primeira etapa envolve a construção do formulário. Como é improvável que você utilize o formulário nativo do React, para fins de ilustração, vamos usar o React Hook Form para gerenciar nosso formulário.

```tsx
import { useForm } from 'react-hook-form'

const UploadComponent = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (values: any) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('name')} />
      <input type="file" {...register('files')} />

      <button type="submit">Send</button>
    </form>
  )
}

export default UploadComponent
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9ca908cc-ac44-416a-935a-8347fb63fb08/Untitled.png)

### Manipular o formulário para enviar para o Strapi

Para manipular corretamente o FileList e enviá-lo para nosso backend, precisamos seguir as seguintes etapas.

Para atender aos requisitos do Strapi, os arquivos de mídia precisam ser enviados dentro de um objeto FormData. Portanto, devemos criar um novo objeto FormData e anexar todos os campos relevantes a ele.

Para aderir às especificações do Strapi, devemos reunir todos os dados não relacionados à mídia em um objeto "data" e anexá-lo à nossa instância FormData da seguinte maneira:

```tsx
const onSubmit = async (values: any) => {
  const formData = new FormData()
  const { medias, ...rest } = values

  formData.append('data', JSON.stringify(rest))
}
```

Agora precisamos adicionar os arquivos ao objeto FormData, usando a API **formData.append** com atenção aos parâmetros:

**`append(name, value, filename)`**

O nome deve ser o nome da coluna do banco de dados com o prefixo "files".

Por exemplo, se o nome da coluna for "documents", usaremos "files.documents".

Portanto, vamos iterar sobre a nossa FileList para adicionar todos os arquivos ao nosso FormData:

```tsx
const onSubmit = async (values: any) => {
  const formData = new FormData()
  const { files, ...rest }: { files: FileList; rest: any } = values

  formData.append('data', JSON.stringify(rest))

  Array.from(files).forEach((file) => {
    formData.append('files.files', file, file.name)
  })
}
```

E por fim, envie o FormData para o endpoint do Strapi:

```tsx
const UploadComponent = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (values: any) => {
  const formData = new FormData()
  const { files, ...rest }: { files: FileList; rest: any } = values

  formData.append('data', JSON.stringify(rest))

  Array.from(files).forEach((file) => {
    formData.append('files.files', file, file.name)
  })

  await fetch('http://localhost:1337/api/tests', {
    method: 'post',
    body: formData
  })
}
```

Certifique-se de que o acesso público esteja habilitado para as rotas do nosso tipo de conteúdo, caso contrário, você poderá encontrar um erro de acesso proibido.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2dd4b82c-bfc2-4e15-a2b9-41aa37069673/Untitled.png)

Para exemplos atualizados em versões mais recentes, consulte a documentação abaixo:

[Upload | Strapi Documentation](https://docs.strapi.io/dev-docs/plugins/upload#upload-files-at-entry-creation)

## Configurar a AWS S3 como provedor de hospedagem de arquivos

Já aprendemos como enviar arquivos para o Strapi e salvá-los localmente. Nosso próximo objetivo é configurar o Strapi para armazenar os arquivos na nuvem usando a AWS S3.

### Configuração do Strapi

Para isso, vamos começar criando/atualizando o arquivo de configuração de plugins em nosso projeto Strapi:

```tsx
// ./config/plugins.ts

export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET')
          }
        }
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {}
      }
    }
  }
})
```

Se você deseja visualizar as miniaturas que o Strapi cria no painel de administração, precisamos atualizar a política de middleware de segurança no arquivo de configuração de middleware:

```tsx
// ./config/middlewares.ts

export default ({ env }) => [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            `${env('AWS_BUCKET')}.s3.amazonaws.com`
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            `${env('AWS_BUCKET')}.s3.amazonaws.com`
          ],
          upgradeInsecureRequests: null
        }
      }
    }
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public'
]
```

Dentro do painel de administração do Strapi, podemos configurar outras boas opções em Settings > Media Library. Dependendo dos requisitos da sua aplicação, você pode optar por habilitar ou desabilitar a geração de outros arquivos e otimizações.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e03bf2e-3e13-42cc-907e-cea39da7ca04/Untitled.png)

### Configuração da AWS S3

Para configurar a AWS S3, é necessário ter uma conta na AWS. Se você não tiver uma, precisaremos criá-la.

Siga estas etapas para criar um bucket na S3 e configurar as configurações importantes:

1. Acesse o Console de Gerenciamento da AWS e faça login em sua conta da AWS.
2. Navegue até o serviço S3.
3. Crie um novo bucket selecionando o botão "Criar bucket".
4. Siga as instruções para especificar o nome do bucket, região e outras configurações necessárias, anotando as configurações importantes que precisam ser definidas.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7b82cea2-d7a5-4848-b33e-abb33a8362bb/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d0bd219b-41cc-41e5-ad1e-68a1ec893f47/Untitled.png)

Deixe as configurações restantes como padrão e prossiga para a próxima etapa.

1. Selecione o bucket que você acabou de criar.
2. Navegue até a guia **Permissões**.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/359eeeee-2cf3-45dc-80ce-ac69023d5f47/Untitled.png)

Atualize a política de CORS da seguinte forma:

```tsx
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/42070775-4225-4ab1-9945-244fc7dcdba2/Untitled.png)

Você pode permitir ou restringir essa configuração conforme desejar. Basicamente, isso se refere a quais URLs podem obter informações, visualizar e manipular seus arquivos.

Feito isso, podemos preencher duas de nossas variáveis de ambiente no Strapi:

```bash
# .env
AWS_BUCKET=my-test-strapi-bucket
AWS_REGION=us-east-1
```

Para obter as credenciais necessárias para fazer upload de arquivos, precisamos criar um usuário no console AWS Identity and Access Management (IAM). Siga estas etapas:

1. Acesse o Console de Gerenciamento da AWS.
2. Navegue até o serviço IAM.
3. Selecione **Usuários** e crie um novo usuário.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6c376e42-939a-464f-b874-237433626d8c/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/18f4b8ff-d8a5-4b38-b95e-91aeebf4bef9/Untitled.png)

Para as configurações restantes, você pode deixá-las como padrão.

Em seguida, clique no usuário que você acabou de criar e vá para a guia "Credenciais de segurança". A partir daí, você pode criar uma nova chave de acesso.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/540051b5-9c9f-4473-8fc7-847b881a9d68/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c9b0bc68-9f45-4427-9f55-054078b79eb6/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/45fd4c0e-483a-487e-916b-7ac63bc7a5c2/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/be8c54cf-3756-4a27-9771-b8a06730be78/Untitled.png)

Agora, salve suas chaves e coloque-as nas suas variáveis de ambiente do Strapi:

```bash
# .env
AWS_BUCKET=my-test-strapi-bucket
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAQLQTDKCCUCAB6RZE
AWS_ACCESS_SECRET=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
```

### **Testando o upload**

Agora podemos testar novamente se o nosso componente de upload está funcionando e se seus arquivos foram salvos no S3:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08e39210-9e63-4441-808b-8bdba8ee6cb9/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2e904981-d82a-4b95-817f-13c5674201f3/Untitled.png)

Para obter mais detalhes e documentação atualizada, consulte os artigos abaixo:

[How to Set up Amazon S3 Upload Provider Plugin for Your Strapi App](https://strapi.io/blog/how-to-set-up-amazon-s3-upload-provider-plugin-for-our-strapi-app)

[AWS S3 | Strapi Market](https://market.strapi.io/providers/@strapi-provider-upload-aws-s3)

## **Fazendo o download dos nossos arquivos do S3**

Após o upload bem-sucedido do arquivo para o S3, agora precisamos entender como podemos baixá-lo. Para isso, primeiro precisamos obter a URL do arquivo a partir da AWS.

Podemos obter a URL manualmente por meio da interface do Strapi Admin ou fazendo uma solicitação GET à API para recuperar todas as entradas e obter a URL de cada uma.

Depois de obtermos a URL, em nosso código React, precisamos implementar uma função chamada **downloadImage**. Essa função será invocada quando um botão for clicado, permitindo que iniciemos o processo de download do arquivo.

```tsx
import { useForm } from 'react-hook-form'

const UploadComponent = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (values: any) => {
    const formData = new FormData()
    const { files, ...rest }: { files: FileList; rest: any } = values

    formData.append('data', JSON.stringify(rest))

    Array.from(files).forEach((file) => {
      formData.append('files.files', file, file.name)
    })

    await fetch('http://localhost:1337/api/tests', {
      method: 'post',
      body: formData
    })
  }

  async function downloadImage() {}

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('name')} />
        <input type="file" multiple {...register('files')} />

        <button type="submit">Send</button>
      </form>
      <button onClick={() => downloadImage()}>Download</button>
    </>
  )
}

export default UploadComponent
```

Na função downloadImage, receberemos a URL do arquivo no AWS como primeiro parâmetro. Precisamos fazer uma solicitação GET ao AWS S3 para recuperar o arquivo usando essa URL. Após obter o arquivo, podemos criar um link temporário com o arquivo anexado.

```tsx
async function downloadImage(imageSrc: string) {
  const response = await fetch(imageSrc)
  const blobImage = await response.blob()
  const href = URL.createObjectURL(blobImage)

	const anchorElement = document.createElement('a')
  anchorElement.href = href
}
```

Depois disso, clicaremos nesse link e o removeremos:

```tsx
async function downloadImage(
    imageSrc: string,
    nameOfFileDownloaded = imageSrc.replace(/^.*[\\\/]/, '')
  ) {
    const response = await fetch(imageSrc)
    const blobImage = await response.blob()
    const href = URL.createObjectURL(blobImage)

    const anchorElement = document.createElement('a')
    anchorElement.href = href
    anchorElement.download = nameOfFileDownloaded

    document.body.appendChild(anchorElement)
    anchorElement.click()

    document.body.removeChild(anchorElement)
    window.URL.revokeObjectURL(href)
  }
```

Podemos modificar a função **downloadImage** para incluir um segundo parâmetro que especifique o nome do arquivo a ser baixado. No entanto, como comportamento padrão, podemos usar o nome do arquivo no AWS.

Vamos prosseguir testando a função passando uma URL de um dos nossos arquivos do Strapi/AWS para ver se ela funciona:

```tsx
import { useForm } from 'react-hook-form'

const UploadComponent = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (values: any) => {
    const formData = new FormData()
    const { files, ...rest }: { files: FileList; rest: any } = values

    formData.append('data', JSON.stringify(rest))

    Array.from(files).forEach((file) => {
      formData.append('files.files', file, file.name)
    })

    await fetch('http://localhost:1337/api/tests', {
      method: 'post',
      body: formData
    })
  }

  async function downloadImage(
    imageSrc: string,
    nameOfFileDownloaded = imageSrc.replace(/^.*[\\\/]/, '')
  ) {
    const response = await fetch(imageSrc)
    const blobImage = await response.blob()
    const href = URL.createObjectURL(blobImage)

    const anchorElement = document.createElement('a')
    anchorElement.href = href
    anchorElement.download = nameOfFileDownloaded

    document.body.appendChild(anchorElement)
    anchorElement.click()

    document.body.removeChild(anchorElement)
    window.URL.revokeObjectURL(href)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('name')} />
        <input type="file" multiple {...register('files')} />

        <button type="submit">Send</button>
      </form>
      <button
        onClick={() =>
          downloadImage(
            'https://my-test-strapi-bucket.s3.amazonaws.com/test_20de7b62e5.png'
          )
        }
      >
        Download
      </button>
    </>
  )
}

export default UploadComponent
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f8a256cd-96bb-4cc1-8979-d45e75c5b739/Untitled.png)

## Deleting your files through Strapi API

By default when you have a file related to an entry in Strapi, when you delete the entry these files are not deleted, like in WordPress.

And the ideia here is to create a table (content-type), that you can attach files to each entry, and that files are uniquely associated to those entries, and if one of them is deleted, the associated files will also be deleted.

To do this, we’ll need to customize Strapi to do this behavior for us, and to do this, we use the lifecycle hooks feature.

The lifecycle hooks allow us to trigger functions when certain Strapi queries are executed. In this case, we can utilize the "beforeDelete" lifecycle hook to delete all media files associated with an entry before the entry itself is deleted.

To implement this, we need to create a file named **lifecycles** inside the API folder of your project.

## **Excluindo seus arquivos por meio da API do Strapi**

Por padrão, quando você tem um arquivo relacionado a uma entrada no Strapi, quando você exclui a entrada, esses arquivos não são excluídos, como no WordPress.

A ideia aqui é criar uma tabela (content type) na qual você pode anexar arquivos a cada entrada, e esses arquivos estão associados exclusivamente a essas entradas. Se uma delas for excluída, os arquivos associados também serão excluídos.

Para fazer isso, precisaremos personalizar o Strapi para que ele tenha esse comportamento, e para isso, usamos o recurso de ganchos do ciclo de vida (lifecycle hooks).

Os lifecycle hooks nos permitem acionar funções quando determinadas consultas do Strapi são executadas. Neste caso, podemos usar o hook "beforeDelete" para excluir todos os arquivos de mídia associados a uma entrada antes que a própria entrada seja excluída.

Para implementar isso, precisamos criar um arquivo chamado **lifecycles** dentro da pasta API do seu projeto.

```tsx
// ./src/api/test/content-types/test/lifecycles.ts

export default {
  async beforeDelete(ctx) {}
}
```

Podemos implementar uma lógica para identificar a entrada que está sendo excluída e determinar os arquivos associados a ela. Em seguida, podemos usar a API do Strapi para excluir os arquivos do Strapi e removê-los também do AWS S3.

```tsx
// ./src/api/test/content-types/test/lifecycles.ts

export default {
  async beforeDelete(ctx) {
    const entry = await strapi.db
      .query('api::test.test')
      .findOne({ ...ctx.params, populate: { files: true } })

    const files = entry.files.map((file) => file)

  // Delete the files from the upload plugin (including provider-specific logic)
	if (entry.files) {
    await Promise.all(
      entry.files.map((file) =>
        strapi.plugins['upload'].services.upload.remove(file)
      )
    )
  }
}
```

Para garantir que a lógica de exclusão de arquivos se aplique também às operações em massa, precisamos criar a mesma lógica para as operações de exclusão em massa, além das operações de exclusão individual, pois o Strapi fornece lifecycle hooks diferentes para cada caso:

```tsx
// ./src/api/test/content-types/test/lifecycles.ts

export default {
  async beforeDelete(ctx) {
    const entry = await strapi.db
      .query('api::test.test')
      .findOne({ ...ctx.params, populate: { files: true } })

    if (entry.files) {
      await Promise.all(
        entry.files.map((file) =>
          strapi.plugins['upload'].services.upload.remove(file)
        )
      )
    }
  },
  async beforeDeleteMany(ctx) {
    const entries = await strapi.db
      .query('api::test.test')
      .findMany({ ...ctx.params, populate: { files: true } })

    await Promise.all(
      entries.map(async (entry) => {
        if (entry.files) {
          await Promise.all(
            entry.files.map(async (file) => {
              await strapi.plugins['upload'].services.upload.remove(file)
            })
          )
        }
      })
    )
  }
}
```

Agora, podemos criar duas ou mais entradas com arquivos únicos e múltiplos e testar se, ao excluirmos essas entradas (uma ou várias), todos os arquivos de mídia também são excluídos e se eles estão sendo excluídos do seu bucket no AWS S3.

Você pode prosseguir com as seguintes etapas para testar a exclusão de arquivos associados a entradas no Strapi:

1. Crie duas ou mais entradas com arquivos únicos ou múltiplos anexados a elas.
2. Acione a exclusão das entradas, individualmente ou em massa.

Para testar a exclusão por meio da API do Strapi, você pode criar um botão ou fazer uma solicitação para o endpoint **`localhost:1337/api/tests/:id`**. Substitua **`:id`** pelo ID real da entrada que você deseja excluir.

Ao excluir a entrada, os arquivos associados também devem ser excluídos tanto do Strapi quanto da AWS S3, se os lifecycles hooks e a lógica de exclusão de arquivos forem implementados corretamente.

Por favor, certifique-se de usar o endpoint e o ID corretos ao fazer a solicitação da API para excluir a entrada. Além disso, verifique se os arquivos estão sendo excluídos tanto do Strapi quanto do seu bucket no AWS S3 após a exclusão.

## **Conclusão**

A única operação de "CRUD" que não abordamos é a atualização de um arquivo. No entanto, essa operação geralmente não oferece uma boa experiência para o usuário, pois os usuários normalmente optam por excluir o arquivo existente e fazer upload de um novo. No entanto, em casos como atualizar um avatar de perfil, pode ser bastante útil. Para isso, talvez seja necessário personalizar o gerenciamento de mídia do Strapi com os lifecycles hooks, mas se você seguir nosso exemplo, isso não será um desafio.

Este artigo descreve vários casos de uso e como lidar com arquivos no React, com foco especial no upload e download de arquivos. O artigo não explora a lógica de upload e exclusão de arquivos usando o AWS SDK, pois o Strapi lida com esses aspectos em nosso exemplo. No entanto, se desejar, posso criar um artigo separado abordando esses tópicos. Por favor, deixe um comentário abaixo se você quiser que eu prossiga com isso.

Espero que este artigo seja útil para você. Se tiver alguma dúvida ou sugestão para melhorar qualquer um dos exemplos mostrados aqui, fique à vontade para comentar abaixo. Até breve!