import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import BatchUpdateForm from './BatchUpdateForm'
import GeneInput from './GeneInput'
import { GeneAutosuggest } from './Autosuggest'
import ConfirmationModal from './ConfirmationModal'
import * as rosalindApi from 'lib/rosalind-api'

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

describe('when the "Cancel" link is clicked', () => {
  it('calls the correct handler', () => {
    const wrapper = mount(<BatchUpdateForm {...props} />)
    const mockClickEvent = { preventDefault: jest.fn() }
    wrapper.find('a.cancel').simulate('click', mockClickEvent)
    expect(dismissHandler.mock.calls.length).toEqual(1)
  })

  it('resets the form state', () => {
    const wrapper = mount(<BatchUpdateForm {...props} />)
    wrapper.setState({
      geneValues: {
        'Kawaii': 70
      }
    })
    const mockClickEvent = { preventDefault: jest.fn() }
    wrapper.find('a.cancel').simulate('click', mockClickEvent)
    expect(wrapper.state('geneValues')).toEqual({})
  })
})

describe('when the "Queue" button is clicked', () => {
  it('it opens a confirmation modal', () => {
    const wrapper = mount(<BatchUpdateForm {...props} />)
    const mockClickEvent = { preventDefault: jest.fn() }
    wrapper.find('a.queue').simulate('click', mockClickEvent)
    expect(wrapper.find(ConfirmationModal).hasClass('modal-open')).toBe(true)
  })
})

describe('when the confirmation modal is accepted', () => {
  beforeAll(() => {
    // https://github.com/facebook/jest/issues/2297
    Object.defineProperty(document, 'querySelector', {
      value: () => { return { content: 'very secret csrf token' } },
    });
  })

  beforeEach(() => {
    rosalindApi.submitBatchUpdate = jest.fn()

    const wrapper = mount(
      <BatchUpdateForm {...props} />
    )
    wrapper.setState({
      geneValues: {
        'Awesome': 100
      }
    })

    const mockClickEvent = { preventDefault: jest.fn() }
    wrapper.find('a.queue').simulate('click', mockClickEvent)
    wrapper.find(ConfirmationModal).find('a.accept').simulate('click', mockClickEvent)
  })

  it('submits the form', () => {
    expect(rosalindApi.submitBatchUpdate.mock.calls.length).toEqual(1)
  })

  it('sends the genes and artworks', () => {
    expect(rosalindApi.submitBatchUpdate.mock.calls[0][0]).toEqual(props.selectedArtworkIds)
    expect(rosalindApi.submitBatchUpdate.mock.calls[0][1]).toEqual({'Awesome': 100})
  })

  it('includes the forgery token from the html document', () => {
    expect(rosalindApi.submitBatchUpdate.mock.calls[0][2]).toEqual('very secret csrf token')
  })
})

it('adds genes', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  const component = wrapper.instance()
  component.onAddGene({ id: 'kawaii', name: 'Kawaii' })
  expect(component.state).toMatchObject({
    geneValues: {
      'Kawaii': null
    }
  })
})

describe('with currently added genes', () => {
  let wrapper, component

  beforeEach(() => {
    wrapper = mount(<BatchUpdateForm {...props} />)
    component = wrapper.instance()
    component.setState({
      geneValues: {
        'Kawaii': 0,
        'Animals': 100
      }
    })
  })

  it('renders the current genes', () => {
    expect(wrapper.find(GeneInput).length).toEqual(2)
    expect(wrapper.text()).toMatch('Kawaii')
    expect(wrapper.text()).toMatch('Animals')
  })

  it('updates gene values from integers', () => {
    component.onChangeGeneValue({ name: 'Kawaii', value: 70 })
    expect(component.state['geneValues']).toMatchObject({
      'Kawaii': 70
    })
  })

  it('updates gene values from number-ish strings', () => {
    component.onChangeGeneValue({ name: 'Kawaii', value: '70' })
    expect(component.state['geneValues']).toMatchObject({
      'Kawaii': 70
    })
  })

  it('nulls gene values from empty strings', () => {
    component.onChangeGeneValue({ name: 'Kawaii', value: '' })
    expect(component.state['geneValues']).toMatchObject({
      'Kawaii': null
    })
  })
})

it('includes a gene autocomplete widget', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  expect(wrapper.find(GeneAutosuggest).length).toEqual(1)
})
