import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import ConfirmationModal from './ConfirmationModal'
import { mount } from 'enzyme'

let props

beforeEach(() => {
  props = {
    onDismiss: jest.fn(),
    onAccept: jest.fn(),
  }
})

it('renders correctly when closed', () => {
  const rendered = renderer.create(
    <ConfirmationModal {...props}>I am closed</ConfirmationModal>
  )
  const classNames = rendered.root.findByType('div').props.className
  expect(classNames).not.toMatch('modal-open')
})

it('renders correctly when open', () => {
  const rendered = renderer.create(
    <ConfirmationModal {...props} isOpen>
      I am open
    </ConfirmationModal>
  )
  const classNames = rendered.root.findByType('div').props.className
  expect(classNames).toMatch('modal-open')
})

describe('when the "Go back" button is clicked', () => {
  it('calls the correct handler', () => {
    const wrapper = mount(
      <ConfirmationModal {...props}>Dismiss me?</ConfirmationModal>
    )
    const mockClickEvent = { preventDefault: jest.fn() }
    wrapper.find('Button.dismiss button').simulate('click', mockClickEvent)
    expect(props.onDismiss.mock.calls.length).toEqual(1)
  })
})

describe('when the "Continue" button is clicked', () => {
  it('calls the correct handler', () => {
    const wrapper = mount(
      <ConfirmationModal {...props}>Accept me?</ConfirmationModal>
    )
    const mockClickEvent = { preventDefault: jest.fn() }
    wrapper.find('Button.accept button').simulate('click', mockClickEvent)
    expect(props.onAccept.mock.calls.length).toEqual(1)
  })
})
