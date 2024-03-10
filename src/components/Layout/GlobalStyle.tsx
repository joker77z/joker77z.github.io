import { Global, css } from '@emotion/react';

const defaultStyle = css`
  @font-face {
    font-family: 'Arita-buri-SemiBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Arita-buri-SemiBold.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  li {
    list-style: none;
  }

  h1,
  h2,
  h3 {
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

  a {
    /* 링크 컬러 */
    color: var(--gray-500);
    text-decoration: none;
    cursor: pointer;
  }

  :root {
    --gray-900: #333333;
    --gray-800: #444444;
    --gray-700: #555555;
    --gray-600: #666666;
    --gray-500: #777777;
    --gray-400: #888888;
    --gray-300: #999999;
    --gray-200: #aaaaaa;
    --gray-100: #cccccc;

    --link-hover-bg-color: var(--gray-900);
  }

  /* 화이트 */
  body {
    color: var(--text-color);
    background: var(--bg-color);
    --text-color: black;

    /* 액티브 된 링크 컬러 */
    --activeLink-text-color: black;
    --activeLink-hover-text-color: black;
  }

  /* 다크 */
  body.dark {
    --bg-color: black;
    --text-color: white;

    /* 액티브 된 링크 컬러 */
    --activeLink-text-color: white;
    --activeLink-hover-text-color: white;
  }
`;

export default function GlobalStyle() {
  return <Global styles={defaultStyle} />;
}
