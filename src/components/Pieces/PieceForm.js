import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PieceForm = ({ piece, handleChange, handleSubmit }) => {
  const cancelPath = piece._id ? `#/pieces/${piece._id}` : '#pieces'

  return (
    <div className="mt-2 text-left row col-sm-10 col-md-8 mx-auto">
      <Form onSubmit={handleSubmit} className="col-md-10 mx-auto">
        <Form.Group controlId="title">
          <Form.Label><strong>Title:</strong></Form.Label>
          <Form.Control type="text" placeholder="Title" autoComplete="off" name="title" onChange={handleChange} value={piece.title} required />
        </Form.Group>
        <Form.Group controlId="composer">
          <Form.Label><strong>Composer:</strong></Form.Label>
          <Form.Control type="text" placeholder="Composer" autoComplete="off" name="composer" onChange={handleChange} value={piece.composer} required />
        </Form.Group>

        <div className="mb-3">
          <p><strong>Memorized:</strong></p>
          <Form.Check inline type="radio" value="true" name="memorized" label="Yes" onChange={handleChange} checked={piece.memorized === 'true'} />
          <Form.Check
            inline type="radio" value="false" name="memorized" label="No" checked={piece.memorized === 'false'} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <p><strong>Piano Accompaniment:</strong></p>
          <Form.Check inline type="radio" value="true" name="piano" label="Yes" onChange={handleChange} checked={piece.piano === 'true'} />
          <Form.Check inline type="radio" value="false" name="piano" label="No" onChange={handleChange} checked={piece.piano === 'false'} required />
        </div>
        <Button variant="primary" className="btn btn-primary mr-2" type="submit">Submit</Button>
        <Button variant="secondary" className="ml-0" type="button" href={cancelPath}>Cancel</Button>
      </Form>
    </div>
  )
}

export default PieceForm
