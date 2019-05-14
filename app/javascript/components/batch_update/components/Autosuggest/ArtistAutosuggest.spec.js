import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ArtistAutosuggest } from './ArtistAutosuggest'

const mockHandler = jest.fn()

it('renders correctly', () => {
  const rendered = renderer.create(
    <ArtistAutosuggest onSelectArtist={mockHandler} />
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
