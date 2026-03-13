import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedCreatedAfterDate } from './SelectedCreatedAfterDate'

let props

beforeEach(() => {
  props = {
    name: 'Some date',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedCreatedAfterDate {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
