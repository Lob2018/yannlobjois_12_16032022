import { useState, useEffect } from 'react'

export function useWindowWidth() {
  const [windowWidth, setWidth] = useState(window.innerWidth)

  function changeWindowWidth() {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', changeWindowWidth)
    return () => {
      window.removeEventListener('resize', changeWindowWidth)
    }
  }, [])

  return { windowWidth }
}
