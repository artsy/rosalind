import React from 'react'

export default function FilterOptions (props) {
  const { publishedFilter, deletedFilter, genomedFilter, onSetPublishedFilter, onSetDeletedFilter, onSetGenomedFilter } = props
  return (
    <div className='FilterOptions'>
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
    <div className='PublishedFilter'>
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
    <div className='DeletedFilter'>
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
    <div className='GenomedFilter'>
      <div>Genomed?</div>
      <a href='#' className={current === 'SHOW_ALL' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetGenomedFilter('SHOW_ALL') }}>All</a>
      <a href='#' className={current === 'SHOW_GENOMED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetGenomedFilter('SHOW_GENOMED') }}>Genomed</a>
      <a href='#' className={current === 'SHOW_NOT_GENOMED' ? 'active' : null} onClick={(e) => { e.preventDefault(); onSetGenomedFilter('SHOW_NOT_GENOMED') }}>Not genomed</a>
    </div>
  )
}
