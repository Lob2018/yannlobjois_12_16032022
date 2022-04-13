import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useContext } from 'react'

import colors from '../../style/colors'
import Aside from '../../components/Aside'
import LineChart from '../../components/Charts/LineChart'
import RadarBarChart from '../../components/Charts/RadarBarChart'
import RadialBarChart from '../../components/Charts/RadialBarChart'
import { useService } from '../../service/useService'
import { useWindowWidth } from '../../utils/helper/useWindowWidth'
import { MockedContext } from '../../context'
import Card from '../../components/Card/index.jsx'

import Calories from '../../assets/calories.svg'
import Proteines from '../../assets/protein.svg'
import Glucides from '../../assets/carbs.svg'
import Lipides from '../../assets/fat.svg'

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
  background-color: ${colors.bgCards};
  z-indew
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
  @media only screen and (max-width: 768px) {
  }
`

const SecondChartsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3.59%;
  width: 100%;
  height: 263px;
  //border-radius: 5px;
  background-color: ${colors.bgCards};
  //background-color: red;
`

const SecondaryChartsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 25%;
  gap: 39px;
  @media only screen and (max-width: 1280px) {
    flex-direction: row;
    gap: 0px;
    width: 100%;
  }
`

/**
 * DashBoard page component
 * @component
 * @returns {React.ReactElement} The dashboard
 */
function DashBoard() {
  const { windowWidth } = useWindowWidth()

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
            <SecondChartsContainer>
              {userData.getAverageData() && (
                <LineChart
                  data={[
                    {
                      name: 'SessionsAverage',
                      color: '#ffffff',
                      items: userData.getAverageData(),
                    },
                  ]}
                  dimensions={{
                    width:
                      windowWidth < 1280
                        ? windowWidth * 0.22
                        : windowWidth * 0.179,
                    height: 218,
                    margin: { top: 30, right: 0, bottom: 15, left: 0 },
                  }}
                />
              )}
              {userData.getPerformanceData() && (
                <RadarBarChart
                  data={[
                    {
                      name: 'UserPerformances',
                      color: '#ffffff',
                      items: userData.getPerformanceData(),
                    },
                  ]}
                  dimensions={{
                    width:
                      windowWidth < 1280
                        ? windowWidth * 0.22
                        : windowWidth * 0.179,
                    height: 218,
                    margin: { top: 30, right: 0, bottom: 15, left: 0 },
                  }}
                />
              )}
              {userData.getMainData() && (
                <RadialBarChart
                  data={[
                    {
                      name: 'Score',
                      color: '#ffffff',
                      items:
                        userData.getMainData().todayScore ||
                        userData.getMainData().score,
                    },
                  ]}
                  dimensions={{
                    width:
                      windowWidth < 1280
                        ? windowWidth * 0.22
                        : windowWidth * 0.179,
                    height: 218,
                    margin: { top: 30, right: 0, bottom: 15, left: 0 },
                  }}
                />
              )}
            </SecondChartsContainer>
          </MainChartsContainer>
          <SecondaryChartsContainer>
            {userData.getMainData() && (
              <>
                <Card
                  label="Calories"
                  icon={Calories}
                  value={userData.getMainData().calorieCount}
                  unit="Cal"
                />
                <Card
                  label="Protéines"
                  icon={Proteines}
                  value={userData.getMainData().proteinCount}
                  unit="g"
                />
                <Card
                  label="Glucides"
                  icon={Glucides}
                  value={userData.getMainData().carbohydrateCount}
                  unit="g"
                />
                <Card
                  label="Lipides"
                  icon={Lipides}
                  value={userData.getMainData().lipidCount}
                  unit="g"
                />
              </>
            )}
          </SecondaryChartsContainer>
        </StyledChartsContainer>
      </StyledMain>
    </DashBoardContainer>
  )
}

export default DashBoard
