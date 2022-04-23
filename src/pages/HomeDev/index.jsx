import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'

import styled from 'styled-components'
import { MockedContext } from '../../context'

const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 91px);
  justify-content: center;
`
const StyledH1 = styled.h1`
  margin: 30px;
  color: #000;
  font-size: 96px;
  height: 99px;
  font-weight: 700;
  line-height: 1;
`
/**
 * HomeDev page component (interface for testing user's data)
 * @component
 * @returns {React.ReactElement} The HomeDev's page
 */
function HomeDev() {
  const navigate = useNavigate()
  const [id, setId] = useState('12')
  
  //MockedContext destructuring   
  const { setIsMocked, isMocked } = useContext(MockedContext)

  /**
   * Save the user's choice for mocked or API data int the global context
   * @param {boolean} mocked - True for mocked data and false for API data
   */
  function saveMockedChoice(mocked) {
    setIsMocked(mocked)
  }
  /**
   * Cancel the submit event and redirect to the corresponding page 
   * @param {object} event - The submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(`/user/` + id)
  }

  return (
    <HomeContainer>
      <StyledH1>SportSee</StyledH1>
      <form
        style={{
          display: 'flex',
          flexFlow: 'column',
          gap: '20px',
          fontSize: '24px',
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'space-between',
          }}
        >
          <label>Identifiant :</label>
          <select
            style={{
              fontSize: '24px',
            }}
            onChange={(e) => setId(e.target.value)}
          >
            <option value="12">Karl</option>
            <option value="18">Cecilia</option>
            <option value="1">Vide</option>
          </select>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'space-between',
          }}
        >
          <label>Données mockées :</label>
          <select
            style={{
              fontSize: '24px',
            }}
            value={isMocked}
            onChange={(e) => saveMockedChoice(JSON.parse(e.target.value))}
          >
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </div>
        <input
          style={{
            borderRadius: '6px',
            height: '64px',
            fontSize: '24px',
            fontWeight: '500',
            backgroundColor: '#020203',
            color: '#FF020E',
          }}
          type="submit"
          value="Envoyer"
        />
      </form>
    </HomeContainer>
  )
}

export default HomeDev
