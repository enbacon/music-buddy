import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Performance = ({ user, alerts, match }) => {
  const [performance, setPerformance] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/performances/${match.params.id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(responseData => setPerformance(responseData.data.performance))
      .then(() => console.log(performance))
      .catch(console.error)
  }, [])

  // AJAX request to delete movie
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

  // // if no performance then display loading to user
  // if (!performance) {
  //   return <p>Please add a performance to your repertoire.</p>
  // }

  // if performance is deleted then redirect to home
  if (deleted) {
    return <Redirect to={
      { pathname: '/performances' } } />
  }

  return (
    <div>
      <h1>Performance</h1>
      <p>{performance && performance.date}</p>
      <p>{performance && performance.time}</p>
      <p>The performance will be held at {performance && performance.memorized}</p>
      <p>{performance && performance.pieces}</p>
      <Button className="btn btn-primary mr-2" href={`#/performances/${match.params.id}/edit`}>Edit</Button>
      <button className="btn btn-outline-dark mr-2" onClick={destroy}>Delete Performance</button>
      <Link to="/performances">Back to all performances</Link>
    </div>
  )
}

// {*/ withRouter gives Performance all of the props /*}
export default withRouter(Performance)
