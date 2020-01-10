import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { mount } from 'enzyme'
import ArtworkPreviewModal from './ArtworkPreviewModal'
import { SitesProvider } from '../SitesContext'

let artwork

beforeEach(() => {
  artwork = {
    _id: 'can',
    id: 'can',
    name: 'Soup Can',
    image_url: 'can.jpg',
    deleted: false,
    published: true,
    category: 'Painting',
    medium: 'oil on canvas',
    dimensions: {
      cm: 'foo',
      in: 'bar',
    },
    ecommerce: false,
    availability: 'not for sale',
    acquireable: false,
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
      json: () => Promise.resolve(artwork),
    })
  })

  mount(<ArtworkPreviewModal artwork={artwork} />)

  expect(window.fetch).not.toHaveBeenCalled()
  jest.runAllTimers()
  expect(window.fetch).toHaveBeenCalled()
})

it('uses Context to render links to external sites', () => {
  const mockSites = {
    artsy: 'http://artsy.mock',
    volt: 'http://cms.mock',
    helix: 'http://helix.mock',
  }

  const wrapper = mount(
    <SitesProvider sites={mockSites}>
      <ArtworkPreviewModal artwork={artwork} />
    </SitesProvider>
  )

  const externalLinks = wrapper.find('ExternalLinks')
  expect(externalLinks.find('a')).toHaveLength(4)
  expect(externalLinks.html()).toMatch('http://artsy.mock/artwork/')
  expect(externalLinks.html()).toMatch('http://cms.mock/artworks/')
  expect(externalLinks.html()).toMatch('http://helix.mock/genome/artworks')
  expect(externalLinks.html()).toMatch('http://helix.mock/genome/artist')
})
