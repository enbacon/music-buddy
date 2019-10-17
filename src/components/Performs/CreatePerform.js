import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PerformForm from './PerformForm'

const CreatePerform = ({ user }) => {
  const performObject = {
    date: '',
    time: '',
    location: '',
    pieces: [],
    intermission: 0,
    length: 0
  }

  const [created, setCreated] = useState(false)
  const [perform, setPerform] = useState(performObject)

  const handleChange = event => {
    event.persist()
    setPerform(perform => ({ ...perform, [event.target.name]: event.target.value }))
  }

  const handleSelect = arrayOfPieces => {
    setPerform({ ...perform, pieces: arrayOfPieces })
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
      .then(responseData => setCreated(responseData.data.performance._id))
      .catch(console.error)
  }

  if (created) {
    return <Redirect to={`/performances/${created}`} />
  }

  return (
    <PerformForm
      perform={perform}
      handleChange={handleChange}
      handleSelect={handleSelect}
      handleSubmit={handleSubmit}
      user={user}
    />
  )
}

export default CreatePerform
