import React from 'react'

function FilterOptions (props) {
  const { className, publishedFilter, deletedFilter, genomedFilter, onSetPublishedFilter, onSetDeletedFilter, onSetGenomedFilter } = props
  return (
    <div className={className}>
      <PublishedFilter current={publishedFilter}
        onSetPublishedFilter={onSetPublishedFilter}
        />
      <DeletedFilter current={deletedFilter}
        onSetDeletedFilter={onSetDeletedFilter}
        />
      <GenomedFilter current={genomedFilter}
        onSetGenomedFilter={onSetGenomedFilter}
        />
    </div>
  )
}

function PublishedFilter (props) {
  const { current, onSetPublishedFilter } = props
  return (
    <div className='filter'>
      <div>Published?</div>
      <a href='#' className={current === 'SHOW_ALL' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetPublishedFilter('SHOW_ALL') }}>All</a>
      <a href='#' className={current === 'SHOW_PUBLISHED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetPublishedFilter('SHOW_PUBLISHED') }}>Published</a>
      <a href='#' className={current === 'SHOW_NOT_PUBLISHED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetPublishedFilter('SHOW_NOT_PUBLISHED') }}>Not published</a>
    </div>
  )
}

function DeletedFilter (props) {
  const { current, onSetDeletedFilter } = props
  return (
    <div className='filter'>
      <div>Deleted?</div>
      <a href='#' className={current === 'SHOW_ALL' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetDeletedFilter('SHOW_ALL') }}>All</a>
      <a href='#' className={current === 'SHOW_DELETED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetDeletedFilter('SHOW_DELETED') }}>Deleted</a>
      <a href='#' className={current === 'SHOW_NOT_DELETED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetDeletedFilter('SHOW_NOT_DELETED') }}>Not deleted</a>
    </div>
  )
}

function GenomedFilter (props) {
  const { current, onSetGenomedFilter } = props
  return (
    <div className='filter'>
      <div>Genomed?</div>
      <a href='#' className={current === 'SHOW_ALL' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetGenomedFilter('SHOW_ALL') }}>All</a>
      <a href='#' className={current === 'SHOW_GENOMED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetGenomedFilter('SHOW_GENOMED') }}>Genomed</a>
      <a href='#' className={current === 'SHOW_NOT_GENOMED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetGenomedFilter('SHOW_NOT_GENOMED') }}>Not genomed</a>
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
