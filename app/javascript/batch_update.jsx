import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/batch_update'

const root = document.getElementById('root')
const props = JSON.parse(root.dataset.props)
ReactDOM.render(<App {...props} />, root)
