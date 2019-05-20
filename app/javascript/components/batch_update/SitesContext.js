import React from 'react'
import PropTypes from 'prop-types'

const defaults = {
  artsy: 'http://artsy',
  volt: 'http://cms',
  helix: 'http://helix',
}

const { Provider, Consumer } = React.createContext(defaults)

class SitesProvider extends React.Component {
  render() {
    const { children, sites } = this.props
    return <Provider value={sites}>{children}</Provider>
  }
}

SitesProvider.propTypes = {
  sites: PropTypes.shape({
    artsy: PropTypes.string.isRequired,
    volt: PropTypes.string.isRequired,
    helix: PropTypes.string.isRequired,
  }).isRequired,
}

export { SitesProvider, Consumer as SitesConsumer }
