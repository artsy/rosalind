import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { ESC } from 'lib/keycodes.js'

const GlobalStyle = createGlobalStyle`
  body.FullScreenModal--open {
    overflow: hidden;
  }
`

const Modal = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background: white;
  overflow: scroll;

  // modal is closed
  visibility: hidden;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.25s;

  // modal is open
  &.modal-open {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
    transition: all 0.125s;
  }
`
Modal.displayName = 'Modal'

class FullScreenModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyup = this.handleKeyup.bind(this)
  }

  componentWillUpdate({ isOpen: willBeOpen }) {
    const { isOpen } = this.props
    if (!isOpen && willBeOpen) {
      // modal is opening
      window.addEventListener('keyup', this.handleKeyup)
      document.body.classList.add('FullScreenModal--open')
    }
    if (isOpen && !willBeOpen) {
      // modal is closing
      window.removeEventListener('keyup', this.handleKeyup)
      document.body.classList.remove('FullScreenModal--open')
    }
  }

  handleKeyup(e) {
    if (e.keyCode === ESC) {
      this.props.onDismiss()
    }
  }

  render() {
    const { isOpen, children } = this.props

    const className = isOpen ? 'modal-open' : null
    return (
      <>
        <GlobalStyle />
        <Modal className={className}>{children}</Modal>
      </>
    )
  }
}

export default FullScreenModal
