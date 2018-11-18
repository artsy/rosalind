import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { mount } from 'enzyme'
import ArtworkPreviewModal from './ArtworkPreviewModal'

let artwork

beforeEach(() => {
  artwork = {
    _id: 'can',
    id: 'can',
    name: 'Soup Can',
    image_url: 'can.jpg',
    deleted: false,
    published: true,
    genomed: true,
    category: 'Painting',
    medium: 'oil on canvas',
    dimensions: {
      cm: 'foo',
      in: 'bar'
    },
    ecommerce: false,
    availability: 'not for sale',
    acquireable: false
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<ArtworkPreviewModal artwork={artwork} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('fetches more data after a delay', () => {
  jest.useFakeTimers()
  window.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(artwork)
    })
  })

  mount(
    <ArtworkPreviewModal artwork={artwork} />
  )

  expect(window.fetch).not.toHaveBeenCalled()
  jest.runAllTimers()
  expect(window.fetch).toHaveBeenCalled()
})
