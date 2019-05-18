import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { classNames } from 'DataUtil'
import './MenuItem.scss'

const MenuItem = (props) => {
  const classes = classNames({
    'menu-item': true,
    'selected': props.link === props.pathname
  })
  const { 
    link, 
    label 
  } = props
  return link ? (
    <Link to={link} className={classes}>
      { label }
    </Link>
  ) : (
    <span>{ label }</span>
  )
}

MenuItem.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string.isRequired,
  pathname: PropTypes.string
}

export default MenuItem
