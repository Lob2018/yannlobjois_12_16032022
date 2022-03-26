import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useContext } from 'react'
import colors from '../../utils/style/colors'

import { useService } from '../../utils/hooks'
import { MockedContext } from '../../utils/context'

import Aside from '../../components/Aside'

const DashBoardContainer = styled.div`
  width: 100%;
  height: calc(100% - 91px);
  display: flex;
  @media only screen and (max-width: 768px) {
  }
`
const StyledMain = styled.main`
  margin: 68px 90px 31px 107px;
  width: calc(100% - 107px);
`
const StyledChartsContainer = styled.div`
  display: flex;
  gap: 31px;
  @media only screen and (max-width: 1280px) {
    flex-wrap: wrap;
  }
`

const MainChartsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 80%;
  @media only screen and (max-width: 1280px) {
    width: 100%;
  }
`
const StyledH1 = styled.h1`
  margin: 0px 0px 41px 0px;
  font-weight: 500;
  font-size: 48px;
  line-height: 24px;
  span {
    color: ${colors.strPrimary};
  }
  @media only screen and (max-width: 768px) {
  }
`

const StyledSubTitle = styled.p`
  margin: 0px 0px 77px 0px;
  font-size: 18px;
  line-height: 24px;
  @media only screen and (max-width: 768px) {
  }
`

const FirstChartContainer = styled.div`
  margin: 0px 0px 30px 0px;
  width: 100%;
  height: 320px;
  border-radius: 5px;
  background-color: red;
  background-color: ${colors.bgCards};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
  @media only screen and (max-width: 768px) {
  }
`

const SecondChartsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  width: 100%;
  height: 263px;
  border-radius: 5px;
  background-color: red;
  background-color: ${colors.bgCards};
  @media only screen and (max-width: 768px) {
  }
`

const SecondaryChartsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 25%;
  gap: 39px;
  @media only screen and (max-width: 1280px) {
    flex-direction: row;
    width: 100%;
  }
`

const StyledCard = styled.div`
  margin: 0px;
  width: 100%;
  height: 124px;
  border-radius: 5px;
  background-color: red;
  background-color: ${colors.bgCards};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
  @media only screen and (max-width: 768px) {
  }
`

/**
 * DashBoard page component
 * @component
 * @returns {React.ReactElement} The dashboard
 */
function DashBoard() {
  const { isMocked } = useContext(MockedContext)
  const { id } = useParams()

  const { userData } = useService(id, isMocked)

  return (
    <DashBoardContainer>
      <Aside />
      <StyledMain>
        {userData.getMainData() && (
          <StyledH1>
            Bonjour <span>{userData.getMainData().firstName}</span>
          </StyledH1>
        )}
        <StyledSubTitle>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </StyledSubTitle>
        <StyledChartsContainer>
          <MainChartsContainer>
            <FirstChartContainer></FirstChartContainer>
            <SecondChartsContainer></SecondChartsContainer>
          </MainChartsContainer>
          <SecondaryChartsContainer>
            <StyledCard></StyledCard> <StyledCard></StyledCard>{' '}
            <StyledCard></StyledCard> <StyledCard></StyledCard>
          </SecondaryChartsContainer>
        </StyledChartsContainer>
      </StyledMain>
    </DashBoardContainer>
  )
}

export default DashBoard
