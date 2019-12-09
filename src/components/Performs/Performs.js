import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import moment from 'moment'

const Performs = ({ user, alerts }) => {
  const [performs, setPerforms] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/performances`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(responseData => {
        setPerforms(responseData.data.performances)
      })
      .catch(console.error)
  }, [])

  // &#9835 = music notes
  const renderPerformance = perform => (
    <div key={perform._id}>
      <h5><Link to={`/performances/${perform._id}`}>{moment(perform && perform.date, 'YYYY-MM-DD').format('dddd, MMMM Do YYYY')}</Link>, at { moment(perform.time, 'HH:mm').format('h:mm A') }</h5>
      <p>Located at {perform.location}</p>
      {perform.pieces.map(piece => (
        <div key={piece._id}>
          <p className="mt-2 mb-0">&#9835;</p>
          <h6 className="program">{piece.title}, by {piece.composer}</h6>
        </div>
      ))}
      <hr/>
    </div>
  )

  const upcomingPerformancesJsx = []
  const pastPerformancesJsx = []

  for (let i = 0; i < performs.length; i++) {
    const perform = performs[i]
    const performJsx = renderPerformance(perform)
    if (moment(perform && perform.date, 'YYYY-MM-DD') < moment()) {
      pastPerformancesJsx.push(performJsx)
    } else {
      upcomingPerformancesJsx.push(performJsx)
    }
  }

  return (
    <div className="row col-sm-10 col-md-8 mx-auto">
      <div className="col-sm-10 col-md-8 mx-auto">
        <h1 className="mb-2">Upcoming Performances</h1>
        <ul className="upcomingPerformances">
          <li>{upcomingPerformancesJsx.length ? upcomingPerformancesJsx : 'Please add an upcoming performance.'}</li>
        </ul>
        <h1 className="mb-2">Past Performances</h1>
        <ul className="pastPerformances">
          <li>{pastPerformancesJsx.length ? pastPerformancesJsx : 'Feel free to track a past performance.'}</li>
        </ul>
      </div>
    </div>
  )
}

export default Performs
