import React from 'react'

export default function FilterOption (props) {
  const {
    current,
    filter,
    text,
    updateState
  } = props

  const handleClick = (action, event) => {
    event.preventDefault()
    updateState(filter, action)
  }

  const active = (condition) => {
    if (condition) {
      return 'active'
    } else {
      return null
    }
  }

  const suffix = text.toUpperCase()

  return (
    <div className='filter'>
      <div>
        {`${text}?`}
      </div>
      <a href='#' className={active(current === 'SHOW_ALL')} onClick={handleClick.bind(null, 'SHOW_ALL')}>
        All
      </a>
      <a href='#' className={active(current === `SHOW_${suffix}`)} onClick={handleClick.bind(null, `SHOW_${suffix}`)}>
        {text}
      </a>
      <a href='#' className={active(current === `SHOW_NOT_${suffix}`)} onClick={handleClick.bind(null, `SHOW_NOT_${suffix}`)}>
        {`Not ${text}`}
      </a>
    </div>
  )
}
