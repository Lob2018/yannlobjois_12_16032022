class User {
  constructor() {
    this.main = this.mainDefault = {
      id: null,
      firstName: null,
      lastName: null,
      age: null,
      todayScore: null,
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

  setMainData = (data) => {
    if (data) {
      this.main = {
        id: data.id,
        firstName: data.userInfos.firstName,
        lastName: data.userInfos.lastName,
        age: data.userInfos.age,
        todayScore: data.todayScore,
        calorieCount: data.keyData.calorieCount,
        proteinCount: data.keyData.proteinCount,
        carbohydrateCount: data.keyData.carbohydrateCount,
        lipidCount: data.keyData.lipidCount,
      }
    } else this.main = this.mainDefault
  }
  setActivityData = (data) => {
    if (data) {
      this.activity = data.sessions
    } else {
      this.activity = this.activityDefault
    }
  }
  setAverageSessionsData = (data) => {
    if (data) {
      this.average = data.sessions
    } else {
      this.average = this.averageDefault
    }
  }
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

  getMainData = () => {
    return this.main.id ? this.main : null
  }
  getActivityData = () => {
    return this.activity[0].day ? this.activity : null
  }
  getAverageData = () => {
    return this.average[0].day ? this.average : null
  }
  getPerformanceData = () => {
    return this.performance.performance_data[0].value ? this.performance : null
  }
}
export default User
