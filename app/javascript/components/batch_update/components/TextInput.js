import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class TextInput extends React.Component {
  handleKeyUp = e => {
    if (e.key === 'Enter') {
      let value = e.target.value
      if (this.props.numeric) {
        value = parseInt(value)
      }
      this.props.onEnter(value)
      e.target.value = null
    }
  }

  handleKeyDown = e => {
    if (!this.props.numeric) return
    if (e.metaKey) return
    if (e.ctrlKey) return
    if (e.key === 'Enter') return
    if (e.key === 'Backspace') return
    if (e.key === 'Delete') return
    if (e.key === 'Tab') return
    if (e.keyCode >= 48 && e.keyCode <= 57 && !e.shiftKey) return
    e.preventDefault()
  }

  render() {
    const inputProps = {
      type: 'text',
      placeholder: this.props.placeholder,
      onKeyUp: this.handleKeyUp,
    }

    if (this.props.numeric) {
      inputProps.onKeyDown = this.handleKeyDown
    }

    return (
      <div className={this.props.className}>
        <input {...inputProps} />
      </div>
    )
  }
}

TextInput.propTypes = {
  onEnter: PropTypes.func,
}

TextInput.defaultProps = {
  placeholder: 'Add some text',
}

const StyledTextInput = styled(TextInput)`
  input {
    width: 100%;
    margin: 1em 0 0 0;
    line-height: 2em;
    font-size: 1em;
    border: none;
    border-bottom: solid 1px #ddd;
    background: none;
  }

  input:focus {
    outline: none;
  }
`

export { StyledTextInput as default, TextInput }
