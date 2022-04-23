import styled from 'styled-components'
import PropTypes from 'prop-types'

import colors from '../../style/colors'
import { getPrefixedNumber } from '../../utils/helper/getPrefixedNumber'

const CardContainer = styled.div`
  display flex;
  align-items: center;
  gap:24px;
  margin:0px;
  height: 124px;
  border-radius: 5px;
  background-color: ${colors.bgCards};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
  @media only screen and (max-width: 1280px) {
    height: 108px;
    gap:12px;    
  }
`

const StyledCardIcon = styled.img`
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  margin-left: 32px;
  @media only screen and (max-width: 1280px) {
    margin-left: 0px;
  }
`

const StyledCardText = styled.p`
  margin: 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  span:nth-of-type(1) {
    color: ${colors.strCardsTitleAsValues};
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    @media only screen and (max-width: 1280px) {
      font-size: 16px;
    }
  }
  span:nth-of-type(2) {
    color: ${colors.strCardsLegend};
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    @media only screen and (max-width: 1280px) {
      font-size: 14px;
    }
  }
`

/**
 * Card component
 * @component
 * @param {*} props 
 * @returns {React.ReactElement} The corresponding card
 */
function Card(props) {
  return (
    <CardContainer>
      <StyledCardIcon src={props.icon} alt={props.label}></StyledCardIcon>
      <StyledCardText>
        <span>
          {props.unit === 'Cal'
            ? getPrefixedNumber(props.value, 3)
            : props.value}
          {props.unit}
        </span>
        <span> {props.label}</span>
      </StyledCardText>
    </CardContainer>
  )
}

Card.propTypes = {
   /**
   * Label is a text
   */
  label: PropTypes.string.isRequired,
   /**
   * Icon is a text (the path)
   */
  icon: PropTypes.string.isRequired,
  /**
   * Value is a number
   */
  value: PropTypes.number.isRequired,
  /**
   * Unit is a text
   */
  unit: PropTypes.string.isRequired,
}

Card.defaultProps = {
  label: '',
  icon: '',
  value: 0,
  unit: '',
}

export default Card
