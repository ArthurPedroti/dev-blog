import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import * as S from './styles'

const Avatar = () => {
  return (
    <S.AvatarWrapper>
      <StaticImage
        src="../../images/profile-photo.png"
        alt="Arthur Pedroti"
        placeholder="blurred"
      />
    </S.AvatarWrapper>
  )
}

export default Avatar
