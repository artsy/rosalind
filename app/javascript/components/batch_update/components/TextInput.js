import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class TextInput extends React.Component {
  handleKeyUp = e => {
    if (e.key === 'Enter') {
      let value
      if (this.props.numeric) {
        value = parseInt(e.target.value)
        if (isNaN(value)) {
          return
        }
      } else {
        value = e.target.value
      }
      this.props.onEnter(value)
      e.target.value = null
    }
  }

  render() {
    const inputProps = {
      type: 'text',
      placeholder: this.props.placeholder,
      onKeyUp: this.handleKeyUp,
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
