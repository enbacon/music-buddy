import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import moment from 'moment'

const Performs = ({ user, alerts }) => {
  console.log(user, alerts)
  const [performs, setPerforms] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/performances`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(responseData => setPerforms(responseData.data.performances))
      .then(console.log)
      .catch(console.error)
  }, [])

  const performsJsx = performs.map(perform => (
    <div key={perform._id}>
      <li><Link to={`/performances/${perform._id}`}>{moment(perform && perform.date).format('dddd, MMMM Do YYYY')}</Link></li>
      <p>{ moment(perform.time, 'HH:mm').format('h:mm A') }</p>
      <p>{perform.location}</p>
      <p>{perform.pieces}</p>
    </div>
  ))

  return (
    <div>
      <h1>Performances</h1>
      <ul>
        {performs.length ? performsJsx : 'Please add upcoming performances!'}
      </ul>
    </div>
  )
}

export default Performs
