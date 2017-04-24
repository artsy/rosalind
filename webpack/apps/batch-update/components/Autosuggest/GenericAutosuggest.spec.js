import React from 'react'
import renderer from 'react-test-renderer'
import { mount, render } from 'enzyme'
import GenericAutosuggest from './GenericAutosuggest'

let props

beforeEach(() => {
  const mockSuggestionsFetcher = jest.fn((searchTerm) => {
    return new Promise((resolve, reject) => {
      resolve([ /* listOfMatchingSuggestionObjects */ ])
    })
  })

  props = {
    placeholder: 'start typing',
    fetchSuggestions: mockSuggestionsFetcher, // searchTerm => listOfMatchingSuggestionObjects
    getSuggestionValue: jest.fn(), // suggestionObject => displayName
    renderSuggestion: jest.fn(),   // suggestionObject => stringOrMarkupForSuggestionList
    selectSuggestion: jest.fn()    // suggestionObject => { handlerFunction(suggestionObject) }
  }
})

it('renders correctly', () => {
  const tree = renderer.create(<GenericAutosuggest {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('includes a placeholder text', () => {
  const expected = 'start typing'
  const wrapper = render(<GenericAutosuggest {...props} />)
  const actual = wrapper.find('input').attr('placeholder')
  expect(actual).toEqual(expected)
})

it('invokes the supplied fetch function when the user types something', () => {
  const expectedCallCount = 1
  const wrapper = mount(<GenericAutosuggest {...props} />)
  wrapper.find('input').simulate('change', { target: { value: 'Kaw' } })
  const actualCallCount = props.fetchSuggestions.mock.calls.length
  expect(actualCallCount).toEqual(expectedCallCount)
})
