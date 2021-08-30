import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostItem from '../components/PostItem'
import Seo from '../components/seo'

const BlogList = (props) => {
  const postList = props.data.allMarkdownRemark.edges

  return (
    <Layout>
      <Seo title="Home" />
      {postList.map(
        ({
          node: {
            frontmatter: { background, category, date, description, title },
            timeToRead,
            fields: { slug }
          }
        }) => (
          <PostItem
            key={title}
            slug={slug}
            background={background}
            category={category}
            date={date}
            timeToRead={timeToRead}
            title={title}
            description={description}
          />
        )
      )}
    </Layout>
  )
}

export const query = graphql`
  query PostList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            background
            category
            date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
            description
            title
          }
          fields {
            slug
          }
          timeToRead
        }
      }
    }
  }
`

export default BlogList
