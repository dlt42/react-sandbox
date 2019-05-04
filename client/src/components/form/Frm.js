import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from 'react-jsonschema-form'
import { withRouter } from 'react-router'

import { transformErrors } from 'Form'
import { PageContainer } from 'Pages'
import { fetchRecord, fetchSchema, receiveRecord, createRecord, updateRecord  } from 'Actions'
import { isRequestingRecord, getRecord, isRecordDifferent, isRequestingSchema, isSchemaDifferent } from 'Reducers'

import './Frm.scss'

class Frm extends Component {
  constructor (props) {
    super(props)
    const {
      instruction
    } = props
    this.state = {
      requesting: true,
      record: null,
      schema: null,
      instruction: instruction || "none"
    }
    this.back = this.back.bind(this)
  }

  back(){
    const {
      history
    } = this.props
    history.goBack();
  }

  getRecord () {
    const {
      recordMap,
      schemaId, 
      id,
      receiveRecord
    } = this.props
    const {
      instruction
    } = this.state
    var record = getRecord(recordMap, schemaId, id)
    if (record) {
      if (instruction === "new") {
        this.setState({
          "instruction": "none"
        })
      }
    } else {
      if (instruction === "new" && this.getSchema()) {
        record = {
          id: id
        }
        receiveRecord({
          [schemaId]: [record]
        })
      }
    }
    return record
  }

  getSchema () {
    const {
      schema,
      schemaId      
    } = this.props
    return schema[schemaId]
  }

  updateState () {
    const { 
      requestingRecord,
      requestingSchema
    } = this.props
    this.setState({
      record: this.getRecord(),
      schema: this.getSchema(),
      requesting: requestingRecord || requestingSchema
    })
  }

  componentDidMount () {
    const { 
      fetchRecord, 
      fetchSchema,
      requestingRecord,
      requestingSchema
    } = this.props
    if (!requestingRecord && !this.getRecord()) {
      fetchRecord()
    } else {
      this.updateState()
    }
    if (!requestingSchema && !this.getSchema()) {
      fetchSchema() 
    } else {
      this.updateState()
    }
  }

  componentDidUpdate (prevProps) {
    const {
      recordMap, 
      schemaId,
      id,
      schema,
      requestingRecord,
      requestingSchema
    } = this.props
    if (isRecordDifferent(recordMap, schemaId, id, prevProps.recordMap) || 
        isSchemaDifferent(schema, schemaId, prevProps.schema) ||
        ((requestingRecord || requestingSchema) !== (prevProps.requestingRecord || prevProps.requestingSchema))
        ) {
      this.updateState()
    }
  }

  onSubmit (form) {
    const {
      createRecord,
      updateRecord,
      schemaId
    } = this.props
    const {
      instruction,
      schema
    } = this.state
    const labelFields = schema.schema.labelFields 
    const timestampAttribute = instruction === "new" ? "created" : "updated"
    const label = labelFields.map((field, index) => form.state.formData[field]).join(" ")
    const record = { 
      ...form.state.formData, 
      label: label,
      [timestampAttribute]: new Date().getTime() 
    }
    if (instruction === "new") {
      createRecord(record)
    } else {
      updateRecord(record)
    }
    this.setState({ 
      record: record,
      instruction: "none"
    })
  }

  render () {
    const {
      record,
      schema,
      requesting,
      instruction
    } = this.state
    let theForm
    return requesting || !record || !schema ? (
      <p>Loading</p>
    ) : (
      <>
        <div className="control-panel">
          <button className="action-button" onClick={this.back}>Back</button>
        </div>
        <div className="formWrapperOuter">
          <div className="formWrapperInner">
            <Form transformErrors={(errors) => {
                    const {
                      schema,
                      uiSchema,
                      formData
                    } = theForm.state
                    return transformErrors(errors, schema, uiSchema, formData) 
                  }} 
                  schema={schema.schema} 
                  uiSchema={schema.uiSchema} 
                  formData={record} 
                  onSubmit={(e) => {this.onSubmit(theForm)}}
                  ref={(form) => theForm = form || theForm }>
              <button className="action-button" type="submit">{ instruction === 'new' ? 'Save' : 'Update' }</button>
            </Form>
          </div>
        </div>
      </>
    )
  }
}

Frm.propTypes = {}

const mapStateToProps = (state, ownProps) => {
  return {
    recordMap: state.recordStore.recordMap,
    schema: state.schemaStore.schema,
    requestingRecord: isRequestingRecord(state.recordStore.requesting, ownProps.schemaId, ownProps.id),
    requestingSchema: isRequestingSchema(state.schemaStore.requesting, ownProps.schemaId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    receiveRecord: (json) => receiveRecord(ownProps.schemaId, ownProps.id, json),
    fetchRecord: () => dispatch(fetchRecord(ownProps.schemaId, ownProps.id)),
    createRecord: (json) => dispatch(createRecord(ownProps.schemaId, ownProps.id, json)),
    updateRecord: (json) => dispatch(updateRecord(ownProps.schemaId, ownProps.id, json)),
    fetchSchema: () => dispatch(fetchSchema(ownProps.schemaId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Frm))
