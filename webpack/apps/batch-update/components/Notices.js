import React from 'react'
import styled from 'styled-components'
import { colors } from './Layout'

class Notice extends React.Component {
  constructor (props) {
    super(props)
    this.enter = this.enter.bind(this)
    this.leave = this.leave.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  enter () {
    this._element.classList.add('entering')
    this._enterTimer = setTimeout(() => {
      this._element.classList.remove('entering')
    }, 400)
  }

  leave () {
    this._element.classList.add('leaving')
    this._leaveTimer = setTimeout(() => {
      this._element.classList.remove('leaving')
      this.destroy()
    }, 400)
  }

  destroy () {
    clearTimeout(this._enterTimer)
    clearTimeout(this._leaveTimer)
    this.props.onDismiss(this.props.id)
  }

  componentDidMount () {
    this.enter()
  }

  render () {
    const { className, children } = this.props
    return (
      <div className={className} ref={el => { this._element = el }}>
        <div className='message'>
          {children}
        </div>
        <div className='dismiss' onClick={this.leave}>
          ✕
        </div>
      </div>
    )
  }
}

Notice.propTypes = {
  id: React.PropTypes.string.isRequired,
  isError: React.PropTypes.bool,
  onDismiss: React.PropTypes.func.isRequired
}

const StyledNotice = styled(Notice)`
  position: relative;
  display: table;
  top: 0px;
  width: 100%;
  margin-bottom: 1em;

  background: white;
  border: solid 1px hsla(0, 0%, 0%, 0.1);
  color: ${colors.grayDarker};
  ${props => props.isError && `
    color: ${colors.red};
  `}
  opacity: 1;
  transition: all 0.4s;

  &.entering {
    opacity: 0;
    top: -20px;
  }

  &.leaving {
    opacity: 0;
    top: -20px;
  }

  & > .message {
    display: table-cell;
    padding: 1em;
  }

  & > .dismiss {
    display: table-cell;
    padding: 1em;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
`

const Notices = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 25%;
  min-width: 20em;
  padding: 1em;
  font-size: 0.9em;
`

export {
  StyledNotice as Notice,
  Notices
}
