import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { PageContainer } from 'Pages'
import { SignUp } from 'Authentication'

const SignUpPage = (props) =>
  <PageContainer secure={false}>
    <div>
      <SignUp />
      <Link to='/login'>
        Login
      </Link>
    </div>
  </PageContainer>

SignUpPage.propTypes = {}

export default SignUpPage
