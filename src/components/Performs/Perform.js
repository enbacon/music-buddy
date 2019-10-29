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
      <h4 className="mb-0">{ piece.title }</h4>
      <p>by { piece.composer}</p>
    </div>
  ))

  return (
    <div className="row col-sm-10 col-md-8 mx-auto">
      <div className="col-sm-10 col-md-8 mx-auto">
        <h1>Performance</h1>
        <h5 className="mb-0">{moment(perform.date, 'YYYY-MM-DD').format('dddd, MMMM Do YYYY')}</h5>
        <h5 className="mt-1">{moment(perform.time, 'HH.mm').format('h:mm A')}</h5>
        <p>{perform && perform.location}</p>
        <div>{performanceJsx}</div>
        <h6>There will be a {perform.intermission} minute intermission.</h6>
        <div>
          <Button className="btn btn-primary mr-2 mb-2" href={`#/performances/${match.params.id}/edit`}>Edit</Button>
          <button className="btn btn-primary mr-2 mb-2" onClick={destroy}>Delete</button>
        </div>
        <Link to="/performances" className="mt-2">Return to performances</Link>
      </div>
    </div>
  )
}

export default withRouter(Perform)
