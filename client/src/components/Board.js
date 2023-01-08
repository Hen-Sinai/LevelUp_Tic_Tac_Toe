import React from 'react'
import Cell from './Cell'

const style = {
  width: '100vw',
	height: '65vh',
	display: 'grid',
	justifyContent: 'center',
	alignContent: 'center',
	justifyItems: 'center',
	alignItems: 'center',
	gridTemplateColumns: 'repeat(3, auto)'
}

const Board = ({ cells, onClick }) => {
  return (
    <div style={style}>
        {cells.map((cell, i) => (
          <Cell key={i} value={cell} onClick={() => onClick(i)} />
        ))}
    </div>

  )
}

export default Board