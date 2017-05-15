import React from 'react'

function FilterOptions (props) {
  const {
    className,
    publishedFilter,
    deletedFilter,
    genomedFilter,
    updateState
  } = props

  return (
    <div className={className}>
      <PublishedFilter
        current={publishedFilter}
        updateState={updateState}
        />
      <DeletedFilter
        current={deletedFilter}
        updateState={updateState}
        />
      <GenomedFilter
        current={genomedFilter}
        updateState={updateState}
        />
    </div>
  )
}

function PublishedFilter (props) {
  const { current, updateState } = props

  const handleClick = (args, event) => {
    const [filter, action] = args
    event.preventDefault()
    updateState(filter, action)
  }

  return (
    <div className='filter'>
      <div>Published?</div>
      <a href='#' className={current === 'SHOW_ALL' ? 'active' : null} onClick={handleClick.bind(null, ['publishedFilter', 'SHOW_ALL'])}>All</a>
      <a href='#' className={current === 'SHOW_PUBLISHED' ? 'active' : null} onClick={handleClick.bind(null, ['publishedFilter', 'SHOW_PUBLISHED'])}>Published</a>
      <a href='#' className={current === 'SHOW_NOT_PUBLISHED' ? 'active' : null} onClick={handleClick.bind(null, ['publishedFilter', 'SHOW_NOT_PUBLISHED'])}>Not published</a>
    </div>
  )
}

function DeletedFilter (props) {
  const { current, updateState } = props

  const handleClick = (args, event) => {
    const [filter, action] = args
    event.preventDefault()
    updateState(filter, action)
  }

  return (
    <div className='filter'>
      <div>Deleted?</div>
      <a href='#' className={current === 'SHOW_ALL' ? 'active' : null} onClick={handleClick.bind(null, ['deletedFilter', 'SHOW_ALL'])}>All</a>
      <a href='#' className={current === 'SHOW_DELETED' ? 'active' : null} onClick={handleClick.bind(null, ['deletedFilter', 'SHOW_DELETED'])}>Deleted</a>
      <a href='#' className={current === 'SHOW_NOT_DELETED' ? 'active' : null} onClick={handleClick.bind(null, ['deletedFilter', 'SHOW_NOT_DELETED'])}>Not deleted</a>
    </div>
  )
}

function GenomedFilter (props) {
  const { current, updateState } = props

  const handleClick = (args, event) => {
    const [filter, action] = args
    event.preventDefault()
    updateState(filter, action)
  }

  return (
    <div className='filter'>
      <div>Genomed?</div>
      <a href='#' className={current === 'SHOW_ALL' ? 'active' : null} onClick={handleClick.bind(null, ['genomedFilter', 'SHOW_ALL'])}>All</a>
      <a href='#' className={current === 'SHOW_GENOMED' ? 'active' : null} onClick={handleClick.bind(null, ['genomedFilter', 'SHOW_GENOMED'])}>Genomed</a>
      <a href='#' className={current === 'SHOW_NOT_GENOMED' ? 'active' : null} onClick={handleClick.bind(null, ['genomedFilter', 'SHOW_NOT_GENOMED'])}>Not genomed</a>
    </div>
  )
}

/* default styled component */

import styled from 'styled-components'

const StyledFilterOptions = styled(FilterOptions)`
  font-size: 80%;
  color: #999;
  line-height: 140%;
  margin: 2em 0;
  opacity: 0.25;
  transition: opacity 0.75s;

  &:hover {
    opacity: 1;
    transition: opacity 0.25s;
  }

  .filter {
    margin-top: 1em;

    a {
      color: #ccc;
      margin-right: 0.5em;

      &.active {
        color: #333;
        font-weight: bold;
        text-decoration: none;
        cursor: default;;
      }
    }
  }
`

export default StyledFilterOptions
