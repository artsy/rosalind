import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import Spinner from './Spinner'

it('renders correctly', () => {
  const { asFragment } = render(<Spinner />)
  expect(asFragment()).toMatchSnapshot()
})
