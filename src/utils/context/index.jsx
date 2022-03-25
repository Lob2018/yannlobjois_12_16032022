import React, { useState, createContext } from 'react'

export const MockedContext = createContext()

export const MockedProvider = ({ children }) => {
  const [isMocked, setIsMocked] = useState(true)

  return (
    <MockedContext.Provider value={{ isMocked, setIsMocked }}>
      {children}
    </MockedContext.Provider>
  )
}
