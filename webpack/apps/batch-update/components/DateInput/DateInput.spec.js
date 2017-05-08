import React from 'react'
import renderer from 'react-test-renderer'
import moment from 'moment'
import DateInput from './DateInput'
import { shallow, mount } from 'enzyme'

describe('DateInput', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<DateInput />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('displays a date string in the anchor element', () => {
    const date = new Date().toString()
    const dateInput = shallow(<DateInput />)
    const formattedDate = moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a')

    dateInput.instance().setState({ suggestion: date })

    expect(dateInput.find('a').text()).toEqual(formattedDate)
  })

  it('sets state.suggestion when input.onChange fires', () => {
    const dateInput = shallow(<DateInput />)

    dateInput.find('input').simulate('change', { target: { value: 'today' } })
    expect(dateInput.state().suggestion.length > 0).toBe(true)
  })

  it('calls handleClick when the user enters a date and presses the Enter key', () => {
    const dateInput = shallow(<DateInput />)
    dateInput.instance().handleClick = jest.fn()

    dateInput.find('input').simulate('change', { target: { value: 'today' } })
    dateInput.find('input').simulate('keypress', { charCode: 13 })

    expect(dateInput.instance().handleClick.mock.calls.length).toBe(1)
  })

  it('onClick calls props.onSelectDate', () => {
    const mockOnSelectDate = jest.fn()
    const dateInput = mount(<DateInput onSelectDate={mockOnSelectDate} />)

    dateInput.find('input').simulate('change', { target: { value: 'today' } })
    dateInput.find('a').simulate('click')

    expect(mockOnSelectDate.mock.calls.length).toBe(1)
  })
})
