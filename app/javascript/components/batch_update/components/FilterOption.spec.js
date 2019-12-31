import React from 'react'
import 'jest-styled-components'
import { mount } from 'enzyme'
import FilterOption from './FilterOption'

describe('FilterOption', () => {
  let wrapper

  const props = {
    name: 'edible', // some predicate about artworks
    current: 'SHOW_ALL',
    updateState: jest.fn(),
  }

  beforeEach(() => {
    wrapper = mount(<FilterOption {...props} />)
  })

  describe('display name', () => {
    it('generates a display name from the provided `name` prop', () => {
      expect(wrapper.text()).toMatch('Edible?')
    })
  })

  describe('filter links', () => {
    it('generates 3 links', () => {
      expect(wrapper.find('Option').find('a')).toHaveLength(3)
    })

    it('generates a link to show all works, ignoring the predicate', () => {
      const option = wrapper.find('Option').at(0)
      expect(option.text()).toMatch('All')
      expect(option.prop('option')).toMatch('SHOW_ALL')
    })

    it('generates a link to show only works where the predicate is true', () => {
      const option = wrapper.find('Option').at(1)
      expect(option.text()).toMatch('True')
      expect(option.prop('option')).toMatch('SHOW_EDIBLE')
    })

    it('generates a link to show only works where the predicate is false', () => {
      const option = wrapper.find('Option').at(2)
      expect(option.text()).toMatch('False')
      expect(option.prop('option')).toMatch('SHOW_NOT_EDIBLE')
    })

    it('highlights the filter link with the currently active value', () => {
      const showAllOption = wrapper.find('[option="SHOW_ALL"]').find('a')
      expect(showAllOption.hasClass('active')).toBe(true)
    })
  })

  describe('state updates', () => {
    it('calls a state updater fn when a filter link is clicked', () => {
      wrapper.find('a').forEach(link => link.simulate('click'))
      expect(props.updateState).toHaveBeenCalledTimes(3)
    })
  })

  describe('with multi-word `name` prop', () => {
    it('generates readable display name and values', () => {
      props.name = 'acquireableOrOfferable'
      wrapper = mount(<FilterOption {...props} />)

      expect(wrapper.text()).toMatch(/Acquireable Or Offerable\?/)

      expect(
        wrapper
          .find('Option')
          .at(1)
          .prop('option')
      ).toMatch('SHOW_ACQUIREABLE_OR_OFFERABLE')

      expect(
        wrapper
          .find('Option')
          .at(2)
          .prop('option')
      ).toMatch('SHOW_NOT_ACQUIREABLE_OR_OFFERABLE')
    })
  })
})
