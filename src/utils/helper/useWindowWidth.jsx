import { useState, useEffect } from 'react'

/**
 * A hook to get the current window's width when the window's resized 
 * @name useWindowWidth
 * @component
 * @returns {number} The current window's width
 */
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
