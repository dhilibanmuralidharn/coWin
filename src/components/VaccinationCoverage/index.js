import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import {Component} from 'react'
import './index.css'

class VaccinationCoverage extends Component {
  render() {
    const {vaccinationCoverageList} = this.props
    const DataFormatter = number => {
      if (number > 100) {
        return `${(number / 10).toString()}`
      }
      return number.toString()
    }

    return (
      <div>
        <h1 className="coverage-header">Vaccination Coverage</h1>
        <BarChart
          width={1000}
          height={300}
          data={vaccinationCoverageList}
          margin={{top: 5}}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="Dose1" fill="#1f77b4" barSize={25} />
          <Bar dataKey="dose2" name="Dose2" fill="#fd7f0e" barSize={25} />
        </BarChart>
      </div>
    )
  }
}
export default VaccinationCoverage
