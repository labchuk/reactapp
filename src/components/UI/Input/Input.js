import React from 'react'
import classes from './Input.module.css'


function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const InputType = props.type || 'text'
    const cls = [classes.Input]
    const htmlFor = `${InputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div style = {props.style} className = {cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type = {InputType} 
                id={htmlFor}
                value = {props.value}
                onChange = {props.onChange}
            />
            { isInvalid(props) 
            ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null}
            
        </div>
    )
}

export default Input