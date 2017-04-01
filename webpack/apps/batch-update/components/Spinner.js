import React from 'react'

export default function Spinner () {
  const overlayStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 'calc(100vh - 50px)',
    background: 'hsla(0, 0%, 100%, 0.90)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1
  }
  const barStyle = {
    width: '12%',
    height: '1%',
    background: 'black',
    alignSelf: 'center',
    zIndex: 2
  }
  return (
    <div style={overlayStyle}>
      <div style={barStyle} />
    </div>
  )
}
