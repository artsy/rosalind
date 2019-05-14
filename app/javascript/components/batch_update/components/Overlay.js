import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: hsla(0, 0%, 0%, 0.5);
  z-index: ${props => props.z};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
Overlay.displayName = 'Overlay'
Overlay.defaultProps = {
  z: 1,
}

export default Overlay
