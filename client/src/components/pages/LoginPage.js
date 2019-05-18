import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { PageContainer } from 'Pages'
import { Login } from 'Authentication'

const LoginPage = (props) =>
  <PageContainer secure={false}>
    <div>
      <Login />
      <Link to="/signup">
        Sign Up
      </Link>
    </div>
  </PageContainer>

LoginPage.propTypes = {}

export default LoginPage
