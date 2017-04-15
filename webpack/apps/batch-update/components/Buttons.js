import styled, { css } from 'styled-components'
import { avantGarde, colors } from './Layout'

const buttonSizing = (props) => {
  if (props.fullWidth) {
    return css`
      display: block;
      width: 100%;
      padding: 18px 30px 15px 30px;
    `
  } else {
    return css`
      display: inline-block;
      padding: 18px 30px 15px 30px;
    `
  }
}

const buttonColors = (props) => {
  if (props.primary) {
    return css`
      background: ${colors.black};
      color: ${colors.white};
      border: solid 1px ${colors.black};
    `
  } else if (props.secondary) {
    return css`
      background: ${colors.white};
      color: ${colors.black};
      border: solid 1px ${colors.black};
    `
  } else {
    return css`
      background: ${colors.grayLightest};
      color: ${colors.black};
      border: solid 1px ${colors.grayLightest};
    `
  }
}

const buttonTypography = (props) => {
  return css`
    ${avantGarde}
    font-weight: normal;
    font-size: 13px;
    line-height: 13px;
    text-transform: uppercase;
  `
}

const buttonTransitions = (props) => {
  return css`
    transition-property: background, border-color, color;
    transition-duration: 0.15s;
    &:hover {
      background: ${colors.purple};
      border-color: ${colors.purple};
      color: ${colors.white};
    }
  `
}

export const Button = styled.button`
  ${buttonSizing}
  ${buttonColors}
  ${buttonTypography}
  ${buttonTransitions}

  cursor: pointer
`

export const LinkButton = styled.a`
  ${buttonSizing}
  ${buttonColors}
  ${buttonTypography}
  ${buttonTransitions}

  text-decoration: none; 
  text-align: center;
`