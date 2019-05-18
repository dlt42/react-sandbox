import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NestedMenu } from 'Menu'
import { NavigationData } from 'Navigation'
import { connect } from 'react-redux'

class MenuContainer extends Component {
  render () {
    // Get the current location
    const {
      token,
      location 
    } = this.props

    // Get the menu data from the navigation data store
    const nestedMenuProps = {
      pages: NavigationData.getPages(),
      label: NavigationData.getMenuLabel(),
      variant: NavigationData.getMenuVariant(),
      pathname: location.pathname
    }

    // Generate the menu
    return token === null ? ( <span /> ) : ( <NestedMenu {...nestedMenuProps} /> )
  }
}

MenuContainer.propTypes = {
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.authStore.token
  }
}

export default connect(mapStateToProps, null)(MenuContainer)