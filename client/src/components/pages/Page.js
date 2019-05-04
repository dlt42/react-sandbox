import React from 'react'
import PropTypes from 'prop-types'

import './Page.scss'

const Page = (props) => {
  const { label, children } = props
  return (
    <div className='page'>
      <header className='navbar navbar-expand flex-column flex-md-row justify-content-center page-title'>
        { label }
      </header>
      <div className='container-fluid container-fluid-scroll page-container'>
        <div className='row no-gutters page-row'>
          <div className='col-sm-12'>
            <div className="container content-container">
              <div className="row content-row">
                <div className="col col-sm-2" />
                <div className="col-sm-8 text-center content-column">
                  { children }
                </div>
                <div className="col col-sm-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Page.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ])
}

export default Page
