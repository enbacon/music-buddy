import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import MultiSelect from '@khanacademy/react-multi-select'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const PerformForm = ({ user, perform, handleChange, handleSelect, handleSubmit }) => {
  const cancelPath = perform && perform._id ? `#/performances/${perform._id}` : '#performances'
  //
  const [options, setOptions] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/pieces`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(responseData => {
        setOptions(responseData.data.pieces.map(piece => ({ label: `${piece.title} by ${piece.composer}`, value: piece._id })))
      })
      .catch(console.error)
  }, [])

  return (
    <div className="row text-left col-sm-10 col-md-8 mx-auto">
      <Form onSubmit={handleSubmit} className="col-md-10 mx-auto pb-3">
        <Form.Group controlId="date">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" name="date" min="2014-01-01" max="2119-01-01" onChange={handleChange} value={perform.date} required />
        </Form.Group>
        <Form.Group controlId="time">
          <Form.Label>Time:</Form.Label>
          <Form.Control type="time" name="time" onChange={handleChange} value={perform.time} required />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Location:</Form.Label>
          <Form.Control type="text" placeholder="address" name="location" onChange={handleChange} value={perform.location} required />
        </Form.Group>
        <Form.Group controlId="piece" className="text-left">
          <Form.Label>Select Pieces:</Form.Label>
          <MultiSelect options={options} selected={perform.pieces} onSelectedChanged={handleSelect} />
        </Form.Group>
        <Form.Group controlId="intermission">
          <Form.Label>Intermission (in minutes):</Form.Label>
          <Form.Control type="number" placeholder="minutes" min="0" max="30" name="intermission" onChange={handleChange} value={perform.intermission} required />
        </Form.Group>
        <Button variant="primary" className="btn btn-primary mr-2" type="submit">Submit</Button>
        <Button variant="secondary" className="ml-2" type="button" href={cancelPath}>Cancel</Button>
      </Form>
    </div>
  )
}

export default PerformForm
