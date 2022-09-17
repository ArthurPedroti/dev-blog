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
      title="Me compre um café"
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW73A5JpwXNXuVwwi-kgw9kwU14UuQVEIi0Q&usqp=CAU"
          alt="Ko-fi donations"
          className="kofiimg"
        />
      </span>
    </a>
  </S.Wrapper>
)

export default NewsletterForm
