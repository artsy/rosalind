import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedTag } from './SelectedTag'

let props

beforeEach(() => {
  props = {
    name: 'Clown',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedTag {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
