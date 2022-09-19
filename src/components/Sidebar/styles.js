import styled from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.aside`
  align-items: center;
  border-right: 1px solid var(--borders);
  background: var(--mediumBackground);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  padding: 2rem;
  text-align: center;
  width: 20rem;

  ${media.lessThan('large')`
    flex-direction: row;
    border-right: 0;
    align-items: center;
    height: auto;
    padding: 1rem 2rem;
    width: 100%;

    div.sidebarlinks {
      margin-left: auto;
    }

    a.kofi-button {
      margin-left: 12px !important;
      margin-bottom: 0px !important;
    }
  `}

  span.kofitext {
    color: var(--texts) !important;
    letter-spacing: -0.15px !important;
    text-wrap: none;
    vertical-align: middle;
    line-height: 33px !important;
    padding: 0;
    text-align: center;
    text-decoration: none !important;
    text-shadow: 0 1px 1px rgba(34, 34, 34, 0.05);
  }
  a.kofi-button {
    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
    line-height: 36px !important;
    min-width: 150px;
    display: inline-block !important;
    background-color: #29abe0;
    padding: 2px 12px !important;
    text-align: center !important;
    border-radius: 7px;
    color: #fff;
    cursor: pointer;
    overflow-wrap: break-word;
    vertical-align: middle;
    border: 0 none #fff !important;
    font-family: 'Quicksand', Helvetica, Century Gothic, sans-serif !important;
    text-decoration: none;
    text-shadow: none;
    font-weight: 700 !important;
    font-size: 14px !important;
    margin-bottom: 12px !important;
  }

  img.kofiimg {
    display: initial !important;
    vertical-align: middle;
    height: 13px !important;
    width: 20px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    border: none;
    margin-top: 0;
    margin-left: 5px !important;
    margin-right: 0 !important;
    margin-bottom: 3px !important;
    content: url('https://storage.ko-fi.com/cdn/cup-border.png');

    @keyframes kofi-wiggle {
      0% {
        transform: rotate(0) scale(1);
      }
      60% {
        transform: rotate(0) scale(1);
      }
      75% {
        transform: rotate(0) scale(1.12);
      }
      80% {
        transform: rotate(0) scale(1.1);
      }
      84% {
        transform: rotate(-10deg) scale(1.1);
      }
      88% {
        transform: rotate(10deg) scale(1.1);
      }
      92% {
        transform: rotate(-10deg) scale(1.1);
      }
      96% {
        transform: rotate(10deg) scale(1.1);
      }
      100% {
        transform: rotate(0) scale(1);
      }
    }

    height: 15px !important;
    width: 22px !important;
    display: initial;
    animation: 'kofi-wiggle' 3s infinite;
  }

  img.newsimg {
    display: initial !important;
    vertical-align: middle;
    height: 13px !important;
    width: 20px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    border: none;
    margin-top: 0;
    margin-left: 5px !important;
    margin-right: 0 !important;
    margin-bottom: 3px !important;
    content: url('https://cdn-icons-png.flaticon.com/512/2218/2218521.png');

    @keyframes news-wiggle {
      0% {
        transform: rotate(0) scale(1);
      }
      60% {
        transform: rotate(0) scale(1);
      }
      75% {
        transform: rotate(0) scale(1.12);
      }
      80% {
        transform: rotate(0) scale(1.1);
      }
      84% {
        transform: rotate(-10deg) scale(1.1);
      }
      88% {
        transform: rotate(10deg) scale(1.1);
      }
      92% {
        transform: rotate(-10deg) scale(1.1);
      }
      96% {
        transform: rotate(10deg) scale(1.1);
      }
      100% {
        transform: rotate(0) scale(1);
      }
    }

    height: 18px !important;
    width: 20px !important;
    display: initial;
    animation: 'news-wiggle' 3s infinite;
  }
`
