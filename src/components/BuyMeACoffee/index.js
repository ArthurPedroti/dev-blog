/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import * as S from './styles'

const BuyMeACoffee = () => (
  <S.Wrapper>
    <h3>
      Buy Me a Coffee{' '}
      <img
        src="https://storage.ko-fi.com/cdn/cup-border.png"
        alt="Ko-fi donations"
        className="kofiimg title"
      />
    </h3>
    <p>
      As a good programmer, I know you love a little coffee! So why don't you
      help me have a coffee while I produce this content for the whole
      community?💙
    </p>
    <p>
      With just $3.00, you can help me, and <strong>more importantly</strong>,
      continue to encourage me to bring more completely free content to the
      whole community. You just need to click on the link below, I'm counting on
      your contribution 😉.
    </p>
    <a
      title="Buy Me a Coffee"
      className="kofi-button"
      style={{
        'background-color': 'var(--borders)'
      }}
      href="https://ko-fi.com/Q5Q31DJ46"
      target="_blank"
      rel="noreferrer"
    >
      <span className="kofitext">
        Buy Me a Coffee{' '}
        <img
          src="https://storage.ko-fi.com/cdn/cup-border.png"
          alt="Ko-fi donations"
          className="kofiimg"
        />
      </span>
    </a>
  </S.Wrapper>
)

export default BuyMeACoffee
