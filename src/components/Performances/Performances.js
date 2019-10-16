import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Performances = ({ user, alerts }) => {
  console.log(user, alerts)
  const [performances, setPerformances] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/performances`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(responseData => setPerformances(responseData.data.performances))
      .then(console.log)
      .catch(console.error)
  }, [])

  const performancesJsx = performances.map(performance => (
    <div key={performance._id}>
      <li><Link to={`/performances/${performance._id}`}>{performance.title}</Link></li>
      <p>by {performance.composer}</p>
    </div>
  ))

  return (
    <div>
      <h1>Performances</h1>
      <ul>
        {performances.length ? performancesJsx : 'Please add your performance information'}
      </ul>
    </div>
  )
}

export default Performances
