import React from 'react'
import { render, screen } from '@testing-library/react'
import 'jest-styled-components'
import { ArtistAutosuggest } from './ArtistAutosuggest'

const mockHandler = jest.fn()

it('renders the artist autosuggest input', () => {
  render(<ArtistAutosuggest onSelectArtist={mockHandler} />)
  expect(screen.getByPlaceholderText('Select an artist')).toBeInTheDocument()
})
