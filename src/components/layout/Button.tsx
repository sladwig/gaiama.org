import React, { SFC } from 'react'
// import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colors } from '@src/theme'

/**
 * hiding outline for pointing devices based on
 * http://kizu.ru/en/blog/keyboard-only-focus/#proper-solution
 */
const PureButton: SFC<PureButtonProp> = ({
  children,
  onClick,
  styles,
  ...props
}) => (
  <button
    tabIndex={0}
    onClick={onClick}
    css={css`
      ${styles};
      &:focus,
      & > span:focus {
        outline: none;
      }
      &:not(:-moz-focusring):focus > span {
        box-shadow: none;
      }
      &:focus > span {
        boxshadow: 0 0 3px 2px ${colors.blueLight};
      }
    `}
    {...props}
  >
    <span
      tabIndex={-1}
      css={css`
        position: relative;
        padding: 0 0.2rem;
      `}
    >
      {children}
    </span>
  </button>
)
interface PureButtonProp {
  onClick?: () => any
  styles?: string
}

const Button = styled(PureButton)()

export default Button
export { Button, PureButton }
