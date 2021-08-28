import React from 'react'

import links from './content'

import * as S from './styles'

const MenuLinks = () => (
  <S.Wrapper>
    <S.MenuLinksList>
      {links.map((link, i) => (
        <S.MenuLinksItem key={i}>
          <S.MenuLinksLink to={link.url} activeClassName="active">
            {link.label}
          </S.MenuLinksLink>
        </S.MenuLinksItem>
      ))}
    </S.MenuLinksList>
  </S.Wrapper>
)

export default MenuLinks
