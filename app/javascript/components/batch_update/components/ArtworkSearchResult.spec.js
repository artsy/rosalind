import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ArtworkSearchResult from './ArtworkSearchResult'

let props

beforeEach(() => {
  props = {
    artwork: {
      id: 'can',
      name: 'Soup Can',
      image_url: 'can.jpg',
      deleted: false,
      visibility_level: 'listed',
      published: true,
    },
    onPreviewArtwork: jest.fn(),
    onToggleArtwork: jest.fn(),
  }
})

it('renders the artwork image with alt text', () => {
  render(<ArtworkSearchResult {...props} />)
  expect(screen.getByAltText('Soup Can')).toBeInTheDocument()
})

it('renders visibility level', () => {
  render(<ArtworkSearchResult {...props} />)
  expect(screen.getByText(/Visibility level: listed/)).toBeInTheDocument()
})

it('fires the toggle handler on click', () => {
  render(<ArtworkSearchResult {...props} />)
  fireEvent.click(screen.getByAltText('Soup Can'))
  expect(props.onToggleArtwork).toHaveBeenCalledTimes(1)
})

it('fires the preview handler on command-click', () => {
  render(<ArtworkSearchResult {...props} />)
  fireEvent.click(screen.getByAltText('Soup Can'), { metaKey: true })
  expect(props.onPreviewArtwork).toHaveBeenCalledTimes(1)
})
