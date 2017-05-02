import React from 'react'
import renderer from 'react-test-renderer'
import SearchForm from './SearchForm'

let props

Date.now = jest.fn(() => new Date(Date.UTC(1, 0, 0, 0, 0, 0)))

beforeEach(() => {
  props = {
    genes: [],
    tags: [],
    partner: null,
    fair: null,
    artworksCount: 0,
    selectedArtworksCount: 0,
    onRemoveGene: jest.fn(),
    onAddGene: jest.fn(),
    onRemoveTag: jest.fn(),
    onAddTag: jest.fn(),
    onSetPartner: jest.fn(),
    onClearPartner: jest.fn(),
    onSetFair: jest.fn(),
    onClearFair: jest.fn(),
    publishedFilter: 'SHOW_ALL',
    onSetPublishedFilter: jest.fn(),
    deletedFilter: 'SHOW_ALL',
    onSetDeletedFilter: jest.fn(),
    genomedFilter: 'SHOW_ALL',
    onSetGenomedFilter: jest.fn()
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
