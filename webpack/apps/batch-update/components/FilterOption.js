import React from 'react'

export default function FilterOption (props) {
  const {
    current,
    filter,
    name,
    updateState
  } = props

  const suffix = name.toUpperCase()

  return (
    <div className='filter'>
      <div>
        {`${capitalize(name)}?`}
      </div>

      <OptionLink updateState={updateState} option='SHOW_ALL' filter={filter} current={current}>
        All
      </OptionLink>

      <OptionLink updateState={updateState} option={`SHOW_${suffix}`} filter={filter} current={current}>
        {capitalize(name)}
      </OptionLink>

      <OptionLink updateState={updateState} option={`SHOW_NOT_${suffix}`} filter={filter} current={current}>
        {`Not ${name}`}
      </OptionLink>
    </div>
  )
}

function OptionLink (props) {
  const {
    current,
    children,
    filter,
    option,
    updateState
  } = props

  const handleClick = (option, event) => {
    event.preventDefault()
    updateState(filter, option)
  }

  const active = (condition) => {
    if (condition) {
      return 'active'
    } else {
      return null
    }
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
