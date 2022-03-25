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
  const baseUrl = `http://localhost:3001/user/${userId}`
  const navigate = useNavigate()

  const user = new User()
  const [userData, setData] = useState(new User())

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

  function getMainData() {
    return axios.get(`${baseUrl}`)
  }
  function getActivityData() {
    return axios.get(`${baseUrl}/activity`)
  }
  function getAverageSessionsData() {
    return axios.get(`${baseUrl}/average-sessions`)
  }
  function getPerformanceData() {
    return axios.get(`${baseUrl}/performance`)
  }

  function gotError(error) {
    console.error(error)
    user.clearData()
    setData(user)
    navigate(`/*`)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        if (isMocked) {
          const responseMainData = await getMockedData(userId, USER_MAIN_DATA)
          const responseActivityData = await getMockedData(
            userId,
            USER_ACTIVITY
          )
          const responseSessionsData = await getMockedData(
            userId,
            USER_AVERAGE_SESSIONS
          )
          const responseUserPerformance = await getMockedData(
            userId,
            USER_PERFORMANCE
          )
          if (
            responseMainData &&
            responseActivityData &&
            responseSessionsData &&
            responseUserPerformance
          ) {
            user.setAllData([
              responseMainData,
              responseActivityData,
              responseSessionsData,
              responseUserPerformance,
            ])
            setData(user)
          } else
            throw new Error(
              "Cannot read mocked data with user's id : " + userId
            )
        } else {
          await Promise.all([
            getMainData(),
            getActivityData(),
            getAverageSessionsData(),
            getPerformanceData(),
          ])
            .then(function (results) {
              user.setAllData([
                results[0].data.data,
                results[1].data.data,
                results[2].data.data,
                results[3].data.data,
              ])
              setData(user)
            })
            .catch((error) => {
              gotError(error)
            })
        }
      } catch (error) {
        gotError(error)
      }
    }
    getData()
  }, [])

  return { userData }
}
