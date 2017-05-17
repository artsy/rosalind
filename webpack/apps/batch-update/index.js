import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducers'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}
    <App />
  </Provider>,
  document.getElementById('root')
)
