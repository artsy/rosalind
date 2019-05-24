import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from './Layout'

export const PENDING = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
}

class TagInput extends React.Component {
  render() {
    const { name, pendingAction, onClick } = this.props
    return (
      <Capsule pendingAction={pendingAction} onClick={onClick}>
        {pendingAction === PENDING.REMOVE ? <strike>{name}</strike> : name}
      </Capsule>
    )
  }
}

TagInput.propTypes = {
  name: PropTypes.string.isRequired,
  pendingAction: PropTypes.string,
  onClick: PropTypes.func,
}

const Capsule = styled.div`
  ${props => {
    if (props.pendingAction === PENDING.REMOVE) {
      return `
        border: solid 1px ${colors.red};
        background: ${colors.redLightest};
      `
    } else if (props.pendingAction === PENDING.ADD) {
      return `
        border: solid 1px ${colors.purple};
        background: ${colors.purpleLightest};
      `
    } else {
      return `
        border: solid 1px ${colors.grayLighter};
        background: ${colors.grayLightest};
      `
    }
  }}
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px;
  user-select: none;
`

export default TagInput
