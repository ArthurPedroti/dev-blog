import * as React from 'react'
import PropTypes from 'prop-types'
import { TransitionPortal } from 'gatsby-plugin-transition-link'
import Particles from '../Particles'

import * as S from './styles'
import GlobalStyles from '../../styles/global'

import Sidebar from '../Sidebar'
import MenuBar from '../MenuBar'

const Layout = ({ children }) => {
  return (
    <S.LayoutWrapper>
      <GlobalStyles />
      <TransitionPortal level="top">
        <Sidebar />
      </TransitionPortal>
      <S.LayoutMain>
        <main>{children}</main>
      </S.LayoutMain>
      <TransitionPortal level="top">
        <MenuBar />
        <Particles />
      </TransitionPortal>
    </S.LayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
