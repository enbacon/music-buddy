import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PieceForm from './PieceForm'

const EditPiece = ({ user, match, alert, history }) => {
  const [piece, setPiece] = useState({
    title: '',
    composer: '',
    memorized: 'false',
    piano: 'false'
  })

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/pieces/${match.params.id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then((responseData) => {
        responseData.data.piece.memorized = responseData.data.piece.memorized ? 'true' : 'false'
        responseData.data.piece.piano = responseData.data.piece.piano ? 'true' : 'false'
        return responseData
      })
      .then(responseData => setPiece(responseData.data.piece))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setPiece(piece => ({ ...piece, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      method: 'PATCH',
      url: `${apiUrl}/pieces/${match.params.id}`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { piece }
    })
      .then(() => alert({ heading: 'Success!', message: 'You updated a piece!', variant: 'success' }))
      .then(() => history.push(`/pieces/${match.params.id}`))
      .catch(() => alert({ heading: 'Rut roh!', message: 'Something went wrong', variant: 'danger' }))
  }

  return (
    <PieceForm
      piece={piece}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default withRouter(EditPiece)
