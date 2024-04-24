import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { mount } from 'enzyme'
import moment from 'moment'
import SearchForm from './SearchForm'
import { Button } from '@artsy/palette'
import {
  AttributionClassAutosuggest,
  FairAutosuggest,
  PartnerAutosuggest,
} from './Autosuggest'

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
  const partner = { id: 'nice-gallery', name: 'Nice Gallery' }
  Object.assign(props, { partner })
  const rendered = renderer.create(<SearchForm {...props} />)
  expect(rendered.root.findAllByType(PartnerAutosuggest)).toHaveLength(0)
})

it('does not render fair autosuggest if fair is already selected', () => {
  const fair = { id: 'nice-fair', name: 'Nice Fair' }
  Object.assign(props, { fair })
  const rendered = renderer.create(<SearchForm {...props} />)
  expect(rendered.root.findAllByType(FairAutosuggest)).toHaveLength(0)
})

it('does not render attribution class autosuggest if it is already selected', () => {
  const attributionClass = { id: 'ephemera', name: 'Ephemera' }
  Object.assign(props, { attributionClass })
  const rendered = renderer.create(<SearchForm {...props} />)
  expect(rendered.root.findAllByType(AttributionClassAutosuggest)).toHaveLength(
    0
  )
})

it('does not render createdAfterDate input if createdAfterDate is already entered', () => {
  const createdAfterDate = moment('2020-01-01T12:00:00-00:00')
    .utc()
    .format()
  Object.assign(props, { createdAfterDate })

  const searchForm = mount(<SearchForm {...props} />)
  const currentCreatedAfterDate = searchForm.find('SelectedCreatedAfterDate')
  const createdAfterDateInput = searchForm.find('CreatedAfterDateInput')

  expect(currentCreatedAfterDate.length).toEqual(1)
  expect(createdAfterDateInput.length).toEqual(0)
})

it('does not render createdBeforeDate input if createdBeforeDate is already entered', () => {
  const createdBeforeDate = moment('2020-01-01T12:00:00-00:00')
    .utc()
    .format()
  Object.assign(props, { createdBeforeDate })

  const searchForm = mount(<SearchForm {...props} />)
  const currentCreatedBeforeDate = searchForm.find('SelectedCreatedBeforeDate')
  const createdBeforeDateInput = searchForm.find('CreatedBeforeDateInput')

  expect(currentCreatedBeforeDate.length).toEqual(1)
  expect(createdBeforeDateInput.length).toEqual(0)
})

it('does not render minPrice input if minPrice is already set', () => {
  Object.assign(props, { minPrice: 1000 })
  const searchForm = mount(<SearchForm {...props} />)
  const minPriceExists = searchForm.exists('.minPriceInput')
  const maxPriceExists = searchForm.exists('.maxPriceInput')

  expect(minPriceExists).toEqual(false)
  expect(maxPriceExists).toEqual(true)
})

it('does not render maxPrice input if maxPrice is already set', () => {
  Object.assign(props, { maxPrice: 1000 })
  const searchForm = mount(<SearchForm {...props} />)
  const minPriceExists = searchForm.exists('.minPriceInput')
  const maxPriceExists = searchForm.exists('.maxPriceInput')

  expect(minPriceExists).toEqual(true)
  expect(maxPriceExists).toEqual(false)
})

describe('"edit artworks" button', () => {
  it('does not render an edit button if there are no artworks', () => {
    Object.assign(props, { artworksCount: 0 })
    const rendered = renderer.create(<SearchForm {...props} />)
    const editButton = rendered.root
      .findAllByType(Button)
      .find(b => b.props.children === 'Edit Artworks')
    expect(editButton).not.toBeDefined()
  })

  it('renders a disabled edit button if there are artworks, but none selected', () => {
    Object.assign(props, { artworksCount: 100, selectedArtworksCount: 0 })
    const rendered = renderer.create(<SearchForm {...props} />)
    const editButton = rendered.root
      .findAllByType(Button)
      .find(b => b.props.children === 'Edit Artworks')
    expect(editButton.props.disabled).toEqual(true)
  })

  it('renders an enabled edit button if there are selected artworks', () => {
    Object.assign(props, { artworksCount: 100, selectedArtworksCount: 1 })
    const rendered = renderer.create(<SearchForm {...props} />)
    const editButton = rendered.root
      .findAllByType(Button)
      .find(b => b.props.children === 'Edit Artworks')
    expect(editButton.props).not.toContain('disabled')
    expect(true).toBe(true)
  })
})

describe('Links to copy ids/open artworks in Helix', () => {
  it('does NOT render if there are NO selected artworks', () => {
    Object.assign(props, {
      artworksCount: 100,
      selectedArtworksCount: 0,
      selectedArtworkIds: [],
    })
    const wrapper = mount(<SearchForm {...props} />)
    expect(wrapper.text()).not.toMatch(/Open in Helix/i)
    expect(wrapper.text()).not.toMatch(/Copy IDs/i)
  })

  it('renders if there are selected artworks', () => {
    Object.assign(props, {
      artworksCount: 100,
      selectedArtworksCount: 1,
      selectedArtworkIds: ['foo'],
    })
    const wrapper = mount(<SearchForm {...props} />)
    expect(wrapper.text()).toMatch(/Open in Helix/i)
    expect(wrapper.text()).toMatch(/Copy IDs/i)
  })
})
