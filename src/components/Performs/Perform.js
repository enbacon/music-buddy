import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import moment from 'moment'

const Perform = ({ user, alerts, match }) => {
  const [perform, setPerform] = useState([])
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/performances/${match.params.id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(responseData => setPerform(responseData.data.performance))
      .then(() => console.log(performance))
      .catch(console.error)
  }, [])

  // AJAX request to delete performance
  const destroy = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/performances/${match.params.id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  // if performance is deleted then redirect to home
  if (deleted) {
    return <Redirect to={
      { pathname: '/performances' } } />
  }

  if (!perform) {
    return ''
  }

  return (
    <div>
      <h1>Performance</h1>
      <p>{moment(perform && perform.date).format('dddd, MMMM Do YYYY')}</p>
      <p>{moment(perform.time, 'HH:mm').format('h:mm A')}</p>
      <p>{perform && perform.location}</p>
      {perform.pieces.map(piece => (
        <p key={piece._id}>{piece.title}</p>
      ))}
      <Button className="btn btn-primary mr-2" href={`#/performances/${match.params.id}/edit`}>Edit</Button>
      <button className="btn btn-outline-dark mr-2" onClick={destroy}>Delete</button>
      <Link to="/performances">Return to all performances</Link>
    </div>
  )
}

// {*/ withRouter gives Perform all of the props /*}
export default withRouter(Perform)
