import React from 'react'

import * as S from './styles'

const UtterancesComments = ({ commentBox }) => {
  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comments</S.CommentsTitle>
      <div ref={commentBox} />
    </S.CommentsWrapper>
  )
}

export default UtterancesComments
