import React from 'react'

const style = {
    width: '110px',
	height: '110px',
	border: '5px solid black',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'relative',
	cursor: 'pointer',
	fontSize: '350%'
}

const Cell = ({ value, onClick }) => {
  return (
    <div style={style} onClick={onClick}>{value}</div>
  )
}

export default Cell