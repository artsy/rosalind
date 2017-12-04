import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
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
  expect(console.error.mock.calls[0][0]).toMatch(/warning: failed prop type/i)
})

it('renders correctly', () => {
  const rendered = renderer.create(<ArtworkPreviewModal artwork={artwork} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
