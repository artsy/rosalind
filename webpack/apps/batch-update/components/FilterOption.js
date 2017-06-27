import React from 'react'
import PropTypes from 'prop-types'

function FilterOption (props) {
  const suffix = props.name.toUpperCase()

  return (
    <div className='filter'>
      <div>
        {`${capitalize(props.name)}?`}
      </div>

      <Option option='SHOW_ALL' {...props}>
        All
      </Option>

      <Option option={`SHOW_${suffix}`} {...props}>
        {capitalize(props.name)}
      </Option>

      <Option option={`SHOW_NOT_${suffix}`} {...props}>
        {`Not ${props.name}`}
      </Option>
    </div>
  )
}

FilterOption.propTypes = {
  current: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateState: PropTypes.func
}

function Option (props) {
  const {
    current,
    children,
    name,
    option,
    updateState
  } = props

  const handleClick = (option, event) => {
    event.preventDefault()
    const filter = `${name}Filter`
    updateState(filter, option)
  }

  const active = (condition) => {
    return condition ? 'active' : null
  }

  return (
    <a href='#'
      className={active(current === option)}
      onClick={handleClick.bind(null, option)}
      >
      {children}
    </a>
  )
}

function capitalize (str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

export default FilterOption
