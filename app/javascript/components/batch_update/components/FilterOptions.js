import React from 'react'
import styled from 'styled-components'
import FilterOption from './FilterOption'

function FilterOptions(props) {
  const {
    className,
    publishedFilter,
    genomedFilter,
    acquireableOrOfferableFilter,
    updateState,
  } = props

  return (
    <div className={className}>
      <FilterOption
        current={publishedFilter}
        name="published"
        updateState={updateState}
      />
      <FilterOption
        current={genomedFilter}
        name="genomed"
        updateState={updateState}
      />
      <FilterOption
        current={acquireableOrOfferableFilter}
        name="acquireableOrOfferable"
        updateState={updateState}
      />
    </div>
  )
}

/* default styled component */

const StyledFilterOptions = styled(FilterOptions)`
  font-size: 80%;
  color: #333;
  line-height: 140%;
  margin: 2em 0;
  opacity: 0.5;
  transition: opacity 0.5s;

  &:hover {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .filter {
    margin-top: 1em;

    a {
      color: #999;
      margin-right: 0.5em;

      &.active {
        color: #333;
        font-weight: bold;
        text-decoration: none;
        cursor: default;
      }
    }
  }
`

export default StyledFilterOptions
