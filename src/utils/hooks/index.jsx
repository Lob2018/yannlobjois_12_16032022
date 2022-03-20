import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import User from '../../models/User.js'

import USER_MAIN_DATA from '../../mocked-data/USER_MAIN_DATA.json'
import USER_ACTIVITY from '../../mocked-data/USER_ACTIVITY.json'
import USER_AVERAGE_SESSIONS from '../../mocked-data/USER_AVERAGE_SESSIONS.json'
import USER_PERFORMANCE from '../../mocked-data/USER_PERFORMANCE.json'

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

export function useService(userId, isMocked) {
  const user = new User()
  const baseUrl = `http://localhost:3001/user/${userId}`
  const navigate = useNavigate()

  const [mainData, setMainData] = useState(null)
  const [activity, setActivity] = useState(null)
  const [averageSessions, setAverageSessions] = useState(null)
  const [performance, setPerformance] = useState(null)

  function getMockedData(strId, mockedData) {
    if (strId === undefined) return null
    // is the id's string passed a numeric value
    if (!/^\d+$/.test(strId)) return null
    const iID = parseInt(strId, 10)
    let equalId
    if (mockedData === USER_MAIN_DATA) {
      equalId = (element) => element.id === iID
    } else {
      equalId = (element) => element.userId === iID
    }
    const pos = mockedData.findIndex(equalId)
    if (pos === -1) return null
    return mockedData[pos]
  }

  function isWithoutValues() {
    if (!mainData && !activity && !averageSessions && !performance)
      navigate(`/*`)
  }

  useEffect(() => {
    async function getMainData() {
      try {
        if (isMocked) {
          const response = getMockedData(userId, USER_MAIN_DATA)
          if (response) {
            user.setMainData(response)
          } else
            throw new Error("Cannot read properties of null (reading 'main')")
        } else {
          const response = await axios.get(`${baseUrl}`)
          user.setMainData(response.data.data)
        }
        setMainData(user.getMainData)
      } catch (error) {
        console.error(error)
        setMainData(null)
        isWithoutValues()
      }
    }
    getMainData()
  }, [])
  useEffect(() => {
    async function getActivity() {
      try {
        if (isMocked) {
          const response = getMockedData(userId, USER_ACTIVITY)
          user.setActivityData(response)
        } else {
          const response = await axios.get(`${baseUrl}/activity`)
          user.setActivityData(response.data.data)
        }
        setActivity(user.getActivityData)
      } catch (error) {
        console.error(error)
        setActivity(null)
        isWithoutValues()
      }
    }
    getActivity()
  }, [])
  useEffect(() => {
    async function getAverageSessions() {
      try {
        if (isMocked) {
          const response = getMockedData(userId, USER_AVERAGE_SESSIONS)
          user.setAverageSessionsData(response)
        } else {
          const response = await axios.get(`${baseUrl}/average-sessions`)
          user.setAverageSessionsData(response.data.data)
        }
        setAverageSessions(user.getAverageData)
      } catch (error) {
        console.error(error)
        setAverageSessions(null)
        isWithoutValues()
      }
    }
    getAverageSessions()
  }, [])
  useEffect(() => {
    async function getPerformance() {
      try {
        if (isMocked) {
          const response = getMockedData(userId, USER_PERFORMANCE)
          user.setPerformanceData(response)
        } else {
          const response = await axios.get(`${baseUrl}/performance`)
          user.setPerformanceData(response.data.data)
        }
        setPerformance(user.getPerformanceData)
      } catch (error) {
        console.error(error)
        setPerformance(null)
        isWithoutValues()
      }
    }
    getPerformance()
  }, [])

  return { mainData, activity, averageSessions, performance }
}
