import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import BatchUpdateForm from './BatchUpdateForm'
import GeneInput from './GeneInput'

let props, dismissHandler

beforeEach(() => {
  dismissHandler = jest.fn()
  props = {
    onCancel: dismissHandler,
    selectedArtworkIds: ['one', 'two', 'three']
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<BatchUpdateForm {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('can be dismissed via the "cancel" link', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  const mockClickEvent = { preventDefault: jest.fn() }
  wrapper.find('a.cancel').simulate('click', mockClickEvent)
  expect(dismissHandler.mock.calls.length).toEqual(1)
})

it('renders the current gene names/values', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  const component = wrapper.instance()
  component.setState({
    geneValues: {
      'Kawaii': 70,
      'Animals': 100
    }
  })
  const geneInputs = wrapper.find(GeneInput)
  expect(geneInputs.length).toEqual(2)
  const text = wrapper.text()
  expect(text).toMatch('Kawaii: 70')
  expect(text).toMatch('Animals: 100')
})

it('can submit the batch update via the "queue" button')
