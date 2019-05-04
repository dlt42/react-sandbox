import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { PageContainer } from 'Pages'
import { Frm } from 'Form'

class FormPage extends Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const {
      schemaId,
      id,
      instruction
    } = this.props.match.params
    return (
      <PageContainer>
        <Frm schemaId={schemaId} id={id} instruction={instruction}/>
      </PageContainer>
    )
  }
}

FormPage.propTypes = {}

export default FormPage