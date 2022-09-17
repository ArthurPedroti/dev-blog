import React from 'react'
import * as S from './styles'

const BuyMeACoffee = () => (
  <S.Wrapper>
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
        <img
          src="https://storage.ko-fi.com/cdn/cup-border.png"
          alt="Ko-fi donations"
          className="kofiimg"
        />
        Me compre um café💙
      </span>
    </a>
  </S.Wrapper>
)

export default BuyMeACoffee
