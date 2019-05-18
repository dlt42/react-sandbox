import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { PageContainer } from 'Pages'
import { RecordList } from 'List'

class RecordListPage extends Component {

  render () {
    const {
      schemaId,
      listId
    } = this.props.match.params
    return (
      <PageContainer secure={true}>
        <RecordList schemaId={schemaId} listId={listId} />
      </PageContainer>
    )
  }
}

RecordListPage.propTypes = {
  match: PropTypes.object.isRequired
}

export default RecordListPage
