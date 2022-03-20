class User {
  constructor() {
    this.main = {
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
    this.activity = [
      {
        day: null,
        kilogram: null,
        calories: null,
      },
    ]
    this.average = [
      {
        day: null,
        sessionLength: null,
      },
    ]
    this.performance = {
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
  }
  setActivityData = (data) => {
    this.activity = data.sessions
  }
  setAverageSessionsData = (data) => {
    this.average = data.sessions
  }
  setPerformanceData = (data) => {
    this.performance = {
      performance_kind: data.kind,
      performance_data: data.data,
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
