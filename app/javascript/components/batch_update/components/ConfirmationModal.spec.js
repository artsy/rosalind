import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-styled-components'
import ConfirmationModal from './ConfirmationModal'

let props

beforeEach(() => {
  props = {
    onDismiss: jest.fn(),
    onAccept: jest.fn(),
  }
})

it('renders correctly when closed', () => {
  const { container } = render(
    <ConfirmationModal {...props}>I am closed</ConfirmationModal>
  )
  expect(container.firstChild.className).not.toMatch('modal-open')
})

it('renders correctly when open', () => {
  const { container } = render(
    <ConfirmationModal {...props} isOpen>
      I am open
    </ConfirmationModal>
  )
  expect(container.firstChild.className).toMatch('modal-open')
})

describe('when the "Go back" button is clicked', () => {
  it('calls the correct handler', () => {
    render(<ConfirmationModal {...props}>Dismiss me?</ConfirmationModal>)
    fireEvent.click(screen.getByText('Go back'))
    expect(props.onDismiss).toHaveBeenCalledTimes(1)
  })
})

describe('when the "Continue" button is clicked', () => {
  it('calls the correct handler', () => {
    render(<ConfirmationModal {...props}>Accept me?</ConfirmationModal>)
    fireEvent.click(screen.getByText('Continue'))
    expect(props.onAccept).toHaveBeenCalledTimes(1)
  })
})
