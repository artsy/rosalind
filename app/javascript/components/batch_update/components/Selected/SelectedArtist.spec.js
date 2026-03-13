import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { SelectedArtist } from './SelectedArtist'

let props

beforeEach(() => {
  props = {
    name: 'Pablo',
    onRemove: jest.fn(),
  }
})

it('renders correctly', () => {
  const { asFragment } = render(<SelectedArtist {...props} />)
  expect(asFragment()).toMatchSnapshot()
})
