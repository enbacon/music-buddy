import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PerformanceForm from './PerformanceForm'
// import { Link } from 'react-router-dom'

const CreatePerformance = ({ user }) => {
  const performanceObject = {
    date: '',
    time: null,
    location: '',
    pieces: [],
    intermission: null,
    length: null
  }
  const [created, setCreated] = useState(false)
  const [performance, setPerformance] = useState(performanceObject)

  const handleChange = event => {
    event.persist()
    setPerformance(performance => ({ ...performance, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      method: 'POST',
      url: `${apiUrl}/performances`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { performance }
    })
      .then(responseData => setCreated(responseData.data.performance._id))
      .catch(console.error)
  }

  if (created) {
    return <Redirect to={`/performances/${created}`} />
  }

  return (
    <PerformanceForm
      performance={performance}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreatePerformance
