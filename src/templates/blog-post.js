import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/seo'
import RecommendedPosts from '../components/RecommendedPosts'
import UtterancesComments from '../components/UtterancesComments'
import { appendComments } from '../utils/appendComments'

import * as S from '../components/Post/styles'
import BuyMeACoffee from '../components/BuyMeACoffee'
// import Comments from '../components/Comments'

const BlogPost = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const next = pageContext.nextPost
  const previous = pageContext.previousPost
  const commentBox = React.createRef()

  useEffect(() => {
    appendComments(commentBox)
  }, [])

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
      />
      <S.PostHeader>
        <S.PostDate>
          {post.frontmatter.date} • {post.timeToRead} min de leitura
        </S.PostDate>
        <S.PostTitle>{post.frontmatter.title}</S.PostTitle>
        <S.PostDescription>{post.frontmatter.description}</S.PostDescription>
      </S.PostHeader>
      <S.MainContent>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        <hr />
        <S.BuyMeACoffee>
          <div>
            <p>
              E como um bom programador, eu sei que você adora um cafézinho!
              Então por que você não me ajuda e me dá um cafézinho também?💙
            </p>
            <p>
              Com apenas R$5,00 reais você me ajuda, e{' '}
              <strong>principalmente</strong>, continua me incentivando a trazer
              mais conteúdos totalmente gratuitos para toda a comunidade, basta
              apenas clicar no link abaixo, conto com a sua colaboração😉
            </p>
          </div>
          <BuyMeACoffee />
        </S.BuyMeACoffee>
      </S.MainContent>
      <RecommendedPosts next={next} previous={previous} />
      <UtterancesComments commentBox={commentBox} />

      {/* <Comments url={post.fields.slug} title={post.frontmatter.title} /> */}
    </Layout>
  )
}

export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
        image
      }
      html
      timeToRead
    }
  }
`

export default BlogPost
