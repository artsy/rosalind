import React from 'react'
import renderer from 'react-test-renderer'
import moment from 'moment'
import CurrentCriteria from './CurrentCriteria'

let props

beforeEach(() => {
  props = {
    createdAfterDate: null,
    fair: null,
    genes: [],
    onClearFair: jest.fn(),
    onClearPartner: jest.fn(),
    onRemoveGene: jest.fn(),
    onRemoveTag: jest.fn(),
    partner: null,
    tags: []
  }
})

it('renders nothing if there are no selected criteria', () => {
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected genes', () => {
  props.genes = [
    {id: 'foo', name: 'Foo'},
    {id: 'bar', name: 'Bar'}
  ]
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected tags', () => {
  props.tags = [
    {id: 'foo', name: 'Foo'},
    {id: 'bar', name: 'Bar'}
  ]
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected partner', () => {
  props.partner = {id: 'foo', name: 'Gallery Foo'}
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the selected fair', () => {
  props.fair = {id: 'foo', name: 'FooFair'}
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the created after date', () => {
  props.createdAfterDate = moment('2020-01-01T12:00:00-00:00').utc()
  const rendered = renderer.create(<CurrentCriteria {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})
