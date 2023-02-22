/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import * as S from './styles'

const NewsletterForm = () => (
  <S.Wrapper>
    <h3>Subscribe to our Newsletter!</h3>
    <p>
      By subscribing to our newsletter, you will be notified every time a new
      post appears. Don't miss this opportunity and stay up-to-date with all the
      news!
    </p>
    <a
      title="Subscribe"
      className="news-button"
      style={{
        'background-color': 'var(--borders)'
      }}
      href="https://arthurpedroti.us12.list-manage.com/subscribe?u=7fce39450b6e24cfe996509ec&id=9df3580a54"
      target="_blank"
      rel="noreferrer"
    >
      <span className="newstext">
        Subscribe!{' '}
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
