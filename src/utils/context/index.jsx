import React, { useState, createContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userChoices, setUserChoices] = useState({})
  const saveUserChoices = (id, isMocked) => {
    setUserChoices({ id: id, isMocked: isMocked })
  }

  return (
    <UserContext.Provider value={{ userChoices, saveUserChoices }}>
      {children}
    </UserContext.Provider>
  )
}
