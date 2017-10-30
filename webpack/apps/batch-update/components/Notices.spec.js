import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { mount } from 'enzyme'
import { Notices, Notice } from './Notices'

let props, dismissHandler

beforeEach(() => {
  dismissHandler = jest.fn()
  props = {
    id: 'abc123',
    message: "It's all going to be fine",
    onDismiss: dismissHandler
  }
})

describe('Notice', () => {
  it('animates upon entering the dom', () => {
    const notice = mount(<Notice {...props} />)
    expect(notice.hasClass('entering')).toBe(true)
  })

  it('can be dismissed with a click', () => {
    jest.useFakeTimers()
    const notice = mount(<Notice {...props} />)

    notice.find('.dismiss').simulate('click')
    jest.runAllTimers()

    expect(dismissHandler).toBeCalled()
  })

  it('animates upon leaving the dom', () => {
    const notice = mount(<Notice {...props} />)
    notice.find('.dismiss').simulate('click')
    expect(notice.hasClass('leaving')).toBe(true)
  })
})

describe('Notices', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(<Notices />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
