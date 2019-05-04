import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { PageContainer } from 'Pages'
import { RecordList } from 'List'

class RecordListPage extends Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const {
      schemaId,
      listId
    } = this.props.match.params
    return (
      <PageContainer>
        <RecordList schemaId={schemaId} listId={listId} />
      </PageContainer>
    )
  }
}

RecordListPage.propTypes = {}

export default RecordListPage
