import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { mount } from 'enzyme'
import BatchUpdateForm from './BatchUpdateForm'
import GeneInput from './GeneInput'
import { GeneAutosuggest } from './Autosuggest'
import { SelectedTag } from './Selected'
import ConfirmationModal from './ConfirmationModal'
import * as rosalindApi from 'lib/rosalind-api'

let props, dismissHandler, defaultCommonGenes, defaultCommonTags

beforeEach(() => {
  dismissHandler = jest.fn()
  defaultCommonGenes = ['Art', 'Painting']
  defaultCommonTags = ['foo', 'bar']
  props = {
    onCancel: dismissHandler,
    selectedArtworkIds: ['one', 'two', 'three'],
    getCommonGenes: jest.fn().mockReturnValueOnce(defaultCommonGenes),
    getCommonTags: jest.fn().mockReturnValueOnce(defaultCommonTags),
    onAddNotice: jest.fn(),
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<BatchUpdateForm {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders the common genes for each new artwork selection', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  expect(wrapper.state().geneValues).toEqual({})
  wrapper.setProps({
    selectedArtworkIds: ['one', 'two', 'three', 'four'],
  }) // triggers componentWillReceiveProps()
  expect(wrapper.state().geneValues).toMatchObject({
    Art: null,
    Painting: null,
  })
  expect(wrapper.find(GeneInput).length).toEqual(2)
})

it('renders the common tags for each new artwork selection', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  expect(wrapper.state().existingTags).toEqual([])
  wrapper.setProps({
    selectedArtworkIds: ['one', 'two', 'three', 'four'],
  }) // triggers componentWillReceiveProps()
  expect(wrapper.state().existingTags).toEqual(['foo', 'bar'])
  expect(wrapper.find(SelectedTag).length).toEqual(2)
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
        Kawaii: 70,
      },
      existingTags: ['mewtwo'],
      tagsToAdd: ['pikachu'],
      tagsToRemove: ['bulbasaur'],
    })
    const mockClickEvent = { preventDefault: jest.fn() }
    wrapper.find('a.cancel').simulate('click', mockClickEvent)
    expect(wrapper.state('geneValues')).toEqual({
      Art: null,
      Painting: null,
    })
    expect(wrapper.state('existingTags')).toEqual(defaultCommonTags)
    expect(wrapper.state('tagsToAdd')).toEqual([])
    expect(wrapper.state('tagsToRemove')).toEqual([])
  })
})

it('adds genes', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  const component = wrapper.instance()
  component.onAddGene({ id: 'kawaii', name: 'Kawaii' })
  expect(component.state).toMatchObject({
    geneValues: {
      Kawaii: null,
    },
  })
})

it('adds a tag', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  const component = wrapper.instance()
  component.onAddTag({ name: 'foobar' })
  expect(wrapper.state('tagsToAdd')).toEqual(['foobar'])
})

it('cancels adding a tag', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  const component = wrapper.instance()
  component.onAddTag({ name: 'foobar' })
  component.onCancelAddTag('+foobar')
  expect(wrapper.state('tagsToAdd')).toEqual([])
})

it('removes an existing tag', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  const component = wrapper.instance()
  component.onRemoveExistingTag('foo')
  expect(wrapper.state('tagsToRemove')).toEqual(['foo'])
})

it('cancels removing an existing tag', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  const component = wrapper.instance()
  component.onRemoveExistingTag('foo')
  component.onCancelRemoveTag('-foo')
  expect(wrapper.state('tagsToRemove')).toEqual([])
})

describe('with no currently added genes or tag changes', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<BatchUpdateForm {...props} />)
    wrapper.setState({
      geneValues: {},
      tagsToAdd: [],
      tagsToRemove: [],
    })
  })

  it('disables the "Queue" button', () => {
    expect(wrapper.find('Button.queue button').prop('disabled')).toEqual(true)
  })
})

describe('with only null genes', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<BatchUpdateForm {...props} />)
    wrapper.setState({
      geneValues: {
        Kawaii: null,
      },
    })
  })

  it('disables the "Queue" button', () => {
    expect(wrapper.find('Button.queue button').prop('disabled')).toEqual(true)
  })
})

describe('with pending changes', () => {
  let wrapper, component

  beforeEach(() => {
    wrapper = mount(<BatchUpdateForm {...props} />)
    component = wrapper.instance()
  })

  const renderState = state => {
    component.setState(state)
    wrapper.update()
  }

  describe('to genes', () => {
    beforeEach(() => {
      renderState({
        geneValues: {
          Kawaii: 0,
          Animals: 100,
        },
      })
    })

    it('enables the "Queue" button', () => {
      expect(wrapper.find('Button.queue button').prop('disabled')).toEqual(
        false
      )
    })

    it('renders the current genes', () => {
      expect(wrapper.find(GeneInput).length).toEqual(2)
      expect(wrapper.text()).toMatch('Kawaii')
      expect(wrapper.text()).toMatch('Animals')
    })

    it('updates gene values from integers', () => {
      component.onChangeGeneValue({ name: 'Kawaii', value: 70 })
      expect(component.state['geneValues']).toMatchObject({
        Kawaii: 70,
      })
    })

    it('updates gene values from number-ish strings', () => {
      component.onChangeGeneValue({ name: 'Kawaii', value: '70' })
      expect(component.state['geneValues']).toMatchObject({
        Kawaii: 70,
      })
    })

    it('nulls gene values from empty strings', () => {
      component.onChangeGeneValue({ name: 'Kawaii', value: '' })
      expect(component.state['geneValues']).toMatchObject({
        Kawaii: null,
      })
    })
  })

  describe('to tags', () => {
    beforeEach(() => {
      renderState({
        existingTags: defaultCommonTags,
        tagsToAdd: ['bang'],
      })
    })

    it('enables the "Queue" button', () => {
      expect(wrapper.find('Button.queue button').prop('disabled')).toEqual(
        false
      )
    })

    it('renders the tag state', () => {
      expect(wrapper.find(SelectedTag).length).toEqual(3)

      expect(wrapper.text()).toMatch('foo')
      expect(wrapper.text()).not.toMatch('-foo')
      expect(wrapper.text()).not.toMatch('+foo')

      expect(wrapper.text()).toMatch('bar')
      expect(wrapper.text()).not.toMatch('-bar')
      expect(wrapper.text()).not.toMatch('+bar')

      expect(wrapper.text()).toMatch('+bang')
    })

    it('renders pending tag removals with a prefixed minus sign', () => {
      component.onRemoveExistingTag('foo')
      expect(wrapper.text()).toMatch('-foo')
    })

    it('renders pending tag additions with a prefixed plus sign', () => {
      component.onAddTag({ name: 'boop' })
      expect(wrapper.text()).toMatch('+boop')
    })
  })

  describe('when the "Queue" button is clicked', () => {
    beforeEach(() => {
      renderState({
        geneValues: {
          Kawaii: 0,
          Animals: 100,
        },
        existingTags: defaultCommonTags,
        tagsToAdd: ['bang'],
        tagsToRemove: ['foo'],
      })
    })
    it('opens a confirmation modal', () => {
      const mockClickEvent = { preventDefault: jest.fn() }
      wrapper.find('Button.queue button').simulate('click', mockClickEvent)
      expect(
        wrapper
          .find(ConfirmationModal)
          .render()
          .hasClass('modal-open')
      ).toBe(true)
    })

    describe('when the confirmation modal is accepted', () => {
      beforeAll(() => {
        // We assume the existence of a <meta> tag containing the
        // Rails-generated CSRF token. This is how we mock access to
        // that tag.
        // https://github.com/facebook/jest/issues/2297
        Object.defineProperty(document, 'querySelector', {
          value: () => {
            return { content: 'very secret csrf token' }
          },
        })
      })

      beforeEach(() => {
        // mock the function that submits the request to the backend and returns
        // window.fetch's promise, to be handled by the client
        rosalindApi.submitBatchUpdate = jest.fn((artworks, genes, token) => {
          return new Promise((resolve, reject) => {
            resolve({ ok: true })
          })
        })

        // suppress log output in test run output
        console.log = jest.fn()
        console.error = jest.fn()

        const mockClickEvent = { preventDefault: jest.fn() }
        wrapper.find('Button.queue button').simulate('click', mockClickEvent)
        wrapper
          .find(ConfirmationModal)
          .find('Button.accept button')
          .simulate('click', mockClickEvent)
      })

      it('submits the form', () => {
        expect(rosalindApi.submitBatchUpdate.mock.calls.length).toEqual(1)
      })

      it('sends the genes, tags and artworks', () => {
        expect(rosalindApi.submitBatchUpdate.mock.calls[0][0]).toEqual(
          props.selectedArtworkIds
        )
        expect(rosalindApi.submitBatchUpdate.mock.calls[0][1]).toEqual({
          genes: {
            Animals: 100,
            Kawaii: 0,
          },
          tags: {
            toAdd: ['bang'],
            toRemove: ['foo'],
          },
        })
      })

      it('includes the forgery token from the html document', () => {
        expect(rosalindApi.submitBatchUpdate.mock.calls[0][2]).toEqual(
          'very secret csrf token'
        )
      })
    })
  })
})

it('includes a gene autocomplete widget', () => {
  const wrapper = mount(<BatchUpdateForm {...props} />)
  expect(wrapper.find(GeneAutosuggest).length).toEqual(1)
})
