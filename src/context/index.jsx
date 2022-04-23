import React, { useState, createContext } from 'react'

export const MockedContext = createContext()

/**
 * A context object for the desired data type (true for mocked and false for API data) 
 * @name MockedProvider
 * @component
 * @param {object} - The children components
 * @returns {React.ReactElement} The REACT's Provider component that allows consuming components to subscribe to context changes. 
 */
export const MockedProvider = ({ children }) => {
  const [isMocked, setIsMocked] = useState(true)

  return (
    <MockedContext.Provider value={{ isMocked, setIsMocked }}>
      {children}
    </MockedContext.Provider>
  )
}
