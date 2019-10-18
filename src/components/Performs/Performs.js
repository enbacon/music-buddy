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
      .then(responseData => {
        setPerforms(responseData.data.performances)
        console.log('this is responseData.performances', responseData.data.performances)
      })
      .then(() => console.log('this is performs', performs))
      .catch(console.error)
  }, [])

  const performsJsx = performs.map(perform => (
    <div key={perform._id}>
      <li><Link to={`/performances/${perform._id}`}>{moment(perform && perform.date).format('dddd, MMMM Do YYYY')}</Link></li>
      <p>at { moment(perform.time, 'HH:mm').format('h:mm A') }</p>
      <p>Located at {perform.location}</p>
      {perform.pieces.map(piece => (
        <div key={piece._id}>
          <p>{piece.title}</p>
          <p>by {piece.composer}</p>
        </div>
      ))}
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
