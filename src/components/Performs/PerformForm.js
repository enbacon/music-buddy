import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import MultiSelect from '@khanacademy/react-multi-select'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const PerformForm = ({ user, perform, handleChange, handleSelect, handleSubmit }) => {
  const cancelPath = perform && perform._id ? `#/performances/${perform._id}` : '#performances'

  const [pieces, setPieces] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/pieces`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(responseData => setPieces(responseData.data.pieces))
      .catch(console.error)
  }, [])

  const options = pieces.map(piece => (
    { label: piece.title, value: piece._id }
  ))

  return (
    <Form onSubmit={handleSubmit} className="mt-2">
      <Form.Group controlId="date">
        <Form.Label>Date:</Form.Label>
        <Form.Control
          type="date"
          name="date"
          min="2014-01-01"
          max="2119-01-01"
          onChange={handleChange}
          value={perform.date}
          required
        />
      </Form.Group>
      <Form.Group controlId="time">
        <Form.Label>Time:</Form.Label>
        <Form.Control
          type="time"
          name="time"
          onChange={handleChange}
          value={perform.time}
          required
        />
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label>Location:</Form.Label>
        <Form.Control
          type="text"
          placeholder="address"
          name="location"
          onChange={handleChange}
          value={perform.location}
          required
        />
      </Form.Group>
      <Form.Group controlId="piece">
        <Form.Label>Select Pieces:</Form.Label>
        <MultiSelect
          options={options}
          selected={perform.pieces}
          onSelectedChanged={handleSelect}
        />
      </Form.Group>
      <Form.Group controlId="intermission">
        <Form.Label>Intermission:</Form.Label>
        <Form.Control
          type="number"
          placeholder="minutes"
          min="0"
          max="30"
          name="intermission"
          onChange={handleChange}
          value={perform.intermission}
          required
        />
      </Form.Group>
      <Button variant="primary" className="btn btn-primary mr-2" type="submit">Submit</Button>
      <Button variant="secondary" className="ml-2" type="button" href={cancelPath}>Cancel</Button>
    </Form>
  )
}

export default PerformForm
