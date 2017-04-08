import React from 'react'
import renderer from 'react-test-renderer'
import SearchResults from './SearchResults'

let soup, shark, artworks

beforeEach(() => {
  soup = {
    id: 'can',
    name: 'Soup Can',
    image_url: 'can.jpg',
    deleted: false,
    published: true,
    genomed: true
  }
  shark = {
    id: 'shark',
    name: 'Shark',
    image_url: 'shark.jpg',
    deleted: false,
    published: true,
    genomed: true
  }
  artworks = [soup, shark]
})

it('renders a collection of artworks', () => {
  const rendered = renderer.create(<SearchResults artworks={artworks} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders a modal when previewing', () => {
  const rendered = renderer.create(<SearchResults previewedArtwork={soup} artworks={artworks} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('does not render a modal when not previewing', () => {
  const rendered = renderer.create(<SearchResults previewedArtwork={null} artworks={artworks} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders a spinner while fetching artworks', () => {
  const rendered = renderer.create(<SearchResults isLoading previewedArtwork={null} artworks={artworks} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
