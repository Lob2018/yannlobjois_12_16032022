import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useContext } from 'react'
import colors from '../../style/colors'

import LineChart from '../../components/Charts/LineChart'
import { useService } from '../../service/useService'
import { useWindowWidth } from '../../utils/helper/useWindowWidth'
import { MockedContext } from '../../context'

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
  background-color: ${colors.bgCards};
  z-indew
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
  @media only screen and (max-width: 768px) {
  }
`

const SecondChartsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3.59%;
  width: 100%;
  height: 263px;
  border-radius: 5px;
  background-color: ${colors.bgCards};
  background-color: red;
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
  background-color: ${colors.bgCards};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
  @media only screen and (max-width: 768px) {
  }
`

const dimensions = {
  width: 258,
  height: 213,
  margin: { top: 30, right: 0, bottom: 20, left: 0 },
}

const portfolioData = {
  name: 'Portfolio',
  color: '#ffffff',
  items: [
    {
      date: '2019-07-15',
      marketvalue: 87.08712,
      value: 0,
    },
    {
      date: '2020-01-14',
      marketvalue: 91.069328,
      value: 4.572671595983424,
    },
    {
      date: '2020-01-15',
      marketvalue: 91.218185,
      value: 4.743600431384113,
    },
    {
      date: '2020-01-16',
      marketvalue: 91.238029,
      value: 4.76638680897933,
    },
    {
      date: '2020-01-17',
      marketvalue: 91.218185,
      value: 4.743600431384113,
    },
    {
      date: '2020-01-21',
      marketvalue: 91.476196,
      value: 5.039868122863633,
    },
    {
      date: '2020-01-22',
      marketvalue: 91.555588,
      value: 5.1310320056513525,
    },
  ].map((d) => ({
    ...d,
    date: new Date(d.date),
  })),
}

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

  console.log(userData.getAverageData())

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
                    // data={[portfolioData]}
                    {
                      name: 'Portfolio',
                      color: '#ffffff',
                      items: userData.getAverageData(),
                    },
                  ]}
                  dimensions={{
                    width:
                      windowWidth < 1280
                        ? windowWidth * 0.22
                        : windowWidth * 0.179,
                    height: 213,
                    margin: { top: 30, right: 0, bottom: 15, left: 0 },
                  }}
                />
              )}
              {/* <LineChart
                data={[portfolioData]}
                dimensions={{
                  width:
                    windowWidth < 1280
                      ? windowWidth * 0.22
                      : windowWidth * 0.179,
                  height: 213,
                  margin: { top: 30, right: 0, bottom: 20, left: 0 },
                }}
              />
              <LineChart
                data={[portfolioData]}
                dimensions={{
                  width:
                    windowWidth < 1280
                      ? windowWidth * 0.22
                      : windowWidth * 0.179,
                  height: 213,
                  margin: { top: 30, right: 0, bottom: 20, left: 0 },
                }}
              /> */}
            </SecondChartsContainer>
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
