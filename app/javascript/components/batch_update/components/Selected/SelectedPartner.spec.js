import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedPartner } from './SelectedPartner'

let props

beforeEach(() => {
  props = {
    name: 'Gagosian',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedPartner {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
