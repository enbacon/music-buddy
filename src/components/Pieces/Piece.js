import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Piece = ({ user, alerts, match }) => {
  const [piece, setPiece] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/pieces/${match.params.id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(responseData => setPiece(responseData.data.piece))
      .catch(console.error)
  }, [])

  // AJAX request to delete piece
  const destroy = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/pieces/${match.params.id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  // if piece is deleted then redirect to pieces
  if (deleted) {
    return <Redirect to={
      { pathname: '/pieces' } } />
  }

  return (
    <div className="row col-sm-10 col-md-8 mx-auto">
      <h1>Piece</h1>
      <p><strong>Title:</strong> {piece && piece.title}</p>
      <p><strong>Composer:</strong> {piece && piece.composer}</p>
      <p><strong>Memorized:</strong> {(piece && piece.memorized) ? 'Yes' : 'No'}</p>
      <p><strong>Piano Accompaniment:</strong> {(piece && piece.piano) ? 'Yes' : 'No'}</p>
      <div>
        <Button className="btn btn-primary mr-2" href={`#/pieces/${match.params.id}/edit`}>Edit</Button>
        <button className="btn btn-primary mr-2" onClick={destroy}>Delete Piece</button>
      </div>
      <Link to="/pieces" className="mt-2">Return to Repertoire</Link>
    </div>
  )
}

export default withRouter(Piece)
