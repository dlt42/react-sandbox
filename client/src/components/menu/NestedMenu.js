import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FaBars } from 'react-icons/fa'

import {
  anyDifference,
  classNames
} from 'DataUtil'
import { MenuItem } from 'Menu'

import 'Menu/NestedMenu.scss'

const defaultProps = {
  pathname: null,
  variant: 'default',
  pages: null,
  label: '...'
}

class NestedMenu extends Component {
  constructor (props = defaultProps) {
    super(props)

    this.state = {
      show: false,
      selectedIds: []
    }

    // Generate the classes for the menu
    const classMap = { 'dropdown__items': true }
    classMap['dropdown__items--' + this.props.variant] = !!this.props.variant
    this.subMenuClasses = classNames(classMap)

    // Binding the callbacks to the component within the constructor means that
    // the generation of new functions will only occur once for the instance.
    // Inline binding can result in multiple functions per instance and possibly
    // more when child components are rerendered
    this.handleDropdownOpen = this.handleDropdownOpen.bind(this)
    this.handleDropdownClose = this.handleDropdownClose.bind(this)
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
    this.handleSelectedId = this.handleSelectedId.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    // The component should update if the named attributes have changed in the props or state
    return anyDifference(this.props, nextProps, ['pages']) ||
           anyDifference(this.state, nextState, ['show', 'selectedIds'])
  }

  handleDropdownToggle () {
    this.setState({ show: !this.state.show, selectedIds: [] })
  }

  handleDropdownOpen () {
    this.setState({ show: true, selectedIds: [] })
  }

  handleDropdownClose () {
    // NOTE: When debugging, comment this line to inspect menu elements and style
    this.setState({ show: false, selectedIds: [] })
  }

  handleSelectedId (selected, depth) {
    return () => {
      // Copy the component state
      const updatedArray = this.state.selectedIds.slice(0)

      // Change the entry in the selected ID's array at the specified depth to the passed value
      updatedArray[depth] = selected

      // Update the component state, but not directly
      this.setState({
        selectedIds: updatedArray
      })
    }
  }

  renderDisplay () {
    // Render the menu toggle
    return (
      <div className='dropdown_button'>
        <FaBars />
        <span className='dropdown_button_label'>{ this.props.label } </span>
      </div>
    )
  }

  renderMenu (pages, depth = 0) {
    // Make sure the menu is being displayed
    if (this.state.show !== true) {
      return null
    }

    // Render menu items for the specified pages but only when the page has been flagged for inclusion
    const menuItems = pages.filter(page => page.menu).map(page => this.renderMenuItem(page, depth))

    // Output the generated menu item
    return (
      <div className={this.subMenuClasses}>
        { menuItems }
      </div>
    )
  }

  /**
   * For each menu item, render a submenu if:
   *  - it is selected or it has a link that is part of the current path
   *  - it has nested pages
   */
  renderMenuItem (page, depth) {
    const pathname = this.props.pathname
    const hasItems = page.pages && page.pages.length > 0
    const link = page.link.value
    const isSelected = this.state.selectedIds[depth] === page.id
    const isPartOfPath = pathname.indexOf(link) === 0 && pathname !== link

    const menuItemProps = {
      link: link,
      label: page.label,
      pathname: pathname
    }

    // Render the menu item and, if it has been generated, the submenu too
    return (
      <div key={page.id} onMouseEnter={this.handleSelectedId(page.id, depth)}>
        <MenuItem {...menuItemProps} />
        { hasItems && (isSelected || isPartOfPath) &&
            this.renderMenu(page.pages, depth + 1)
        }
      </div>
    )
  }

  render () {
    // Render the menu toggle and the menu
    return (
      <div className='dropdown--nested' onClick={this.handleDropdownToggle} onMouseLeave={this.handleDropdownClose}>
        { this.renderDisplay() }
        { this.renderMenu(this.props.pages) }
      </div>
    )
  }
}

NestedMenu.propTypes = {
  pathname: PropTypes.string.isRequired,
  variant: PropTypes.string,
  pages: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired
}

export default NestedMenu
