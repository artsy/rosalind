import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import ArtworkSearchResult from './ArtworkSearchResult'

let props

beforeEach(() => {
  props = {
    artwork: {
      id: 'can',
      name: 'Soup Can',
      image_url: 'can.jpg',
      deleted: false,
      published: true,
      genomed: true
    },
    onPreviewArtwork: jest.fn(),
    onToggleArtwork: jest.fn()
  }
})

it('requires an artwork', () => {
  console.error = jest.fn()
  expect(() => {
    renderer.create(<ArtworkSearchResult />)
  }).toThrow()
  expect(console.error.mock.calls.length).toEqual(1)
})

it('renders correctly', () => {
  const rendered = renderer.create(<ArtworkSearchResult {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders in the selected state', () => {
  const rendered = renderer.create(<ArtworkSearchResult {...props} selected />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('fires the toggle handler on click', () => {
  const wrapper = mount(<ArtworkSearchResult {...props} />)
  wrapper.find('div').simulate('click')
  expect(props.onToggleArtwork.mock.calls.length).toEqual(1)
})

it('fires the preview handler on command-click', () => {
  const wrapper = mount(<ArtworkSearchResult {...props} />)
  const mockClickEvent = { metaKey: true }
  wrapper.find('div').simulate('click', mockClickEvent)
  expect(props.onPreviewArtwork.mock.calls.length).toEqual(1)
})
