import React from 'react'

class SelectedGene extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (e) {
    e.preventDefault()
    this.props.onRemoveGene(this.props.name)
  }

  render () {
    const { className, name } = this.props
    return (
      <div className={className}>
        {name}
        <a href='#' className='remove'
          onClick={this.handleRemove}>✕</a>
      </div>
    )
  }
}

SelectedGene.propTypes = {
  name: React.PropTypes.string.isRequired,
  onRemoveGene: React.PropTypes.func.isRequired
}

/* default styled component */

import styled from 'styled-components'

const StyledSelectedGene = styled(SelectedGene)`
  font-weight: bold;
  margin: 0.25em 0;

  a.remove {
    display: inline-block;
    height: 2em;
    width: 2em;
    line-height: 2em;
    text-align: center;
    color: #ddd;
    margin-left: 0.5em;
    border-radius: 1em;
    text-decoration: none;
    &:hover {
      color: #333;
      cursor: pointer;
      background: #eee;
    }
  }
`

export default StyledSelectedGene
