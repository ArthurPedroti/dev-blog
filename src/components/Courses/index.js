import React from 'react'
import * as S from './styles'
import getThemeColor from '../../utils/getThemeColor'
import * as P from '../../components/Post/styles'

const Courses = () => (
  <>
    <P.PostHeader
      style={{
        borderBottom: '1px solid var(--borders)',
        paddingBottom: '48px'
      }}
    >
      <P.PostTitle>Livros e Cursos</P.PostTitle>
      <P.PostDescription>
        Uma lista de todos os meus livros e cursos com 10% de desconto! (Use o
        cupom <strong>BLOG</strong>)
      </P.PostDescription>
    </P.PostHeader>
    {/* <P.MainContent> */}
    <S.PostItemLink
      cover
      direction="right"
      bg={getThemeColor()}
      duration={0.6}
      target="_blank"
      href="https://cursos.arthurpedroti.com.br/melhores-linhas/"
    >
      <S.PostItemWrapper>
        <S.PostItemTag
          textColor={'var(--background)'}
          background={'var(--frost-cian)'}
        >
          E-book
        </S.PostItemTag>
        <S.PostItemInfo>
          <S.PostItemTitle>
            Como escrever as Melhores Linhas do seu Currículo (para devs)
          </S.PostItemTitle>
          <S.PostItemDescription>
            Aprenda a dar os primeiros passos no mundo Open Source
          </S.PostItemDescription>
        </S.PostItemInfo>
      </S.PostItemWrapper>
    </S.PostItemLink>
    {/* <S.PostItemLink
      cover
      direction="right"
      bg={getThemeColor()}
      duration={0.6}
      target="_blank"
      href="https://cursos.arthurpedroti.com.br/melhores-linhas/"
    >
      <S.PostItemWrapper>
        <S.PostItemTag
          textColor={'var(--background)'}
          background={'var(--green)'}
        >
          Curso
        </S.PostItemTag>
        <S.PostItemInfo>
          <S.PostItemTitle>Open Source na Prática</S.PostItemTitle>
          <S.PostItemDescription>
            Aprenda todas as formas de contribuir com um passo a passo detalhado
            de como contribuir para o mundo Open Source
          </S.PostItemDescription>
        </S.PostItemInfo>
      </S.PostItemWrapper>
    </S.PostItemLink> */}
    {/* </P.MainContent> */}
  </>
)

export default Courses
