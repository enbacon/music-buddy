import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PerformanceForm = ({ performance, handleChange, handleSubmit }) => {
  const cancelPath = performance._id ? `#/performances/${performance._id}` : '#performances'

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={performance.title}
          required
        />
      </Form.Group>
      <Form.Group controlId="composer">
        <Form.Label>Composer:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Composer"
          name="composer"
          onChange={handleChange}
          value={performance.composer}
          required
        />
      </Form.Group>
      <div className="mb-3">
        <p>Memorized:</p>
        <Form.Check inline onChange={handleChange} label="Yes" type="radio" name="memorized" value="true" />
        <Form.Check inline onChange={handleChange} label="No" type="radio" name="memorized" value="false" />
      </div>
      <div className="mb-3">
        <p>Piano Accompaniment:</p>
        <Form.Check inline onChange={handleChange} label="Yes" type="radio" name="piano" value="true" />
        <Form.Check inline onChange={handleChange} label="No" type="radio" name="piano" value="false" />
      </div>
      <Button variant="primary" className="btn btn-primary mr-2" type="submit">Submit</Button>
      <Button variant="secondary" className="ml-2" type="button" href={cancelPath}>Cancel</Button>
    </Form>
  )
}

export default PerformanceForm
