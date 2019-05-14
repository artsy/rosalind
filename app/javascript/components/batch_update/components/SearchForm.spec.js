import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { mount } from 'enzyme'
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
    genes: [],
    genomedFilter: 'SHOW_ALL',
    keywords: [],
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
    selectedArtworkIds: [],
    selectedArtworksCount: 0,
    tags: [],
    updateStateFor: jest.fn(),
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SearchForm {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('does not render partner autosuggest if partner is already selected', () => {
  const partner = { id: 'nice-gallery', name: 'Nice Gallery' }
  Object.assign(props, { partner })
  const rendered = renderer.create(<SearchForm {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('does not render fair autosuggest if fair is already selected', () => {
  const fair = { id: 'nice-fair', name: 'Nice Fair' }
  Object.assign(props, { fair })
  const rendered = renderer.create(<SearchForm {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('does not render attribution class autosuggest if it is already selected', () => {
  const attributionClass = { id: 'ephemera', name: 'Ephemera' }
  Object.assign(props, { attributionClass })
  const rendered = renderer.create(<SearchForm {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
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

describe('"edit artworks" button', () => {
  it('does not render an edit button if there are no artworks', () => {
    Object.assign(props, { artworksCount: 0 })
    const rendered = renderer.create(<SearchForm {...props} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a disabled edit button if there are artworks, but none selected', () => {
    Object.assign(props, { artworksCount: 100, selectedArtworksCount: 0 })
    const rendered = renderer.create(<SearchForm {...props} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an enabled edit button if there are selected artworks', () => {
    Object.assign(props, { artworksCount: 100, selectedArtworksCount: 1 })
    const rendered = renderer.create(<SearchForm {...props} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Link to open artworks in Helix', () => {
  it('does NOT render if there are NO selected artworks', () => {
    Object.assign(props, {
      artworksCount: 100,
      selectedArtworksCount: 0,
      selectedArtworkIds: [],
    })
    const wrapper = mount(<SearchForm {...props} />)
    expect(wrapper.text()).not.toMatch(/open.*in Helix/i)
    expect(wrapper.find('a[href*="helix"]')).toHaveLength(0)
  })

  it('renders if there are selected artworks', () => {
    Object.assign(props, {
      artworksCount: 100,
      selectedArtworksCount: 1,
      selectedArtworkIds: ['foo'],
    })
    const wrapper = mount(<SearchForm {...props} />)
    expect(wrapper.text()).toMatch(/open.*in Helix/i)
    expect(wrapper.find('a[href*="helix"]')).toHaveLength(1)
  })
})
