import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { PageContainer } from 'Pages'
import { FormList } from 'List'

class FormListPage extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <PageContainer>
        <FormList />
      </PageContainer>
    )
  }
}

FormListPage.propTypes = {
}

export default FormListPage
