import React from 'react'
import ReactDOM from 'react-dom'
import Artwork from 'components/Artwork/index.js'

ReactDOM.render(
  <Artwork {...window.artwork} />,
  document.getElementById('root')
)
