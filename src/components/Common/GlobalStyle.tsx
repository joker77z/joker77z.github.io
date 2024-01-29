import { Global, css } from '@emotion/react'

const defaultStyle = css`
  @font-face {
    font-family: 'Arita-buri-SemiBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Arita-buri-SemiBold.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  h1,
  h2 {
    font-weight: normal;
    font-size: 16px;
  }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Arita-buri-SemiBold';
    font-weight: normal;
    font-style: normal;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`

export default function GlobalStyle() {
  return <Global styles={defaultStyle} />
}
