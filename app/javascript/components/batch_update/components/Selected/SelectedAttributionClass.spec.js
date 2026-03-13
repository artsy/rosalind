import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedAttributionClass } from './SelectedAttributionClass'

let props

beforeEach(() => {
  props = {
    name: 'Ephemera',
    clearState: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedAttributionClass {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
