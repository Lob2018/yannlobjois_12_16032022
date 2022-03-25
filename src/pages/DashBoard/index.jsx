import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useService } from '../../utils/hooks'

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
  const { id } = useParams()

  const { userData } = useService(id, true)

  console.log(JSON.stringify(userData))

  return (
    <DashBoardContainer>
      <Aside />
      {userData.getMainData() && <h1>{userData.getMainData().firstName}</h1>}
    </DashBoardContainer>
  )
}

export default DashBoard
