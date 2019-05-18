import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PageContainer } from 'Pages'
import { Frm } from 'Form'

class FormPage extends Component {
  
  render () {
    const {
      schemaId,
      id,
      instruction
    } = this.props.match.params
    return (
      <PageContainer secure={true}>
        <Frm schemaId={schemaId} id={id} instruction={instruction} />
      </PageContainer>
    )
  }
}

FormPage.propTypes = {
  match: PropTypes.object.isRequired,
  schemaId: PropTypes.string,
  id: PropTypes.string,
  instruction: PropTypes.string
}

export default FormPage