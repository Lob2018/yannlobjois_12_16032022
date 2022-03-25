import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useContext } from 'react'

import { useService } from '../../utils/hooks'
import { MockedContext } from '../../utils/context'

import Aside from '../../components/Aside'

const DashBoardContainer = styled.div`
  margin-top: -1px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
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
      {userData.getMainData() && <h1>{userData.getMainData().firstName}</h1>}
    </DashBoardContainer>
  )
}

export default DashBoard
