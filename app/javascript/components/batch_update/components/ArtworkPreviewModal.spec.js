import React from 'react'
import { render, screen } from '@testing-library/react'
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

it('renders the artwork name', () => {
  render(<ArtworkPreviewModal artwork={artwork} />)
  expect(screen.getByText('Soup Can')).toBeInTheDocument()
})

it('fetches more data after a delay', () => {
  jest.useFakeTimers()
  window.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(artwork),
    })
  })

  render(<ArtworkPreviewModal artwork={artwork} />)

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

  render(
    <SitesProvider sites={mockSites}>
      <ArtworkPreviewModal artwork={artwork} />
    </SitesProvider>
  )

  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(4)

  const hrefs = links.map(link => link.getAttribute('href'))
  expect(hrefs.some(h => h.includes('http://artsy.mock/artwork/'))).toBe(true)
  expect(hrefs.some(h => h.includes('http://cms.mock/artworks/'))).toBe(true)
  expect(hrefs.some(h => h.includes('http://helix.mock/genome/artworks'))).toBe(
    true
  )
  expect(hrefs.some(h => h.includes('http://helix.mock/genome/artist'))).toBe(
    true
  )
})
