import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { mount } from 'enzyme'
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
    tags: [],
  }
})

it('renders nothing if there are no selected criteria', () => {
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected keywords', () => {
  props.keywords = ['soup', 'can']
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected genes', () => {
  props.genes = [{ id: 'foo', name: 'Foo' }, { id: 'bar', name: 'Bar' }]
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected tags', () => {
  props.tags = [{ id: 'foo', name: 'Foo' }, { id: 'bar', name: 'Bar' }]
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected artists', () => {
  props.artists = [
    { id: 'abc123', name: 'Alice', slug: 'alice' },
    { id: 'def456', name: 'Bob', slug: 'bob' },
  ]
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected partner', () => {
  props.partner = { id: 'foo', name: 'Gallery Foo' }
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected fair', () => {
  props.fair = { id: 'foo', name: 'FooFair' }
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected attribution class', () => {
  props.attributionClass = { id: 'foo', name: 'Foo Edition' }
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the created after date', () => {
  props.createdAfterDate = moment('2020-01-01T12:00:00-00:00')
    .utc()
    .format()
  const currentCriteria = mount(<CurrentCriteria {...props} />)

  const selectedCreatedAfterDate = currentCriteria.find(
    'SelectedCreatedAfterDate'
  )

  expect(selectedCreatedAfterDate.length).toEqual(1)
})

it('renders minPrice', () => {
  props.minPrice = 1000
  let currentCriteria = mount(<CurrentCriteria {...props} />)
  expect(currentCriteria.exists('.currentMinPrice')).toEqual(true)
  expect(currentCriteria.exists('.currentMaxPrice')).toEqual(false)
})

it('renders maxPrice', () => {
  props.maxPrice = 1000
  let currentCriteria = mount(<CurrentCriteria {...props} />)
  expect(currentCriteria.exists('.currentMinPrice')).toEqual(false)
  expect(currentCriteria.exists('.currentMaxPrice')).toEqual(true)
})

it('renders both price bounds', () => {
  props.minPrice = 1000
  props.maxPrice = 2000
  let currentCriteria = mount(<CurrentCriteria {...props} />)
  expect(currentCriteria.exists('.currentMinPrice')).toEqual(true)
  expect(currentCriteria.exists('.currentMaxPrice')).toEqual(true)
})
