import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/logo.svg'
import colors from '../../style/colors'

const StyledHeaderLogo = styled.img`
  width: 178px;
  height: 61px;
`
const HeaderContainer = styled.header`
  background-color: ${colors.bgMenu};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 92px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const StyledLogoLink = styled(Link)`
  width: 178px;
  height: 61px;
  margin: 0 28px;
`

const StyledNav = styled.nav`
  width: 100%;
  margin: 0 96px;
  @media only screen and (max-width: 1280px) {
    margin: 0 4%;
  }
`

const StyledUL = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 21%;
  @media only screen and (max-width: 1280px) {
    gap: 10%;
  }
`
const StyledLI = styled.li`
  list-style-type: none;
`
/**
 * The pages's header
 * @component
 * @returns {React.ReactElement} The pages's header
 */
function Header() {
  return (
    <HeaderContainer>
      <StyledLogoLink to="/">
        <StyledHeaderLogo src={logo} alt="Logo SportSee" />
      </StyledLogoLink>
      <StyledNav aria-label="Navigation principale">
        <StyledUL role="menubar" aria-label="Navigation principale">
          <StyledLI role="none">
            <NavLink to="/" rel="noopener" role="menuitem" tabIndex="0">
              Accueil
            </NavLink>
          </StyledLI>
          <StyledLI role="none">
            <NavLink to="/profil" rel="noopener" role="menuitem" tabIndex="0">
              Profil
            </NavLink>
          </StyledLI>{' '}
          <StyledLI role="none">
            <NavLink to="/reglage" rel="noopener" role="menuitem" tabIndex="0">
              Réglage
            </NavLink>
          </StyledLI>{' '}
          <StyledLI role="none">
            <NavLink
              to="/communaute"
              rel="noopener"
              role="menuitem"
              tabIndex="0"
            >
              Communauté
            </NavLink>
          </StyledLI>
        </StyledUL>
      </StyledNav>
    </HeaderContainer>
  )
}

export default Header
