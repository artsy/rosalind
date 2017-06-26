import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from './Layout'

class GeneInput extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const { onChangeValue, name } = this.props
    const value = e.target.value
    onChangeValue({ name, value })
  }

  render () {
    const { name, value } = this.props
    return (
      <Square value={value}>
        <Name value={value}>
          { value === 0 ? <del>{name}</del> : name }
          <Bar value={value} />
        </Name>
        <Value
          type='number'
          min='0'
          max='100'
          step='10'
          placeholder='Multiple'
          value={value === null ? '' : value}
          onChange={this.handleChange}
        />
      </Square>
    )
  }
}

GeneInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChangeValue: PropTypes.func
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
  position: relative;
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

const Bar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: hsla(261, 100%, 85%, 0.15);
  transition: height 0.15s;
  ${props => {
    return `
      height: ${props.value}%;
    `
  }}
`
Bar.displayName = 'Bar'

export default GeneInput
