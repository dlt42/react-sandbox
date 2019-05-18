import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './auth.scss'

class Field extends Component {
  render() {
    const {
      label,
      name,
      setValue,
      errors,
      type
    } = this.props
    return (
      <div className='fieldRow'>
        <div className='fieldLabel'>
          { label }
        </div> 
        <div className="fieldInput">
          <input type={type} onChange={(evt) => { setValue(name, evt.target.value) }} />
          <div className="fieldError">
            { errors && errors[name] ? errors[name] : '' }
          </div>
        </div>
      </div>
    )
  }
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  type: PropTypes.string.isRequired
}

export default Field