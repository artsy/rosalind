import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from './Layout'
import { ESC } from 'lib/keycodes.js'
import { Button } from '@artsy/palette'

const Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 40%;
  width: 600px;
  height: auto;
  background: white;
  z-index: 2;
  padding: 20px;

  // modal is closed
  visibility: hidden;
  opacity: 0;
  transform: scale(0.95) translate(-50%, -50%);
  transition: all 0.25s;

  // modal is open
  &.modal-open {
    visibility: visible;
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
    transition: all 0.125s;
  }

  & h1 {
    font-weight: normal;
    font-size: 1.5em;
    color: ${colors.grayDarker};
  }

  & section {
    color: ${colors.grayDarkest};
    border-top: solid 1px ${colors.grayLighter};
    margin-top: 1em;
    padding-top: 1em;
  }

  & section p {
    margin-bottom: 1em;
  }
`
Modal.displayName = 'Modal'

const Controls = styled.div`
  border-top: solid 1px ${colors.grayLighter};
  margin-top: 1em;
  padding-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  & a {
    margin-left: 1em;
  }
`
Controls.displayName = 'Controls'

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyup = this.handleKeyup.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
    this.handleAcceptClick = this.handleAcceptClick.bind(this)
  }

  componentWillUpdate({ isOpen: willBeOpen }) {
    const { isOpen } = this.props
    if (!isOpen && willBeOpen) {
      // modal is opening
      window.addEventListener('keyup', this.handleKeyup)
    }
    if (isOpen && !willBeOpen) {
      // modal is closing
      window.removeEventListener('keyup', this.handleKeyup)
    }
  }

  handleKeyup(e) {
    if (e.keyCode === ESC) {
      this.props.onDismiss()
    }
  }

  handleDismissClick(e) {
    e.preventDefault()
    this.props.onDismiss()
  }

  handleAcceptClick(e) {
    e.preventDefault()
    this.props.onAccept()
  }

  render() {
    const { isOpen, children } = this.props
    const className = isOpen ? 'modal-open' : null
    return (
      <Modal className={className}>
        {children}
        <Controls>
          <Button
            variant="secondaryOutline"
            mx={1}
            className="dismiss"
            onClick={this.handleDismissClick}
          >
            Go back
          </Button>
          <Button className="accept" onClick={this.handleAcceptClick}>
            Continue
          </Button>
        </Controls>
      </Modal>
    )
  }
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
}

export default ConfirmationModal
