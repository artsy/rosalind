import React from 'react'
import renderer from 'react-test-renderer'
import Artwork from 'components/Artwork'

test('true is true', () => {
  expect(true).toBe(true)
})

it('renders correctly', () => {
  const tree = renderer.create(<Artwork />).toJSON()
  expect(tree).toMatchSnapshot()
})
