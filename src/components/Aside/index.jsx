import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import colors from '../../utils/style/colors'

import Yoga from '../../assets/yoga.svg'
import Swimming from '../../assets/swimming.svg'
import Bicycle from '../../assets/bicycle.svg'
import Bodybuilding from '../../assets/bodybuilding.svg'

const AsideContainer = styled.aside`
  background-color: ${colors.bgMenu};
  width: 117px;
  height: calc(100vh - 90px);
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledNav = styled.nav`
  height: 100%;
`
const StyledUL = styled.ul`
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: no-wrap;
  gap: 20px;
  @media only screen and (max-width: 768px) {
    gap: 10px;
  }
`
const StyledLI = styled.li`
height:100%
  list-style-type: none;
`
const StyledSportButton = styled.img`
  width: 64px;
`
const StyledCopyright = styled.p`
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 85px 0;
  overflow: hidden;
  white-space: nowrap;
  height: 105px;
  line-height: 100px;
  align-self: flex-end;
  transform: rotate(-90deg);
  color: #fff;
`

function Header() {
  return (
    <AsideContainer>
      <StyledNav aria-label="Navigation secondaire">
        <StyledUL role="menubar" aria-label="Navigation secondaire">
          <StyledLI role="none">
            <NavLink
              to="/yoga"
              aria-label="Dashboard yoga"
              rel="noopener"
              role="menuitem"
              tabIndex="0"
            >
              <StyledSportButton src={Yoga} alt="Yoga" />
            </NavLink>
          </StyledLI>
          <StyledLI role="none">
            <NavLink
              to="/natation"
              aria-label="Dashboard natation"
              rel="noopener"
              role="menuitem"
              tabIndex="0"
            >
              <StyledSportButton src={Swimming} alt="Natation" />
            </NavLink>
          </StyledLI>
          <StyledLI role="none">
            <NavLink
              to="/velo"
              aria-label="Dashboard vélo"
              rel="noopener"
              role="menuitem"
              tabIndex="0"
            >
              <StyledSportButton src={Bicycle} alt="Vélo" />
            </NavLink>
          </StyledLI>
          <StyledLI role="none">
            <NavLink
              to="/musculation"
              aria-label="Dashboard musculation"
              rel="noopener"
              role="menuitem"
              tabIndex="0"
            >
              <StyledSportButton src={Bodybuilding} alt="Musculation" />
            </NavLink>
          </StyledLI>
        </StyledUL>
      </StyledNav>
      <StyledCopyright>Copiryght, SportSee 2020</StyledCopyright>
    </AsideContainer>
  )
}

export default Header
