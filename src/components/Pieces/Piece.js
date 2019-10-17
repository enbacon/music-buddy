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
    <div>
      <h1>Piece</h1>
      <p>Title: {piece && piece.title}</p>
      <p>Composer: {piece && piece.composer}</p>
      <p>Memorized: {(piece && piece.memorized) ? 'Yes' : 'No'}</p>
      <p>Piano Accompaniment: {(piece && piece.piano) ? 'Yes' : 'No'}</p>
      <Button className="btn btn-primary mr-2" href={`#/pieces/${match.params.id}/edit`}>Edit</Button>
      <button className="btn btn-outline-dark mr-2" onClick={destroy}>Delete Piece</button>
      <Link to="/pieces">Return to Repertoire</Link>
    </div>
  )
}

// {*/ withRouter gives Piece all of the props /*}
export default withRouter(Piece)
