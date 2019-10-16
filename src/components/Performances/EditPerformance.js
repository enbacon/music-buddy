import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PerformanceForm from './PerformanceForm'

const EditPerformance = ({ user, match, alert, history }) => {
  const [performance, setPerformance] = useState({ title: '', composer: '' })

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

  const handleChange = event => {
    event.persist()
    setPerformance(performance => ({ ...performance, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      method: 'PATCH',
      url: `${apiUrl}/performances/${match.params.id}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { performance }
    })
      .then(() => alert({ heading: 'Success!', message: 'You updated a performance!', variant: 'success' }))
      .then(() => history.push(`/performances${match.params.id}`))
      .catch(() => alert({ heading: 'Rut roh!', message: 'Something went wrong', variant: 'danger' }))
  }

  return (
    <PerformanceForm
      performance={performance}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default withRouter(EditPerformance)
