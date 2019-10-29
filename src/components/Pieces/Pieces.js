import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Pieces = ({ user, alerts }) => {
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

  const piecesJsx = pieces.map(piece => (
    <div key={piece._id}>
      <p className="mb-0"><Link to={`/pieces/${piece._id}`}>{piece.title}</Link></p>
      <p>by {piece.composer}</p>
    </div>
  ))

  return (
    <div className="row col-sm-10 col-md-8 mx-auto">
      <div className="col-sm-10 col-md-8 mx-auto">
        <h1 className="mb-2">Repertoire</h1>
        {pieces.length ? piecesJsx : 'Please add music to your repertoire!'}
      </div>
    </div>
  )
}

export default Pieces
