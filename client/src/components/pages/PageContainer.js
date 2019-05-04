import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { NavigationData } from 'Navigation'
import { Page, Error404Page } from 'Pages'

class PageContainer extends Component {
  render () {
    // Get the page location and content
    const { override, location, children } = this.props

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
  match: PropTypes.object.isRequired
}

export default withRouter(PageContainer)
