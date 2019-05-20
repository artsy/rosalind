import styled, { css } from 'styled-components'

/* utility methods */

export const breakpoints = {
  notSmall: (...args) => css`
    @media (min-width: 768px) {
      ${css(...args)}
    }
  `,
}

/* constants */

export const avantGarde = css`
  font-family: 'ITC Avant Garde Gothic W01';
`

export const colors = {
  grayLightest: '#F8F8F8',
  grayLighter: '#E5E5E5',
  grayLight: '#DBDBDB',
  gray: '#cccccc',
  grayDark: '#999999',
  grayDarker: '#666666',
  grayDarkest: '#333333',
  purpleLightest: '#F7F3FF',
  purpleLight: '#E2D2FF',
  purple: '#6E1FFF',
  redLightest: '#FFF8F8',
  redLight: '#F7625A',
  red: '#F7625A',
  yellowLight: '#FDEFD1',
  yellow: '#FCE1A8',
  yellowDark: '#F1AF1B',
  greenLight: '#0EDA83',
  green: '#0EDA83',
  white: '#ffffff',
  black: '#000000',
}

/* grid components */

export const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  position: relative;
  ${breakpoints.notSmall`
    flex-direction: row;
  `}
`
Wrapper.displayName = 'Wrapper'

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
Sidebar.displayName = 'Sidebar'

export const Content = styled.div`
  flex-grow: 5;
  flex-basis: 400px;
  padding: 1em;
`
Content.displayName = 'Content'
