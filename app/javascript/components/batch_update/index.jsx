import React from 'react'
import { SitesProvider } from './SitesContext'
import App from './components/App'

const AppWithContext = (props) => (
  <SitesProvider sites={props.sites}>
    <App />
  </SitesProvider>
)

export default AppWithContext
