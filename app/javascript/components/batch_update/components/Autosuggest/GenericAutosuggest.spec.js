import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import GenericAutosuggest from './GenericAutosuggest'

let props

beforeEach(() => {
  const mockSuggestionsFetcher = jest.fn(() => {
    return new Promise(resolve => {
      resolve([])
    })
  })

  props = {
    placeholder: 'start typing',
    fetchSuggestions: mockSuggestionsFetcher,
    getSuggestionValue: jest.fn(),
    renderSuggestion: jest.fn(),
    selectSuggestion: jest.fn(),
  }
})

it('renders with the placeholder text', () => {
  render(<GenericAutosuggest {...props} />)
  expect(screen.getByPlaceholderText('start typing')).toBeInTheDocument()
})

it('invokes the supplied fetch function when the user types something', () => {
  render(<GenericAutosuggest {...props} />)
  const input = screen.getByPlaceholderText('start typing')
  fireEvent.change(input, { target: { value: 'Kaw' } })
  expect(props.fetchSuggestions).toHaveBeenCalledTimes(1)
})
