import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedComponent } from './SelectedComponent'

let props

beforeEach(() => {
  props = {
    name: 'Foo Name',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedComponent {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('fires the remove handler on click', () => {
  render(<SelectedComponent {...props} />)
  fireEvent.click(screen.getByText('✕'))
  expect(props.onRemove).toHaveBeenCalledTimes(1)
})
