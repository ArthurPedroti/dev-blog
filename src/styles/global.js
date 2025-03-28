import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background: #16202c;
    line-height: 1;
    font-size: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  img {
    display: block;
  	width: 100%;
  	height: auto;
  }
  body.dark  {
    --borders: #4C566A;
    --texts: #D8DEE9;
    --postColor: #fff;
    --highlight: #EBCB8B;
    --mediumBackground: #3B4252;
    --background: #2E3440;
    --white: #fff;
    --black: #222;
    --red: #BF616A;
    --orange: #D08770;
    --yellow: #EBCB8B;
    --green: #A3BE8C;
    --purple: #B48EAD;
    --blue: #5E81AC;
    --frost-green: #8FBCBB;
    --frost-cian: #88C0D0;
    --frost-blue: #81A1C1;
  }
  body.light {
    --borders: #dedede;
    --postColor: #2E3440;
    --texts: #555555;
    --highlight: #1fa1f2;
    --mediumBackground: #f0f0f3;
    --background: #fff;
    --white: #fff;
    --black: #222;
    --red: #2E3440;
    --orange: #D08770;
    --yellow: #EBCB8B;
    --green: #A3BE8C;
    --purple: #B48EAD;
    --blue: #5E81AC;
    --frost-green: #5E81AC;
    --frost-cian: #5E81AC;
    --frost-blue: #81A1C1;
  }
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: var(--borders);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--frost-blue);
    border-radius: 0;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--blue);
  }
  .gatsby-remark-prismjs-copy-button-container {
    touch-action: none;
    display: flex;
    justify-content: flex-end;
    position: relative;
    top: 40px;
    left: -34px;
    margin-top: -28px;
    z-index: 1;
    pointer-events: none;
  }
  .gatsby-remark-prismjs-copy-button {
    cursor: pointer;
    pointer-events: initial;
    font-size: 13px;
    padding: 4px 6px 6px 6px;
    border-radius: 3px;
    color: rgba(255, 255, 255, 0.6);
  }
  .gatsby-remark-prismjs-copy-button:hover {
    background: var(--yellow);
    color: var(--background);
  }
  @media(max-width: 600px) {
    .gatsby-remark-prismjs-copy-button {
      background: var(--yellow);
      color: var(--background);
    }
  }
`
export default GlobalStyles
