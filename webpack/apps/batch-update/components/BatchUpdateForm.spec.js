import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import BatchUpdateForm from './BatchUpdateForm'
import GeneInput from './GeneInput'
import { GeneAutosuggest } from './Autosuggest'

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

it('renders the current genes', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  const component = wrapper.instance()
  component.onAddGene({ id: 'kawaii', name: 'Kawaii' })
  component.onAddGene({ id: 'animals', name: 'Animals' })
  expect(wrapper.find(GeneInput).length).toEqual(2)
  expect(wrapper.text()).toMatch('Kawaii')
  expect(wrapper.text()).toMatch('Animals')
})

it('includes a gene autocomplete widget', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  expect(wrapper.find(GeneAutosuggest).length).toEqual(1)
})

it('can submit the batch update via the "queue" button')
