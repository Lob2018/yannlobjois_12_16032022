class User {
  /**
   * Classe User - User data modeling class
   * @class User
   */
  constructor() {
    this.main = this.mainDefault = {
      id: null,
      firstName: null,
      lastName: null,
      age: null,
      todayScore: null,
      score: null,
      calorieCount: null,
      proteinCount: null,
      carbohydrateCount: null,
      lipidCount: null,
    }
    this.activity = this.activityDefault = [
      {
        day: null,
        kilogram: null,
        calories: null,
      },
    ]
    this.averageDefault = this.averageDefault = [
      {
        day: null,
        sessionLength: null,
      },
    ]
    this.performanceDefault = this.performanceDefault = {
      performance_kind: [
        {
          1: null,
        },
      ],
      performance_data: [
        {
          value: null,
          kind: null,
        },
      ],
    }
  }
  /**
   * Set the user's main data
   * @function
   * @memberof User
   * @param {object} data - The JSON user's main data
   */
  setMainData = (data) => {
    if (data) {
      this.main = {
        id: data.id,
        firstName: data.userInfos.firstName,
        lastName: data.userInfos.lastName,
        age: data.userInfos.age,
        todayScore: data.todayScore,
        score: data.score,
        calorieCount: data.keyData.calorieCount,
        proteinCount: data.keyData.proteinCount,
        carbohydrateCount: data.keyData.carbohydrateCount,
        lipidCount: data.keyData.lipidCount,
      }
    } else this.main = this.mainDefault
  }
  /**
   * Set the user's activity data
   * @function
   * @memberof User
   * @param {object} data - The JSON user's activity data
   */
  setActivityData = (data) => {
    if (data) {
      this.activity = data.sessions
    } else {
      this.activity = this.activityDefault
    }
  }
  /**
   * Set the user's sessions data
   * @function
   * @memberof User
   * @param {object} data - The JSON user's sessions data
   */
  setAverageSessionsData = (data) => {
    if (data) {
      this.average = data.sessions
    } else {
      this.average = this.averageDefault
    }
  }
  /**
   * Set the user's performance data
   * @function
   * @memberof User
   * @param {object} data - The JSON user's performance data
   */
  setPerformanceData = (data) => {
    if (data) {
      this.performance = {
        performance_kind: data.kind,
        performance_data: data.data,
      }
    } else {
      this.performance = this.performanceDefault
    }
  }
  /**
   * Set the set of user data with a data array
   * @function
   * @memberof User
   * @param {array} data - The set of user data with a data array
   */
  setAllData = (data) => {
    this.setMainData(data[0])
    this.setActivityData(data[1])
    this.setAverageSessionsData(data[2])
    this.setPerformanceData(data[3])
  }

  /**
   * Get the user's main data
   * @function
   * @memberof User
   * @returns {object} - The user's main data or null if empty
   */
  getMainData = () => {
    return this.main.id ? this.main : null
  }
  /**
   * Get the user's activity data
   * @function
   * @memberof User
   * @returns {object} - The user's activity data or null if empty
   */
  getActivityData = () => {
    return this.activity && this.activity[0].day ? this.activity : null
  }
  /**
   * Get the user's sessions data
   * @function
   * @memberof User
   * @returns {object} - The user's sessions data or null if empty
   */
  getAverageData = () => {
    return this.average && this.average[0].day ? this.average : null
  }
  /**
   * Get the user's performance data
   * @function
   * @memberof User
   * @returns {object} - The user's performance data or null if empty
   */
  getPerformanceData = () => {
    return this.performance &&
      this.performance.performance_data &&
      this.performance.performance_data[0].value
      ? this.performance
      : null
  }

  /**
   * Clear the set of user data
   * @function
   * @memberof User
   */
  clearData() {
    this.main = this.mainDefault
    this.activity = this.activityDefault
    this.average = this.averageDefault
    this.performance = this.performanceDefault
  }
}
export default User
