import React from 'react'
import PropTypes from 'prop-types'

function FilterOption(props) {
  const suffix = toOptionValue(props.name)

  return (
    <div className="filter">
      <div>{`${toDisplayName(props.name)}?`}</div>

      <Option option="SHOW_ALL" {...props}>
        All
      </Option>

      <Option option={`SHOW_${suffix}`} {...props}>
        True
      </Option>

      <Option option={`SHOW_NOT_${suffix}`} {...props}>
        False
      </Option>
    </div>
  )
}

FilterOption.propTypes = {
  current: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateState: PropTypes.func,
}

function Option(props) {
  const { current, children, name, option, updateState } = props

  const handleClick = (option, event) => {
    event.preventDefault()
    const filter = `${name}Filter`
    updateState(filter, option)
  }

  const active = condition => {
    return condition ? 'active' : null
  }

  return (
    <a
      href="#"
      className={active(current === option)}
      onClick={handleClick.bind(null, option)} // eslint-disable-line react/jsx-no-bind
    >
      {children}
    </a>
  )
}

const toDisplayName = str => {
  // un-camelize
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2')
  // capitalize first letter
  str = str.charAt(0).toUpperCase() + str.slice(1)
  return str
}

const toOptionValue = str => {
  // un-camelize
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2')
  // add underscores
  str = str.replace(/\s+/g, '_')
  // capitalize
  str = str.toUpperCase()
  return str
}

export default FilterOption
