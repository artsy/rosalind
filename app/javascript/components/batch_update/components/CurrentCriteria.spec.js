import React from 'react'
import { render, screen } from '@testing-library/react'
import 'jest-styled-components'
import moment from 'moment'
import CurrentCriteria from './CurrentCriteria'

let props

beforeEach(() => {
  props = {
    artists: [],
    createdAfterDate: null,
    createdBeforeDate: null,
    fair: null,
    genes: [],
    keywords: [],
    minPrice: null,
    maxPrice: null,
    onClearFair: jest.fn(),
    onClearPartner: jest.fn(),
    onRemoveGene: jest.fn(),
    onRemoveTag: jest.fn(),
    partner: null,
    restrictedArtworkIDs: [],
    tags: [],
  }
})

it('renders nothing if there are no selected criteria', () => {
  const { asFragment } = render(<CurrentCriteria {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders the selected keywords', () => {
  props.keywords = ['soup', 'can']
  const { asFragment } = render(<CurrentCriteria {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders the selected genes', () => {
  props.genes = [
    { id: 'foo', name: 'Foo' },
    { id: 'bar', name: 'Bar' },
  ]
  const { asFragment } = render(<CurrentCriteria {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders the selected tags', () => {
  props.tags = [
    { id: 'foo', name: 'Foo' },
    { id: 'bar', name: 'Bar' },
  ]
  const { asFragment } = render(<CurrentCriteria {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders the selected artists', () => {
  props.artists = [
    { id: 'abc123', name: 'Alice', slug: 'alice' },
    { id: 'def456', name: 'Bob', slug: 'bob' },
  ]
  const { asFragment } = render(<CurrentCriteria {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders the selected partner', () => {
  props.partner = { id: 'foo', name: 'Gallery Foo' }
  const { asFragment } = render(<CurrentCriteria {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders the selected fair', () => {
  props.fair = { id: 'foo', name: 'FooFair' }
  const { asFragment } = render(<CurrentCriteria {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders the selected sale', () => {
  props.sale = { id: 'foo', name: 'Phillips' }
  const { asFragment } = render(<CurrentCriteria {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders the selected attribution class', () => {
  props.attributionClass = { id: 'foo', name: 'Foo Edition' }
  const { asFragment } = render(<CurrentCriteria {...props} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders the created after date', () => {
  props.createdAfterDate = moment('2020-01-01T12:00:00-00:00')
    .utc()
    .format()
  render(<CurrentCriteria {...props} />)
  expect(screen.getByText(/2020/)).toBeInTheDocument()
})

it('renders minPrice', () => {
  props.minPrice = 1000
  const { container } = render(<CurrentCriteria {...props} />)
  expect(container.querySelector('.currentMinPrice')).not.toBeNull()
  expect(container.querySelector('.currentMaxPrice')).toBeNull()
})

it('renders maxPrice', () => {
  props.maxPrice = 1000
  const { container } = render(<CurrentCriteria {...props} />)
  expect(container.querySelector('.currentMinPrice')).toBeNull()
  expect(container.querySelector('.currentMaxPrice')).not.toBeNull()
})

it('renders both price bounds', () => {
  props.minPrice = 1000
  props.maxPrice = 2000
  const { container } = render(<CurrentCriteria {...props} />)
  expect(container.querySelector('.currentMinPrice')).not.toBeNull()
  expect(container.querySelector('.currentMaxPrice')).not.toBeNull()
})
