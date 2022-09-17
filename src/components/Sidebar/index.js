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

    <a
      title="Me compre um café"
      className="kofi-button"
      style={{
        'background-color': 'var(--borders)'
      }}
      href="https://ko-fi.com/Q5Q31DJ46"
      target="_blank"
      rel="noreferrer"
    >
      <span className="kofitext">
        Me compre um café{' '}
        <img
          src="https://storage.ko-fi.com/cdn/cup-border.png"
          alt="Ko-fi donations"
          className="kofiimg"
        />
      </span>
    </a>
    <a
      title="Inscrever-se"
      className="kofi-button"
      style={{
        'background-color': 'var(--borders)'
      }}
      href="https://arthurpedroti.us12.list-manage.com/subscribe?u=7fce39450b6e24cfe996509ec&id=9df3580a54"
      target="_blank"
      rel="noreferrer"
    >
      <span className="kofitext">
        Inscrever-se!{' '}
        <img
          src="https://storage.ko-fi.com/cdn/cup-border.png"
          alt="Ko-fi donations"
          className="newsimg"
        />
      </span>
    </a>
  </S.Wrapper>
)

export default Sidebar
