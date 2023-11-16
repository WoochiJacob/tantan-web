import { css } from '@emotion/react';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Tinos:wght@400;700&display=swap');
  
  @font-face {
      font-family: 'Spoqa Han Sans Neo';
      font-weight: 700;
      src: local('Spoqa Han Sans Neo Bold'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf') format('truetype');
  }


  @font-face {
      font-family: 'Spoqa Han Sans Neo';
      font-weight: 500;
      src: local('Spoqa Han Sans Neo Medium'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf') format('truetype');
  }

  @font-face {
      font-family: 'Spoqa Han Sans Neo';
      font-weight: 400;
      src: local('Spoqa Han Sans Neo Regular'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf') format('truetype');
  }

  @font-face {
      font-family: 'Spoqa Han Sans Neo';
      font-weight: 300;
      src: local('Spoqa Han Sans Neo Light'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.ttf') format('truetype');
  }

  @font-face {
      font-family: 'Spoqa Han Sans Neo';
      font-weight: 100;
      src: local('Spoqa Han Sans Neo Thin'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.ttf') format('truetype');
  }

  & {
    width: 250px;
    height: 140px;
    overflow: auto;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c8cdd2;
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: #dadada;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }

  body,
  html {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-weight: 300;
    letter-spacing: -0.2px;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #000;
  }

  #__next {
    position: relative;
    width: 100%;
    height: 100%;
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    word-wrap: break-word;
  }

  a {
      text-decoration: none;
      color: #000;

      &:hover,
      &:visited {
        text-decoration: none;
        color: #000;
      }
  }
`;

export default globalStyles;
