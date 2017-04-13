import styled, { css } from 'styled-components'

/* utility methods */

export const breakpoints = {
  notSmall: (...args) => css`
    @media (min-width: 768px) {
      ${css(...args)}
    }
  `
}

export const avantGarde = css`
  font-family:'ITC Avant Garde Gothic W01';
`

/* grid components */

export const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  ${breakpoints.notSmall`
    flex-direction: row;
  `}
`

export const Sidebar = styled.div`
  flex-grow: 1;
  flex-basis: 150px;
  border-bottom: solid 1px #eee;
  padding: 1em;
  ${breakpoints.notSmall`
    border-bottom: none;
    border-right: solid 1px #eee;
  `}
`

export const Content = styled.div`
  flex-grow: 5;
  flex-basis: 400px;
  padding: 1em;
`
