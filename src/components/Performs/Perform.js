import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import moment from 'moment'

const Perform = ({ user, alerts, match }) => {
  const [perform, setPerform] = useState()
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

  // if performance is deleted then redirect to performances
  if (deleted) {
    return <Redirect to={
      { pathname: '/performances' } } />
  }

  if (!perform) {
    return 'Please add a performance!'
  }
  const performanceJsx = perform.pieces.map(piece => (
    <div key={piece._id}>
      <h4>{ piece.title }</h4>
      <p>by { piece.composer}</p>
    </div>
  ))

  return (
    <div>
      <h1>Performance</h1>
      <h5>{moment(perform.date).format('dddd, MMMM Do YYYY')}</h5>
      <h5>{moment(perform.time, 'HH.mm').format('h:mm A')}</h5>
      <p>{perform && perform.location}</p>
      <p>{performanceJsx}</p>
      <Button className="btn btn-primary mr-2" href={`#/performances/${match.params.id}/edit`}>Edit</Button>
      <button className="btn btn-outline-dark mr-2" onClick={destroy}>Delete</button>
      <Link to="/performances">Return to performances</Link>
    </div>
  )
}

export default withRouter(Perform)
