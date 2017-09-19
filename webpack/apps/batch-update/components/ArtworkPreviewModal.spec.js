import React from 'react'
import renderer from 'react-test-renderer'
import ArtworkPreviewModal from './ArtworkPreviewModal'

let artwork

beforeEach(() => {
  artwork = {
    id: 'can',
    name: 'Soup Can',
    image_url: 'can.jpg',
    deleted: false,
    published: true,
    genomed: true
  }
})

it('requires an artwork', () => {
  console.error = jest.fn()
  expect(() => {
    renderer.create(<ArtworkPreviewModal />)
  }).toThrow()
  expect(console.error.mock.calls.length).toEqual(1)
})

it('renders correctly', () => {
  const rendered = renderer.create(<ArtworkPreviewModal artwork={artwork} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
