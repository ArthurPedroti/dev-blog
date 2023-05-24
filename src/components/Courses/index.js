import React from 'react'
import * as S from './styles'
import PostItem from '../../components/PostItem'
import getThemeColor from '../../utils/getThemeColor'
import * as P from '../../components/Post/styles'

const categoriesWithContrastColor = ['react', 'js']

const Courses = () => (
  <>
    <P.PostHeader>
      <P.PostTitle>Books and Courses</P.PostTitle>
      <P.PostDescription>A list of all my books and courses</P.PostDescription>
    </P.PostHeader>
    {/* <P.MainContent> */}
    <S.PostItemLink
      cover
      direction="right"
      bg={getThemeColor()}
      duration={0.6}
      to="test"
    >
      <S.PostItemWrapper>
        <S.PostItemTag
          textColor={
            categoriesWithContrastColor.includes('yellow') ? '#333' : null
          }
          background="yellow"
        >
          JS
        </S.PostItemTag>
        <S.PostItemInfo>
          <S.PostItemTitle>
            Como escrever as melhores linhas do seu currículo
          </S.PostItemTitle>
          <S.PostItemDescription>
            Aprenda a dar os primeiros passos no mundo Open Source
          </S.PostItemDescription>
        </S.PostItemInfo>
      </S.PostItemWrapper>
    </S.PostItemLink>
    {/* <PostItem
        // key={title}
        // slug={slug}
        // background={background}
        // category={category}
        // date={date}
        // timeToRead={timeToRead}
        title="Como escrever as melhores linhas do seu currículo"
        description="Aprenda a como começar no mundo Open Source"
      /> */}
    {/* </P.MainContent> */}
  </>
)

export default Courses
