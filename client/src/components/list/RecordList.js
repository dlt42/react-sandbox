import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { PageContainer } from 'Pages'
import { fetchRecordList } from 'Actions'
import {
  isRequestingRecordList, 
  getRecordList, 
  isRecordListDifferent 
} from 'Reducers'

const uuidv1 = require('uuid/v1')

class RecordList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requesting: true
    }
    this.create = this.create.bind(this)
    this.back = this.back.bind(this)
  }

  back(){
    const {
      history
    } = this.props
    history.goBack();
  }

  componentDidMount () {
    const { 
      fetchRecordList,
      requesting,
      recordList
    } = this.props
    if (!requesting && !recordList) {
      fetchRecordList()
    } else {
      this.setState({
        recordList: recordList,
        requesting: requesting
      })
    }
  }

  componentDidUpdate (prevProps) {
    const {
      requesting,
      recordList
    } = this.props
    if (requesting !== prevProps.requesting || recordList !== prevProps.recordList) {
      this.setState({
        recordList: recordList,
        requesting: requesting
      })
    }
  }

  create() {
    const { 
      schemaId,
      history
    } = this.props
    const id = uuidv1()
    history.push(`/form/${schemaId}/${id}/new`)
  }

  render () {
    const {
      recordList,
      requesting
    } = this.state
    const { 
      schemaId
    } = this.props
    return (
      <div>
        { requesting || !recordList ? (
            <p>Loading</p>
          ) : (
            <>
              <div className="control-panel">
                <button className="action-button" onClick={this.back}>Back</button>
                <button className="action-button" onClick={this.create}>New</button>
              </div>
              <div className="record-list">
                { recordList.length > 0 ? 
                  recordList.map((record, index) => ( 
                    <p key={index}>
                      <Link to={`/form/${schemaId}/${record.id}`}>
                        {record.label}
                      </Link>
                    </p>
                  )) : (
                    <p>No records</p>
                  )
                }
                </div>
            </>
          )
        }
      </div>
    )
  }
}

RecordList.propTypes = {
  schemaId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    recordMap: state.recordStore.recordMap,
    requestingList: state.recordStore.requesting,
    requesting: isRequestingRecordList(state.recordStore.requesting, ownProps.schemaId, ownProps.listId),
    recordList: getRecordList(state.recordStore.recordMap, ownProps.schemaId, ownProps.listId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRecordList: () => dispatch(fetchRecordList(ownProps.schemaId, ownProps.listId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecordList))
