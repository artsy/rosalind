import React from 'react'
import { render, screen } from '@testing-library/react'
import 'jest-styled-components'
import { TagAutosuggest } from './TagAutosuggest'

const mockHandler = jest.fn()

it('renders the tag autosuggest input', () => {
  render(<TagAutosuggest onSelectTag={mockHandler} />)
  expect(screen.getByPlaceholderText('Select a tag')).toBeInTheDocument()
})
