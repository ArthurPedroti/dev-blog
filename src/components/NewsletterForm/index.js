import React from 'react'
import * as S from './styles'

const NewsletterForm = () => (
  <S.Wrapper>
    <h3>Assine o nosso Newsletter!</h3>
    <p>
      Ao assinar o nosso newsletter, você será avisado toda a vez que surgir um
      novo post, não perca essa oportunidade e fique por dentro de todas as
      novidades!
    </p>
    <a
      title="Inscrever-se"
      className="news-button"
      style={{
        'background-color': 'var(--borders)'
      }}
      href="https://arthurpedroti.us12.list-manage.com/subscribe?u=7fce39450b6e24cfe996509ec&id=9df3580a54"
      target="_blank"
      rel="noreferrer"
    >
      <span className="newstext">
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

export default NewsletterForm
