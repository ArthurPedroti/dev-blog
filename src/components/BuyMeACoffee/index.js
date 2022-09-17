import React from 'react'
import * as S from './styles'

const BuyMeACoffee = () => (
  <S.Wrapper>
    <h3>
      Me compre um café{' '}
      <img
        src="https://storage.ko-fi.com/cdn/cup-border.png"
        alt="Ko-fi donations"
        className="kofiimg title"
      />
    </h3>
    <p>
      E como um bom programador, eu sei que você adora um cafézinho! Então por
      que você não me ajuda e me dá um cafézinho também?💙
    </p>
    <p>
      Com apenas R$5,00 reais você me ajudar, e <strong>principalmente</strong>,
      continuar me incentivando a trazer mais conteúdos totalmente gratuitos
      para toda a comunidade, basta apenas clicar no link abaixo, conto com a
      sua colaboração😉
    </p>
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
  </S.Wrapper>
)

export default BuyMeACoffee
