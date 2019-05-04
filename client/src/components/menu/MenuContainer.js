import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { NestedMenu } from 'Menu'
import { NavigationData } from 'Navigation'

class MenuContainer extends Component {
  render () {
    // Get the current location
    const { location } = this.props

    // Get the menu data from the navigation data store
    const nestedMenuProps = {
      pages: NavigationData.getPages(),
      label: NavigationData.getMenuLabel(),
      variant: NavigationData.getMenuVariant(),
      pathname: location.pathname
    }

    // Generate the menu
    return <NestedMenu {...nestedMenuProps} />
  }
}

MenuContainer.propTypes = {
  location: PropTypes.object.isRequired
}

export default MenuContainer
