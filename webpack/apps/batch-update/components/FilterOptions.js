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
        current={publishedFilter}
        name='published'
        updateState={updateState}
        />
      <FilterOption
        current={deletedFilter}
        name='deleted'
        updateState={updateState}
        />
      <FilterOption
        current={genomedFilter}
        name='genomed'
        updateState={updateState}
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
