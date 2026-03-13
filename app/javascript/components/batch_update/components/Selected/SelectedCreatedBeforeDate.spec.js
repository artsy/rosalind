import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedCreatedBeforeDate } from './SelectedCreatedBeforeDate'

let props

beforeEach(() => {
  props = {
    name: 'Some date',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedCreatedBeforeDate {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
