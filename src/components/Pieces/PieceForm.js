import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PieceForm = ({ piece, handleChange, handleSubmit }) => {
  const cancelPath = piece._id ? `#/pieces/${piece._id}` : '#pieces'

  return (
    <Form onSubmit={handleSubmit} className="mt-2">
      <Form.Group controlId="title">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          autoComplete="off"
          name="title"
          onChange={handleChange}
          value={piece.title}
          required
        />
      </Form.Group>
      <Form.Group controlId="composer">
        <Form.Label>Composer:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Composer"
          autoComplete="off"
          name="composer"
          onChange={handleChange}
          value={piece.composer}
          required
        />
      </Form.Group>
      <div className="mb-3">
        <p>Memorized:</p>
        <Form.Check
          inline
          type="radio"
          value="true"
          name="memorized"
          label="Yes"
          onChange={handleChange}
          checked={piece.memorized === 'true'}
        />
        <Form.Check
          inline
          type="radio"
          value="false"
          name="memorized"
          label="No"
          checked={piece.memorized === 'false'}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <p>Piano Accompaniment:</p>
        <Form.Check
          inline
          type="radio"
          value="true"
          name="piano"
          label="Yes"
          onChange={handleChange}
          checked={piece.piano === 'true'}
        />
        <Form.Check
          inline
          type="radio"
          value="false"
          name="piano"
          label="No"
          onChange={handleChange}
          checked={piece.piano === 'false'}
          required
        />
      </div>
      <Button variant="primary" className="btn btn-primary mr-2" type="submit">Submit</Button>
      <Button variant="secondary" className="ml-2" type="button" href={cancelPath}>Cancel</Button>
    </Form>
  )
}

export default PieceForm
