import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class TextInput extends React.Component {
  handleKeyUp = e => {
    if (e.key === 'Enter') {
      this.props.onEnter(e.target.value)
      e.target.value = null
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <input
          type="text"
          placeholder={this.props.placeholder}
          onKeyUp={this.handleKeyUp}
        />
      </div>
    )
  }
}

TextInput.propTypes = {
  onEnter: PropTypes.func
}

TextInput.defaultProps = {
  placeholder: 'Add some text'
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
