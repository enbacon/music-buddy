import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PerformForm from './PerformForm'
// import { Link } from 'react-router-dom'

const CreatePerform = ({ user, pieces }) => {
  const performObject = {
    date: '',
    time: '',
    location: '',
    pieces: '',
    intermission: 0,
    length: 0
  }
  const [created, setCreated] = useState(false)
  const [perform, setPerform] = useState(performObject)

  const handleChange = event => {
    event.persist()
    setPerform(perform => ({ ...perform, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      method: 'POST',
      url: `${apiUrl}/performances`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { performance: { ...perform } }
    })
      .then(responseData => setCreated(responseData.data.perform._id))
      .catch(console.error)
  }

  if (created) {
    return <Redirect to={`/performsances/${created}`} />
  }

  return (
    <PerformForm
      perform={perform}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreatePerform
