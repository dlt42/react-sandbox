import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { NavigationData } from 'Navigation'
import { Page, Error404Page } from 'Pages'

class PageContainer extends Component {

  componentWillMount() {
    this.redirectIfNeeded(null)
  }

  componentWillUpdate(nextProps) {
    this.redirectIfNeeded(nextProps)
  }

  redirectIfNeeded(nextProps) {
    const {
      token,
      secure
    } = this.props
    const result = secure && (nextProps ? token !== null && nextProps.token === null : token === null)
    if (result) {
      console.log("Not logged in - redirecting to login")
      this.props.history.push('/login')
    }
  }

  render () {
    // Get the page location and content
    const { 
      override, 
      location, 
      children 
    } = this.props

    // Retrieve the navigation data for the page
    const page = NavigationData.getPage(location.pathname, override)

    // Render the page if navigation data was found, otherwise render the 404 page
    return page
      ? (<Page children={children} label={page.label} />)
      : (<Error404Page {...this.props} />)
  }
}

PageContainer.propTypes = {
  override: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  secure: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.authStore.token
  }
}

export default withRouter(connect(mapStateToProps, null)(PageContainer))
