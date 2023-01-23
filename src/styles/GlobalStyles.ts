import reset from 'styled-reset';
import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{
    margin: 0 auto ;
    background-color: #FFFFFF;
    font-family: "Noto Sans KR", sans-serif;

   }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
    padding:0 ;
  }


  select,input {
    border-style:none;
    background-color:transparent;
    border-radius: 0;
    appearance:none;
    -moz-appearance:none;
   -webkit-appearance:none;
  }
 
`;
// flex

export const OneLine = css`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const TwoLine = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const Threeline = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const __Inset = css`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
export default GlobalStyle;
