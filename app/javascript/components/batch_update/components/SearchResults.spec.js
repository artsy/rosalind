import React from 'react'
import renderer from 'react-test-renderer'
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
  const rendered = renderer.create(
    <SearchResults
      artworks={artworks}
      totalHits={{}}
      selectedArtworkIds={selectedArtworkIds}
    />
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders a modal when previewing', () => {
  const rendered = renderer.create(
    <SearchResults
      previewedArtwork={soup}
      artworks={artworks}
      totalHits={{}}
      selectedArtworkIds={selectedArtworkIds}
    />
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('does not render a modal when not previewing', () => {
  const rendered = renderer.create(
    <SearchResults
      previewedArtwork={null}
      artworks={artworks}
      totalHits={{}}
      selectedArtworkIds={selectedArtworkIds}
    />
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders a spinner while fetching artworks', () => {
  const rendered = renderer.create(
    <SearchResults
      isLoading
      previewedArtwork={null}
      artworks={artworks}
      totalHits={{}}
      selectedArtworkIds={selectedArtworkIds}
    />
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
