import { Link } from 'react-router-dom'
import styled from 'styled-components'

const QuatCentQuatContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 91px);
  justify-content: center;
`
const Styled404H1 = styled.h1`
  color: #000;
  font-size: 288px;
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
const Styled404P = styled.p`
  text-align: center;
  color: #000;
  font-size: 36px;
  margin: 0 0 182px 0;
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    margin: 0 0 133px 0;
    width: 260px;
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
/**
 * 404 page component
 * @component
 * @returns {React.ReactElement} The 404's page
 */
function QuatCentQuat() {
  return (
    <QuatCentQuatContainer>
      <Styled404H1>404</Styled404H1>
      <Styled404P>Oups! La page que vous demandez n'existe pas.</Styled404P>
      <StyledLink to="/" rel="noopener">
        Retourner sur la page d'accueil
      </StyledLink>
    </QuatCentQuatContainer>
  )
}

export default QuatCentQuat
