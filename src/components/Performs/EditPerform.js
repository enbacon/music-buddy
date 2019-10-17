import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PerformForm from './PerformForm'
import moment from 'moment'

const EditPerform = ({ user, match, alert, history }) => {
  const [perform, setPerform] = useState({
    date: '',
    time: '',
    location: '',
    pieces: [],
    intermission: 0,
    length: 0
  })

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/performances/${match.params.id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(responseData => {
        const formattedDate = moment(responseData.data.performance.date).format('YYYY-MM-DD')
        setPerform({ ...responseData.data.performance, date: formattedDate })
      })
      .then(responseData => setPerform(responseData.data.performance))
      .then(console.log('this is perform', perform))
      .catch(console.error)
  }, [])

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
      method: 'PATCH',
      url: `${apiUrl}/performances/${match.params.id}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { performance: perform }
    })
      .then(() => alert({ heading: 'Success!', message: 'You updated a performance!', variant: 'success' }))
      .then(() => history.push(`/performances${match.params.id}`))
      .catch(() => alert({ heading: 'Rut roh!', message: 'Something went wrong', variant: 'danger' }))
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

export default withRouter(EditPerform)
