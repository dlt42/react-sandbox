import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { 
  withRouter,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import config from 'Config'
import { setAuthToken } from 'Actions'
import { Field } from 'Authentication'
import './auth.scss'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        email: '',
        password: ''
      },
      error: null,
      errors: null
    }
    this.setValue = this.setValue.bind(this)
    this.login = this.login.bind(this)
  }

  setValue(field, value) {
    this.setState({
      data: {
        ...this.state.data,
        [field]: value
      }
    })
  }

  login() {
    const {
      history,
      setAuthToken
    } = this.props
    axios({
      method: 'post',
      url: `${config.server}/login`,
      data: JSON.stringify(this.state.data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(
      response => {
        setAuthToken(response.data.token)
        history.push("/")
      },
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
        <Field label="Email" name="email" setValue={this.setValue} type="text" errors={errors} />
        <Field label="Password" name="password" setValue={this.setValue} type="password" errors={errors} />
        <div className='fieldRow controls'>
          <input type="button" onClick={this.login} value="Login" />
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setAuthToken: (token) => dispatch(setAuthToken(token))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
