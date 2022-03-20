import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

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
 * @returns {React.ReactElement} The dashboard.
 */
function DashBoard() {
  const { id } = useParams()

  const { mainData } = useService(id, true)
  const { activity } = useService(id, true)
  const { averageSessions } = useService(id, true)
  const { performance } = useService(id, true)

  return (
    <DashBoardContainer>
      <Aside />
      {mainData && <h1>{mainData.firstName}</h1>}
    </DashBoardContainer>
  )
}

export default DashBoard
