import React from 'react'
import PropTypes from 'prop-types'
import g from 'glamorous'
import {
  fontSize,
  space,
  textAlign,
  width,
} from 'styled-system'

/**
 * hiding outline for pointing devices based on
 * http://kizu.ru/en/blog/keyboard-only-focus/#proper-solution
 */
const PureButton = ({ children, onClick, styles, ...props }) => (
  <button
    tabIndex={0}
    onClick={onClick}
    css={{
      ...styles,
      '&:focus, & > span:focus': {
        outline: `none`,
      },
      '&:not(:-moz-focusring):focus > span': {
        boxShadow: `none`,
      },
      '&:focus > span': {
        boxShadow: `0 0 3px 2px #85bfff`,
      },
    }}
    {...props}
  >
    <span
      tabIndex={-1}
      css={{
        position: `relative`,
        padding: `0 0.2rem`,
      }}
    >
      {children}
    </span>
  </button>
)
PureButton.propTypes = {
  onClick: PropTypes.func,
  styles: PropTypes.object,
}
PureButton.defaultProps = {
  onClick() {},
  styles: {},
}

const Button = g(PureButton)(
  fontSize,
  space,
  textAlign,
  width
)

export default Button
export { Button, PureButton }
