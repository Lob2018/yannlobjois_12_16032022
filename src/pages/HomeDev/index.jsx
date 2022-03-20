import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 91px);
  justify-content: center;
`
const StyledH1 = styled.h1`
  color: #000;
  font-size: 188px;
  font-weight: 700;
  height: 263px;
  margin: 169px 0 66px 0;
  line-height: 1;
  @media only screen and (max-width: 768px) {
    font-size: 96px;
    height: 99px;
    margin: 199px 0 11px 0;
  }
`
const StyledLink = styled(Link)`
  color: #000;
  font-size: 18px;
  margin-bottom: 159px;
  @media only screen and (max-width: 768px) {
    margin-bottom: 235px;
    font-size: 14px;
  }
`

function HomeDev() {
  return (
    <HomeContainer>
      <StyledH1>SportSee</StyledH1>
      <StyledLink to="/" rel="noopener">
        Retourner sur la page d'accueil
      </StyledLink>
    </HomeContainer>
  )
}

export default HomeDev
