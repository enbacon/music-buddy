import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import PieceForm from './PieceForm'
// import { Link } from 'react-router-dom'

const CreatePiece = ({ user }) => {
  const pieceObject = {
    title: '',
    composer: '',
    memorized: 'false',
    piano: 'false'
  }
  const [created, setCreated] = useState(false)
  const [piece, setPiece] = useState(pieceObject)

  const handleChange = event => {
    event.persist()
    setPiece(piece => ({ ...piece, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      method: 'POST',
      url: `${apiUrl}/pieces`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { piece }
    })
      .then(responseData => setCreated(responseData.data.piece._id))
      .catch(console.error)
  }

  if (created) {
    return <Redirect to={`/pieces/${created}`} />
  }

  return (
    <PieceForm
      piece={piece}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreatePiece
