import React from 'react'
import { render, screen } from '@testing-library/react'
import 'jest-styled-components'
import { FairAutosuggest } from './FairAutosuggest'

const mockHandler = jest.fn()

it('renders the fair autosuggest input', () => {
  render(<FairAutosuggest onSelectFair={mockHandler} />)
  expect(screen.getByPlaceholderText('Select a fair')).toBeInTheDocument()
})
