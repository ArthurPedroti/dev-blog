import React from 'react'
import PropTypes from 'prop-types'
import getThemeColor from '../../utils/getThemeColor'

import * as S from './styles'

const PostItem = ({
  slug,
  background,
  category,
  date,
  timeToRead,
  title,
  description
}) => {
  const categoriesWithContrastColor = ['react', 'js']

  return (
    <S.PostItemLink
      cover
      direction="right"
      bg={getThemeColor()}
      duration={0.6}
      to={slug}
    >
      <S.PostItemWrapper>
        <S.PostItemTag
          textColor={
            categoriesWithContrastColor.includes(category) ? '#333' : null
          }
          background={background}
        >
          {category}
        </S.PostItemTag>
        <S.PostItemInfo>
          <S.PostItemDate>
            {date} • {timeToRead} min de leitura
          </S.PostItemDate>
          <S.PostItemTitle>{title}</S.PostItemTitle>
          <S.PostItemDescription>{description}</S.PostItemDescription>
        </S.PostItemInfo>
      </S.PostItemWrapper>
    </S.PostItemLink>
  )
}

PostItem.propTypes = {
  slug: PropTypes.string.isRequired,
  background: PropTypes.string,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default PostItem
