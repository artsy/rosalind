import React from 'react'
import { SitesProvider } from './SitesContext'
import { Theme } from '@artsy/palette'
import App from './components/App'

const AppWithContext = props => (
  <SitesProvider sites={props.sites}>
    <Theme>
      <App />
    </Theme>
  </SitesProvider>
)

export default AppWithContext
