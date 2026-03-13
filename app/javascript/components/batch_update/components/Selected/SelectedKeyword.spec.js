import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedKeyword } from './SelectedKeyword'

let props

beforeEach(() => {
  props = {
    text: 'soup',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedKeyword {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
