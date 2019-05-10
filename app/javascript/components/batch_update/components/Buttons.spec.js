import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { Button, LinkButton } from './Buttons'
import { mount } from 'enzyme'

describe('Button', () => {
  it('renders a basic button', () => {
    const rendered = renderer.create(<Button>Click me</Button>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a primary button', () => {
    const rendered = renderer.create(<Button primary>Click me</Button>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a secondary button', () => {
    const rendered = renderer.create(<Button secondary>Click me</Button>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a full width button', () => {
    const rendered = renderer.create(<Button fullWidth>Click me</Button>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a full width button', () => {
    const rendered = renderer.create(
      <LinkButton fullWidth>Click me</LinkButton>
    )
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('dispatches the click handler on a normal button', () => {
    const clickHandler = jest.fn()
    const wrapper = mount(<Button onClick={clickHandler} />)
    wrapper.find('button').simulate('click')
    expect(clickHandler.mock.calls.length).toEqual(1)
  })

  describe('when "disabled" prop is supplied', () => {
    it('renders a disabled button', () => {
      const rendered = renderer.create(<Button disabled>Click me</Button>)
      const tree = rendered.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('does not dispatch the click handler', () => {
      const clickHandler = jest.fn()
      const wrapper = mount(<Button disabled onClick={clickHandler} />)
      wrapper.find('button').simulate('click')
      expect(clickHandler.mock.calls.length).toEqual(0)
    })
  })
})

describe('LinkButton', () => {
  it('renders a basic link button', () => {
    const rendered = renderer.create(<LinkButton>Click me</LinkButton>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a primary link button', () => {
    const rendered = renderer.create(<LinkButton primary>Click me</LinkButton>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a secondary link button', () => {
    const rendered = renderer.create(
      <LinkButton secondary>Click me</LinkButton>
    )
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a full width link button', () => {
    const rendered = renderer.create(
      <LinkButton fullWidth>Click me</LinkButton>
    )
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a full width link button', () => {
    const rendered = renderer.create(
      <LinkButton fullWidth>Click me</LinkButton>
    )
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a disabled link button', () => {
    const rendered = renderer.create(<LinkButton disabled>Click me</LinkButton>)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
