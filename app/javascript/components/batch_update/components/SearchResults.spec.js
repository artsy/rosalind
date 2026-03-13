import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import SearchResults from './SearchResults'

let soup, shark, artworks, selectedArtworkIds

beforeEach(() => {
  soup = {
    id: 'can',
    name: 'Soup Can',
    image_url: 'can.jpg',
    deleted: false,
    published: true,
    visibility_level: 'listed',
  }
  shark = {
    id: 'shark',
    name: 'Shark',
    image_url: 'shark.jpg',
    deleted: false,
    published: true,
    visibility_level: 'unlisted',
  }
  artworks = [soup, shark]
  selectedArtworkIds = []
})

it('renders a collection of artworks', () => {
  const { asFragment } = render(
    <SearchResults
      artworks={artworks}
      totalHits={{}}
      selectedArtworkIds={selectedArtworkIds}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders a modal when previewing', () => {
  const { asFragment } = render(
    <SearchResults
      previewedArtwork={soup}
      artworks={artworks}
      totalHits={{}}
      selectedArtworkIds={selectedArtworkIds}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('does not render a modal when not previewing', () => {
  const { asFragment } = render(
    <SearchResults
      previewedArtwork={null}
      artworks={artworks}
      totalHits={{}}
      selectedArtworkIds={selectedArtworkIds}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders a spinner while fetching artworks', () => {
  const { asFragment } = render(
    <SearchResults
      isLoading
      previewedArtwork={null}
      artworks={artworks}
      totalHits={{}}
      selectedArtworkIds={selectedArtworkIds}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
