import { createGlobalStyle } from 'styled-components'
import colors from './colors.js'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Roboto', sans-serif;                
    }    
    body {
      margin: 0;
      background-color: ${colors.bg};
    }
    header{
    }
    header nav a {
      font-size:24px; 
      font-weight:500;
      text-decoration: none;       
    }   
    header nav a:link,a:visited,a:hover,a:active{
      color: #FFF;
    }  
    main{
      a:link,a:visited,a:hover,a:active{
        color: #000;
    }
    aside{
      background-color: #000;
      color: #fff;
    }
    .hidden { 
      display:none; 
    }
    @media only screen and (max-width: 1024px) {
      * {
      }
      header{
      }
      header nav a {
        font-size:12px;        
      }   
    }    
`
function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle
