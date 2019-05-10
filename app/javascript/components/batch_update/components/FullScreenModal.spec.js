import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { mount } from 'enzyme'
import FullScreenModal from './FullScreenModal'

it('renders correctly when closed', () => {
  const rendered = renderer.create(
    <FullScreenModal>I am closed</FullScreenModal>
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly when open', () => {
  const rendered = renderer.create(
    <FullScreenModal isOpen>I am open</FullScreenModal>
  )
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('body scrolling', () => {
  let addClass, removeClass

  beforeAll(() => {
    addClass = jest.fn()
    removeClass = jest.fn()

    // Tricky way of mocking access to document.* methods
    // https://github.com/facebook/jest/issues/2297
    Object.defineProperty(document, 'body', {
      value: {
        classList: {
          add: addClass,
          remove: removeClass,
        },
      },
    })
  })

  it('temporarily assigns a no-scroll css selector to the <body> element', () => {
    const wrapper = mount(
      <FullScreenModal>No scrolling, not in my house.</FullScreenModal>
    )

    wrapper.setProps({
      isOpen: true,
    })
    expect(addClass.mock.calls.length).toBe(1)
    expect(addClass.mock.calls[0][0]).toEqual('FullScreenModal--open')

    wrapper.setProps({
      isOpen: false,
    })
    expect(removeClass.mock.calls.length).toBe(1)
    expect(removeClass.mock.calls[0][0]).toEqual('FullScreenModal--open')
  })
})
