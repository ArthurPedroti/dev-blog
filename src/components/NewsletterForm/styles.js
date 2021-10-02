import styled from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  color: var(--postColor);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.7;
  padding: 0 1.4rem;
  ${media.lessThan('large')`
      padding: 0 1rem;
      word-break: break-word;
    `}

  iframe {
    width: 50rem;
    margin-top: -4rem;
    padding: 0 0.5rem;
    height: 30rem;
    border: 0;

    ${media.lessThan('large')`
      height: 40rem;
    `}
  }
`
