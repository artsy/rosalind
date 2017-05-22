import React from 'react'
import styled from 'styled-components'
import { colors } from './Layout'

class GeneInput extends React.Component {
  render () {
    const { name, value } = this.props
    return (
      <Square value={value}>
        <Name value={value}>
          {name}
        </Name>
        <Value type='number' min='0' max='100' step='10' value={value === null ? '' : value} />
      </Square>
    )
  }
}

GeneInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.number
}

const Square = styled.div`
  ${props => {
    if (parseInt(props.value) === 0) {
      return `
        border: solid 1px ${colors.red};
      `
    } else if (props.value) {
      return `
        border: solid 1px ${colors.purple};
      `
    } else {
      return `
        border: solid 1px ${colors.grayLighter};
      `
    }
  }}
  width: 140px;
  height: 140px;
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`
Square.displayName = 'Square'

const Name = styled.div`
  ${props => {
    if (parseInt(props.value) === 0) {
      return `
        background: ${colors.redLightest};
        border-bottom: solid 1px ${colors.red};
      `
    } else if (props.value) {
      return `
        background: ${colors.purpleLightest};
        border-bottom: solid 1px ${colors.purple};
      `
    } else {
      return `
        background: ${colors.grayLightest};
        border-bottom: solid 1px ${colors.grayLighter};
      `
    }
  }}
  flex-basis: 100px;
  padding: 0.5em 1em;
  overflow: hidden;
`
Name.displayName = 'Name'

const Value = styled.input`
  flex-basis: 40px;
  border-color: transparent;
  padding: 1em;
  &:focus {
    outline: solid 1px ${colors.gray};
  }
`
Value.displayName = 'Value'

export default GeneInput
