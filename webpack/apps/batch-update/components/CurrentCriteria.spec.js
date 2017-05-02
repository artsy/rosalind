import React from 'react'
import renderer from 'react-test-renderer'
import CurrentCriteria from './CurrentCriteria'

let props

Date.now = jest.fn(() => new Date(Date.UTC(1, 0, 0, 0, 0, 0)))

beforeEach(() => {
  props = {
    genes: [],
    tags: [],
    partner: null,
    fair: null,
    onRemoveGene: jest.fn(),
    onRemoveTag: jest.fn(),
    onClearPartner: jest.fn(),
    onClearFair: jest.fn()
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
