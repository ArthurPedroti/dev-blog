import React from 'react'
import PropTypes from 'prop-types'
import ReactDisqusComments from 'react-disqus-comments'

import * as S from './styles'

const Comments = ({ url, title }) => {
  const completeURL = `https://dev.arthurpedroti.com.br${url}`

  return (
    <S.Wrapper>
      <S.CommentsTitle>Comentários</S.CommentsTitle>
      <ReactDisqusComments
        shortname="arthurpedroti"
        identifier={completeURL}
        title={title}
        url={completeURL}
      />
    </S.Wrapper>
  )
}

Comments.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
export default Comments
