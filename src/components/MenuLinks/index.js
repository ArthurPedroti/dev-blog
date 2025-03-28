import React from 'react'

import links from './content'
import getThemeColor from '../../utils/getThemeColor'

import * as S from './styles'

const MenuLinks = () => (
  <S.Wrapper>
    <S.MenuLinksList>
      {links.map((link, i) => {
        if (link.highlight) {
          return (
            <S.MenuLinksItem key={i}>
              <S.HighlightLink
                cover
                direction="left"
                bg={getThemeColor()}
                duration={0.6}
                to={link.url}
                activeClassName="active"
              >
                {link.label}
              </S.HighlightLink>
            </S.MenuLinksItem>
          )
        }
        return (
          <S.MenuLinksItem key={i}>
            <S.MenuLinksLink
              cover
              direction="left"
              bg={getThemeColor()}
              duration={0.6}
              to={link.url}
              activeClassName="active"
            >
              {link.label}
            </S.MenuLinksLink>
          </S.MenuLinksItem>
        )
      })}
    </S.MenuLinksList>
  </S.Wrapper>
)

export default MenuLinks
