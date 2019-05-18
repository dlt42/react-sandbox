import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { PageContainer } from 'Pages'

const Error404Page = (props) =>
  <PageContainer override='*' secure={false}>
    <p>
    	Could not find { props.location.pathname }
    </p>
  </PageContainer>

Error404Page.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Error404Page)
