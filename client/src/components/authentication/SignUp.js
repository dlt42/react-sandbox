import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withRouter } from 'react-router-dom' 
import config from 'Config'
import { Field } from 'Authentication'
import './auth.scss'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        name: '',
        email: '',
        password: ''
      },
      error: null,
      errors: null
    }
    this.setValue = this.setValue.bind(this)
    this.signup = this.signup.bind(this)
  }

  setValue(field, value) {
    this.setState({
      data: {
        ...this.state.data,
        [field]: value
      }
    })
  }

  signup() {
    const {
      history
    } = this.props
    axios({
      method: 'post',
      url: `${config.server}/signup`,
      data: JSON.stringify(this.state.data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      } 
    })
    .then(
      response => history.push("/"),
      error => {
        this.setState({ 
          error: error.response.data.message,
          errors: error.response.data.errors 
        })
        console.log('An error occurred', error)
      }
    )
  }

  render () {
    const {
      error,
      errors
    } = this.state
    return (
      <div className='fieldBlock'>
        <div className="errors">
          <div>{ error !== null ? error : '' }</div>
        </div>
        <Field label="Name" name="name" setValue={this.setValue} type="text" errors={errors} />
        <Field label="Email" name="email" setValue={this.setValue} type="text" errors={errors} />
        <Field label="Password" name="password" setValue={this.setValue} type="password" errors={errors} />
        <div className='fieldRow controls'>
          <input type="button" onClick={this.signup} value="Signup" />
        </div>
      </div>
    )
  }
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(SignUp)
