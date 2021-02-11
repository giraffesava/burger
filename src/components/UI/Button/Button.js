import React from 'react'
import classes from './Button.module.css'
const Button = (props) => (
  <button 
    onClick={props.clicked}
    disabled={props.disabled}
    className={[props.Button, classes[props.btnType]].join(' ')}>{props.children}</button>
)

export default Button