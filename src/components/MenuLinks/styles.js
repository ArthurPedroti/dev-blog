import styled from 'styled-components'
import media from 'styled-media-query'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

export const Wrapper = styled.nav`
  margin-bottom: 1rem;

  ${media.lessThan('large')`
    display: none;
  `}
`

export const MenuLinksList = styled.ul`
  font-size: 1.2rem;
  font-weight: 300;
`

export const MenuLinksItem = styled.li`
  padding: 0.5rem 0;
  .active {
    color: var(--highlight);
  }
`

export const MenuLinksLink = styled(AniLink)`
  color: var(--texts);
  text-decoration: none;
  transition: color 0.5s;
  &:hover {
    color: var(--highlight);
  }
`

export const HighlightLink = styled(AniLink)`
  color: var(--texts);
  text-decoration: none;
  transition: color 0.5s;
  font-weight: 700;

  /* Fallback: Set a background color. */
  background-color: var(--texts);

  /* Create the gradient. */
  background-image: linear-gradient(
    45deg,
    var(--green) 16.666%,
    var(--frost-green) 16.666%,
    var(--frost-green) 33.333%,
    var(--frost-cian) 50%,
    var(--frost-cian) 66.666%,
    var(--frost-blue) 66.666%,
    var(--frost-blue) 83.333%,
    var(--blue) 83.333%
  );

  /* Set the background size and repeat properties. */
  background-size: 100%;
  background-repeat: repeat;

  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Animate the text when loading the element. */
  /* This animates it on page load and when hovering out. */
  animation: rainbow-text-simple-animation-rev 0.75s ease forwards;

  /* Move the background and make it smaller. */
  /* Animation shown when entering the page and after the hover animation. */
  @keyframes rainbow-text-simple-animation-rev {
    0% {
      background-size: 650%;
    }
    40% {
      background-size: 650%;
    }
    100% {
      background-size: 100%;
    }
  }

  /* Move the background and make it larger. */
  /* Animation shown when hovering over the text. */
  @keyframes rainbow-text-simple-animation {
    0% {
      background-size: 100%;
    }
    80% {
      background-size: 650%;
    }
    100% {
      background-size: 650%;
    }
  }

  &:hover {
    /* color: var(--highlight); */
    animation: rainbow-text-simple-animation 0.5s ease-in forwards;
  }
`
