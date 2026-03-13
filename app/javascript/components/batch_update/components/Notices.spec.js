import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Notices, Notice } from './Notices'

let props, dismissHandler

beforeEach(() => {
  dismissHandler = jest.fn()
  props = {
    id: 'abc123',
    message: "It's all going to be fine",
    onDismiss: dismissHandler,
  }
})

describe('Notice', () => {
  it('animates upon entering the dom', () => {
    const { container } = render(<Notice {...props} />)
    const noticeEl = container.firstChild
    expect(noticeEl).toHaveClass('entering')
  })

  it('can be dismissed with a click', () => {
    jest.useFakeTimers()
    render(<Notice {...props} />)

    fireEvent.click(screen.getByText('✕'))
    jest.runAllTimers()

    expect(dismissHandler).toBeCalled()
  })

  it('animates upon leaving the dom', () => {
    const { container } = render(<Notice {...props} />)
    fireEvent.click(screen.getByText('✕'))
    const noticeEl = container.firstChild
    expect(noticeEl).toHaveClass('leaving')
  })
})

describe('Notices', () => {
  it('renders correctly', () => {
    const { container } = render(<Notices />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
