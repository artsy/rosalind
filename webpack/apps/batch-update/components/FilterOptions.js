import React from 'react'
import FilterOption from './FilterOption'

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
      <FilterOption
        filter='publishedFilter'
        current={publishedFilter}
        updateState={updateState}
        text='Published'
        />
      <FilterOption
        filter='deletedFilter'
        current={deletedFilter}
        updateState={updateState}
        text='Deleted'
        />
      <FilterOption
        filter='genomedFilter'
        current={genomedFilter}
        updateState={updateState}
        text='Genomed'
        />
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
