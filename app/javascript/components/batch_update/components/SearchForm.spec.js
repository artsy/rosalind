import React from 'react'
import { render, screen } from '@testing-library/react'
import moment from 'moment'
import SearchForm from './SearchForm'

let props

beforeEach(() => {
  props = {
    artists: [],
    attributionClass: null,
    artworksCount: 0,
    createdAfterDate: null,
    createdBeforeDate: null,
    fair: null,
    forSaleFilter: 'SHOW_ALL',
    genes: [],
    keywords: [],
    acquireableOrOfferableFilter: 'SHOW_ALL',
    minPrice: null,
    maxPrice: null,
    onAddKeyword: jest.fn(),
    onAddGene: jest.fn(),
    onAddTag: jest.fn(),
    onAddArtist: jest.fn(),
    onClearFair: jest.fn(),
    onClearPartner: jest.fn(),
    onRemoveKeyword: jest.fn(),
    onRemoveGene: jest.fn(),
    onRemoveTag: jest.fn(),
    onRemoveArtist: jest.fn(),
    partner: null,
    publishedFilter: 'SHOW_ALL',
    listedFilter: 'SHOW_ALL',
    restrictedArtworkIDs: [],
    selectedArtworkIds: [],
    selectedArtworksCount: 0,
    tags: [],
    updateStateFor: jest.fn(),
  }
})

it('does not render partner autosuggest if partner is already selected', () => {
  Object.assign(props, {
    partner: { id: 'nice-gallery', name: 'Nice Gallery' },
  })
  render(<SearchForm {...props} />)
  expect(
    screen.queryByPlaceholderText('Search for a partner')
  ).not.toBeInTheDocument()
})

it('does not render fair autosuggest if fair is already selected', () => {
  Object.assign(props, { fair: { id: 'nice-fair', name: 'Nice Fair' } })
  render(<SearchForm {...props} />)
  expect(
    screen.queryByPlaceholderText('Search for a fair')
  ).not.toBeInTheDocument()
})

it('does not render sale autosuggest if sale is already selected', () => {
  Object.assign(props, { sale: { id: 'phillips-sale', name: 'Phillips' } })
  render(<SearchForm {...props} />)
  expect(
    screen.queryByPlaceholderText('Search for a sale')
  ).not.toBeInTheDocument()
})

it('does not render attribution class autosuggest if it is already selected', () => {
  Object.assign(props, {
    attributionClass: { id: 'ephemera', name: 'Ephemera' },
  })
  render(<SearchForm {...props} />)
  expect(
    screen.queryByPlaceholderText('Search for an attribution class')
  ).not.toBeInTheDocument()
})

it('does not render createdAfterDate input if createdAfterDate is already entered', () => {
  const createdAfterDate = moment('2020-01-01T12:00:00-00:00')
    .utc()
    .format()
  Object.assign(props, { createdAfterDate })

  render(<SearchForm {...props} />)
  expect(screen.queryByPlaceholderText('Created after')).not.toBeInTheDocument()
})

it('does not render createdBeforeDate input if createdBeforeDate is already entered', () => {
  const createdBeforeDate = moment('2020-01-01T12:00:00-00:00')
    .utc()
    .format()
  Object.assign(props, { createdBeforeDate })

  render(<SearchForm {...props} />)
  expect(
    screen.queryByPlaceholderText('Created before')
  ).not.toBeInTheDocument()
})

it('does not render minPrice input if minPrice is already set', () => {
  Object.assign(props, { minPrice: 1000 })
  render(<SearchForm {...props} />)
  expect(screen.queryByPlaceholderText('Minimum Price')).not.toBeInTheDocument()
  expect(screen.getByPlaceholderText('Maximum Price')).toBeInTheDocument()
})

it('does not render maxPrice input if maxPrice is already set', () => {
  Object.assign(props, { maxPrice: 1000 })
  render(<SearchForm {...props} />)
  expect(screen.getByPlaceholderText('Minimum Price')).toBeInTheDocument()
  expect(screen.queryByPlaceholderText('Maximum Price')).not.toBeInTheDocument()
})

describe('"edit artworks" button', () => {
  it('does not render an edit button if there are no artworks', () => {
    Object.assign(props, { artworksCount: 0 })
    render(<SearchForm {...props} />)
    expect(
      screen.queryByRole('button', { name: 'Edit Artworks' })
    ).not.toBeInTheDocument()
  })

  it('renders a disabled edit button if there are artworks, but none selected', () => {
    Object.assign(props, { artworksCount: 100, selectedArtworksCount: 0 })
    render(<SearchForm {...props} />)
    const button = screen.getByRole('button', { name: 'Edit Artworks' })
    expect(button).toBeDisabled()
  })

  it('renders an enabled edit button if there are selected artworks', () => {
    Object.assign(props, { artworksCount: 100, selectedArtworksCount: 1 })
    render(<SearchForm {...props} />)
    const button = screen.getByRole('button', { name: 'Edit Artworks' })
    expect(button).not.toBeDisabled()
  })
})

describe('Links to copy ids/open artworks in Helix', () => {
  it('does NOT render if there are NO selected artworks', () => {
    Object.assign(props, {
      artworksCount: 100,
      selectedArtworksCount: 0,
      selectedArtworkIds: [],
    })
    render(<SearchForm {...props} />)
    expect(screen.queryByText(/Open in Helix/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Copy IDs/i)).not.toBeInTheDocument()
  })

  it('renders if there are selected artworks', () => {
    Object.assign(props, {
      artworksCount: 100,
      selectedArtworksCount: 1,
      selectedArtworkIds: ['foo'],
    })
    render(<SearchForm {...props} />)
    expect(screen.getByText(/Open in Helix/i)).toBeInTheDocument()
    expect(screen.getByText(/Copy IDs/i)).toBeInTheDocument()
  })
})
