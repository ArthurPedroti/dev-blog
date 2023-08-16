---
title: How to use relationships with User Table in Strapi (using REST API)
description: Dealing with some Strapi limitations for user relationships
date: 2023-08-16 03:06:31
image: assets/img/how-to-use-relationships-with-user-table-in-strapi-using-rest-api-.png
category: js
background: "#D6BA32"
---
## Introduction

Strapi is an open-source headless CMS based on Nodejs and used in designing APIS and managing content. Strapi helps us scaffold our backend quickly, build APIs and consume the APIs from the client side. The client can be mobile, web, desktop, cURL, etc.

It’s a great tool to improve and streamline your team, but it has some limitations that you’ll need to work around according to your demand.

One such limitation is a very common use case when you need to have a table with a relationship to your user’s table. Strapi by default has a user table, created by a plugin called “users permissions”, which handles all your app users, authentication, passwords, etc.

But by default, Strapi blocks all user information from it’s REST API, remembering that REST API is automatically created by Strapi, but with this limitation it can become useless in the default configuration, and you will need to customize this REST API to be able to handle it with users relationships.

## The problem

In this example, we will create a table (content type) called **orders**, which has one field and two relations, one with a random table, and the other with a user table (from user permissions):

![Order Content Type](assets/img/how-to-use-relationships-with-user-table-in-strapi-with-rest-api-01.png "Order Content Type")

Now let’s create a entry with Strapi's standard REST API, to see what happens (remembering that we need to enable the routes of this new content type on users-and-permissions plugin):

![Order Post Request creating a order](assets/img/how-to-use-relationships-with-user-table-in-strapi-with-rest-api-02.png "Order Post Request creating a order")

![Order Content Type with a order without user](assets/img/how-to-use-relationships-with-user-table-in-strapi-with-rest-api-03.png "Order Content Type with a order without user")

Note that the user field was not filled in, and it’s not because we made the wrong request, it’s because Strapi blocks it in its sanitization.

## Customizing our REST API

So, to get around this issue, we will need to customize our REST API.

The Strapi docs have the instructions to customizing the core operations of your REST API, and in this example we’ll use a Typescript project.

Now let’s recreate Strapi's default controller:

```tsx
/**
 * order controller
 * src/api/order/controllers/order.ts
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order', () => ({
  async create(ctx) {
    const { body: data } = ctx.request
    const sanitizedInputData = await this.sanitizeInput(data, ctx)

    const entity = await strapi
      .service('api::order.order')
      .create(sanitizedInputData)

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)

    console.log(data)
    console.log(sanitizedInputData)
    console.log(entity)
    console.log(sanitizedEntity)
    console.log(this.transformResponse(sanitizedEntity))

    return this.transformResponse(sanitizedEntity)
  }
}))
```

```tsx
// console.log

// data
{ data: { name: 'Order 01', user: 2, department: 2 } }
// sanitizedInputData
{ data: { name: 'Order 01', user: 2, department: 2 } }

// entity
{
  id: 20,
  name: 'Order 01',
  createdAt: '2023-08-16T12:29:39.331Z',
  updatedAt: '2023-08-16T12:29:39.331Z'
}

// sanitizedEntity
{
  id: 20,
  name: 'Order 01',
  createdAt: '2023-08-16T12:29:39.331Z',
  updatedAt: '2023-08-16T12:29:39.331Z'
}

// this.transformResponse(sanitizedEntity)
{
  data: {
    id: 20,
    attributes: {
      name: 'Order 01',
      createdAt: '2023-08-16T12:29:39.331Z',
      updatedAt: '2023-08-16T12:29:39.331Z'
    }
  },
  meta: {}
}
```

Only by recreating the core controller can we create the relationship with the users:

![Order Content Type with a order with user](assets/img/how-to-use-relationships-with-user-table-in-strapi-with-rest-api-04.png "Order Content Type with a order with user")

In the creation of the standards controller by Strapi, there is a sanitization before the creation of the controller itself, and as we see, the sanitization in the Strapi docs in controller itself is not responsible for removing the user data from the input request.

Implementation an update is very familiar and we can update the user relationship:

```tsx
async update(ctx) {
  const { id } = ctx.params
  const { body: data } = ctx.request
  const sanitizedInputData = await this.sanitizeInput(data, ctx)

  const entity = await strapi
    .service('api::order.order')
    .update(id, sanitizedInputData)
  const sanitizedEntity = await this.sanitizeOutput(entity, ctx)

  return this.transformResponse(sanitizedEntity)
}
```

We don’t need to change the delete method, the most important/delicate is the **find** method, because as we said, Strapi does this (remove user relationship from REST API) precisely because the query params when we ask to show the user information, give us all the user information entry, with passwords and some sensitive information.

And in this case, we need to recreate the controller with some care:

```tsx
async find(ctx) {
  const sanitizedQuery = await this.sanitizeQuery(ctx)

  const { results, pagination } = (await strapi
    .service('api::order.order')
    .find(sanitizedQuery)) as any

  const sanitizedResults = await this.sanitizeOutput(results, ctx)

  console.log(sanitizedQuery)
  console.log(results)
  console.log(sanitizedResults)

  return this.transformResponse(sanitizedResults, { pagination })
}
```

```tsx
// console.log

// sanitizedQuery
{ populate: '*' }

// results
[
  {
    id: 20,
    name: 'Order 01',
    createdAt: '2023-08-16T12:29:39.331Z',
    updatedAt: '2023-08-16T12:47:00.432Z',
    department: {
      id: 2,
      name: 'IT',
      createdAt: '2022-11-23T20:21:10.445Z',
      updatedAt: '2023-08-16T11:36:43.129Z'
    },
    user: {
      id: 2,
      username: 'arthurpedroti',
      email: 'arthur.pedroti@agfequipamentos.com.br',
      provider: 'local',
      password: '$2a$10$VTKeJfI1Iy2OgTRMK83QKeG63PuNfZz12JKuMBCmwv43sijoOItzW',
      resetPasswordToken: null,
      confirmationToken: null,
      confirmed: true,
      blocked: false,
      name: 'Arthur Pedroti',
      protheusCode: '000050',
      createdAt: '2022-10-31T14:38:37.493Z',
      updatedAt: '2023-02-02T17:33:43.955Z'
    },
    createdBy: null,
    updatedBy: null
  }
]

// sanitizedResults
[
  {
    id: 20,
    name: 'Order 01',
    createdAt: '2023-08-16T12:29:39.331Z',
    updatedAt: '2023-08-16T12:47:00.432Z',
    department: {
      id: 2,
      name: 'IT',
      createdAt: '2022-11-23T20:21:10.445Z',
      updatedAt: '2023-08-16T11:36:43.129Z'
    }
  }
]
```

As we can see on console.log, the sanitizeOutput function removes all the user information from the response before sending it.

So to pass the user information we’ll need to create our own method to sanitize the response before we send it, so that it does not pass sensitive information. And for that, we can adapt it to each use case and its context.

```tsx
export default factories.createCoreController(
  'api::order.order',
  ({ strapi }) => ({
    async find(ctx) {
      const sanitizedQuery = await this.sanitizeQuery(ctx)

      const { results, pagination } = (await strapi
        .service('api::order.order')
        .find(sanitizedQuery)) as any

      const sanitizedResults = await this.sanitizeOutput(results, ctx)

      function customSanitizeOutput(uid: string, strapi, rawOutput) {
        const contentType = strapi.contentType(uid)
        const { attributes } = contentType

        Object.keys(attributes).forEach((attribute) => {
          if (
            attributes[attribute].target === 'plugin::users-permissions.user'
          ) {
            rawOutput.forEach((item) => {
              if (item[attribute]) {
                const originalItem = item[attribute]
                item[attribute] = {
				  id: originalItem.id,
                  username: originalItem.username,
                  email: originalItem.email
                }
              }

              delete item.createdBy
              delete item.updatedBy
            })
          }
        })
      }

      customSanitizeOutput('api::order.order', strapi, results)

      console.log(sanitizedResults)
      console.log(results)

      return this.transformResponse(results, { pagination })
    }
  })
)
```

```tsx
// console.log

// sanitizedResults
[
  {
    id: 20,
    name: 'Order 01',
    createdAt: '2023-08-16T12:29:39.331Z',
    updatedAt: '2023-08-16T13:32:02.108Z',
    department: {
      id: 2,
      name: 'IT',
      createdAt: '2022-11-23T20:21:10.445Z',
      updatedAt: '2023-08-16T11:36:43.129Z'
    }
  }
]

// results
[
  {
    id: 20,
    name: 'Order 01',
    createdAt: '2023-08-16T12:29:39.331Z',
    updatedAt: '2023-08-16T13:32:02.108Z',
    department: {
      id: 2,
      name: 'IT',
      createdAt: '2022-11-23T20:21:10.445Z',
      updatedAt: '2023-08-16T11:36:43.129Z'
    },
    user_information: {
			id: 2,
      username: 'arthurpedroti',
      email: 'arthur.pedroti@agfequipamentos.com.br'
    }
  }
]
```

In this example I create a new function **customSanitizeOutput** that receives the id of our table, the strapi method to get the table information, and the results to sanitize.

Basically, we get the table (content-type) information with `strapi.contentType(uid)`, and look up which fields have the user relation:

`attributes[attribute].target === 'plugin::users-permissions.user'`

If yes, we loop through the array deleting all fields we don’t want to use, in this example I just keep the id, username and email.

By creating a function, we can abstract it from the controller and reuse it in other controllers that we need the same results, and this function doesn’t care about the name of our field with its relationship to the user's table.

And finally, if you want to filter the entries by user, you can’t use **sanitizeQuery** because that will remove your filter, so you will need to create your own sanitize query function or remove it:

```tsx
async find(ctx) {
  const { results, pagination } = (await strapi
    .service('api::order.order')
    .find(ctx.query)) as any

  customSanitizeOutput('api::order.order', strapi, results)

  return this.transformResponse(results, { pagination })
}
```

If you really want to create a reliable query sanitizer, just copy from Strapi sanitizer and customize it to not remove user fields.

## Conclusion

This is my way to work around this limitation of sensitive user table information in Strapi. It’s simple, but important to be documented so we understand what we did, and useful in the future for us to replicate this whenever we need the same approach.

I hope this article can be useful for you and if you have dealt with it in another way then comment and share with us below, if you make any improvement in this solution we show, then share with us too, see you soon!