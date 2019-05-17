import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import PriceInput from './PriceInput'
import { mount } from 'enzyme'

describe('PriceInput', () => {
  let component
  let updateState
  let wrapper
  let tree
  let minPriceInput
  let maxPriceInput
  const init = (options = {}) => {
    let { minPrice, maxPrice } = options
    updateState = jest.fn()
    component = (
      <PriceInput
        updateState={updateState}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    )
    wrapper = mount(component)
    minPriceInput = wrapper.find('.minPriceInput input')
    maxPriceInput = wrapper.find('.maxPriceInput input')
    tree = renderer.create(component).toJSON()
  }
  it('renders correctly', () => {
    init()
    expect(tree).toMatchSnapshot()
  })
  it('correctly sets the min price', () => {
    init()
    minPriceInput.simulate('keyUp', { key: 'Enter', target: { value: '123' } })
    expect(updateState).toHaveBeenCalledWith('minPrice', 123)
  })
  it('correctly sets the max price', () => {
    init()
    maxPriceInput.simulate('keyUp', { key: 'Enter', target: { value: '123' } })
    expect(updateState).toHaveBeenCalledWith('maxPrice', 123)
  })
  it('ignores attempts to set a non-numeric value', () => {
    init()
    minPriceInput.simulate('keyUp', { key: 'Enter', target: { value: 'abc' } })
    maxPriceInput.simulate('keyUp', { key: 'Enter', target: { value: 'xyz' } })
    expect(updateState).not.toHaveBeenCalled()
  })
  it('both inputs exist by default', () => {
    init()
    expect(wrapper.exists('.minPriceInput')).toBe(true)
    expect(wrapper.exists('.maxPriceInput')).toBe(true)
  })
  it('does not display minPriceInput if minPrice is already set', () => {
    init({ minPrice: 1000 })
    expect(wrapper.exists('.minPriceInput')).toBeFalsy()
  })
  it('does not display maxPriceInput if maxPrice is already set', () => {
    init({ maxPrice: 1000 })
    expect(wrapper.exists('.maxPriceInput')).toBeFalsy()
  })
  it('does not display anything if both values are set', () => {
    init({ minPrice: 500, maxPrice: 1000 })
    expect(wrapper.exists('.minPriceInput')).toBeFalsy()
    expect(wrapper.exists('.maxPriceInput')).toBeFalsy()
  })
})
