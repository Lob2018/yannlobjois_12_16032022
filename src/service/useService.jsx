import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import axios from 'axios'

import User from '../models/User.js'

import USER_MAIN_DATA from '../mocked-data/USER_MAIN_DATA.json'
import USER_ACTIVITY from '../mocked-data/USER_ACTIVITY.json'
import USER_AVERAGE_SESSIONS from '../mocked-data/USER_AVERAGE_SESSIONS.json'
import USER_PERFORMANCE from '../mocked-data/USER_PERFORMANCE.json'

/**
 * A hook to get a User object corresponding to the user's ID, and type of data needed (from the API or mocked)
 * @component
 * @param {string} userId - The user's ID
 * @param {boolean} isMocked - True for the mocked data and false for the API data
 * @returns {User} The corresponding User object 
 */
export function useService(userId, isMocked) {
  const baseUrl = `http://localhost:3001/user/${userId}`
  const navigate = useNavigate()

  const user = new User()
  const [userData, setData] = useState(new User())

  /**
   * Get the mocked data with the user's ID, from all the mockeddata 
   * @param {string} strId 
   * @param {object} mockedData 
   * @returns {object|null}
   */
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

  /**
   * Get the user's main data form the API 
   * @returns {object}
   */
  function getMainData() {
    return axios.get(`${baseUrl}`)
  }
   /**
   * Get the user's activity data form the API 
   * @returns {object}
   */
  function getActivityData() {
    return axios.get(`${baseUrl}/activity`)
  }
   /**
   * Get the user's average sessions data form the API 
   * @returns {object}
   */
  function getAverageSessionsData() {
    return axios.get(`${baseUrl}/average-sessions`)
  }
   /**
   * Get the user's performance data form the API 
   * @returns {object}
   */
  function getPerformanceData() {
    return axios.get(`${baseUrl}/performance`)
  }

   /**
   * Shows the error in the console, clear the User's object, and redirect to the 404 if an error occurs
   * @param {string} error  
   */
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
