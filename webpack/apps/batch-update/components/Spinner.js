import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

const spinning = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: calc(100vh - 50px);
  background: hsla(0, 0%, 100%, 0.90);
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 1
`

const AnimatedLine = styled.div`
  width: 12%;
  height: 1%;
  background: ${props => props.color};
  align-self: center;
  z-index: 2;
  animation: ${spinning} 2s linear infinite;
`

AnimatedLine.propTypes = {
  color: PropTypes.string
}

AnimatedLine.defaultProps = {
  color: 'black'
}

const Spinner = () => (
  <Overlay>
    <AnimatedLine />
  </Overlay>
)

export default Spinner
