import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Performances = ({ user, alerts }) => {
  console.log(user, alerts)
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
      .then(console.log)
      .catch(console.error)
  }, [])

  const piecesJsx = pieces.map(piece => (
    <div key={piece._id}>
      <li><Link to={`/pieces/${piece._id}`}>{piece.title}</Link></li>
      <p>by {piece.composer}</p>
    </div>
  ))

  return (
    <div>
      <h1>Repertoire</h1>
      <ul>
        {piecesJsx}
      </ul>
    </div>
  )
}

export default Performances
