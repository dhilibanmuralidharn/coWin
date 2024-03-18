import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    vaccinationCoverageList: [],
    vaccinationByGenderList: [],
    vaccinationByAgeList: [],
  }

  componentDidMount() {
    this.getCovidVaccinationData()
  }

  getCovidVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updateCoverageList = data.last_7_days_vaccination.map(coverage => ({
        vaccineDate: coverage.vaccine_date,
        dose1: coverage.dose_1,
        dose2: coverage.dose_2,
      }))
      console.log(updateCoverageList)

      const updateAgeList = data.vaccination_by_age.map(ageList => ({
        age: ageList.age,
        count: ageList.count,
      }))
      console.log(updateAgeList)

      const updateGenderList = data.vaccination_by_gender.map(genderList => ({
        count: genderList.count,
        gender: genderList.gender,
      }))
      console.log(updateGenderList)

      this.setState({
        apiStatus: apiStatusConstants.success,
        vaccinationCoverageList: updateCoverageList,
        vaccinationByAgeList: updateAgeList,
        vaccinationByGenderList: updateGenderList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      vaccinationByAgeList,
      vaccinationByGenderList,
      vaccinationCoverageList,
    } = this.state
    return (
      <>
        <div className="vaccinatonList-container">
          <VaccinationCoverage
            vaccinationCoverageList={vaccinationCoverageList}
          />
        </div>
        <div className="vaccinatonList-container">
          <VaccinationByGender
            vaccinationByGenderList={vaccinationByGenderList}
          />
        </div>
        <div className="vaccinatonList-container">
          <VaccinationByAge vaccinationByAgeList={vaccinationByAgeList} />
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVaccinationData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="icon-container">
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="icon-header">Co-WIN</h1>
        </div>
        <h1 className="description">CoWIN Vaccination in India</h1>
        <div>{this.renderVaccinationData()}</div>
      </div>
    )
  }
}
export default CowinDashboard
