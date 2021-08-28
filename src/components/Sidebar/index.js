import React from 'react'
import * as S from './styles'
import Profile from '../Profile'
import SocialLinks from '../SocialLinks'
import MenuLinks from '../MenuLinks'

const Sidebar = () => (
  <S.Wrapper>
    <Profile />
    <SocialLinks />
    <MenuLinks />
  </S.Wrapper>
)

export default Sidebar
