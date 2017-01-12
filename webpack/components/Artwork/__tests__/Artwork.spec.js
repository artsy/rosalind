import React from 'react'
import renderer from 'react-test-renderer'
import Artwork from 'components/Artwork'

it('renders correctly', () => {
  const artworkFixture = {
    title: 'title',
    images: [
      { image_urls: { normalized: 'soup-can.jpg' } }
    ],
    artist: { name: 'andy warhol' }
  }
  const tree = renderer.create(<Artwork {...artworkFixture} />).toJSON()
  expect(tree).toMatchSnapshot()
})
