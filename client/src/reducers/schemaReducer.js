import {
  REQUEST_SCHEMA_LIST,
  RECEIVE_SCHEMA_LIST,
  REQUEST_SCHEMA,
  RECEIVE_SCHEMA
} from 'Actions'

import RequestDetails from 'RequestDetails'

const initialSchemaState = {
  schemaList: [],
  schema: {},
  requesting: []
}

function schemaReducer (state = initialSchemaState, action) {
  var requestDetails
  switch (action.type) {
    case REQUEST_SCHEMA_LIST:
      requestDetails = new RequestDetails({
        type: 'schemaList'
      })
      return {
        ...state,
        requesting: [
          ...state.requesting.filter(item => !item.equals(requestDetails)),
          requestDetails
        ]
      }
    case RECEIVE_SCHEMA_LIST:
      requestDetails = new RequestDetails({
        type: 'schemaList'
      })
      return {
        ...state,
        schemaList: action.schemaList,
        requesting: state.requesting.filter(item => !item.equals(requestDetails))
      }
    case REQUEST_SCHEMA:
      requestDetails = new RequestDetails({
        type: 'schema',
        schemaId: action.schemaId
      })
      return {
        ...state,
        requesting: [
          ...state.requesting.filter(item => !item.equals(requestDetails)),
          requestDetails
        ]
      }
    case RECEIVE_SCHEMA:
      requestDetails = new RequestDetails({
        type: 'schema',
        schemaId: action.schemaId
      })
      return {
        ...state,
        schema: {
          ...state.schema,
          [action.schemaId]: action.schema
        },
        requesting: state.requesting.filter(item => !item.equals(requestDetails))
      }
    default:
      return state
  }
}

export const isRequestingSchemaList = (requesting) => {
  const requestDetails = new RequestDetails({ type: 'schemaList' })
  const result = requesting.filter(item => item.equals(requestDetails))
  return result && result.length > 0
}

export const isRequestingSchema = (requesting, schemaId) => {
  const requestDetails = new RequestDetails({ schemaId: schemaId, type: 'data' })
  const result = requesting.filter(item => item.equals(requestDetails))
  return result && result.length > 0
}

export const isSchemaDifferent = (schema, schemaId, otherSchema) => {
  return schema[schemaId] !== otherSchema[schemaId]
}

export const isSchemaListDifferent = (schemaList, otherSchemaList) => {
  return schemaList !== otherSchemaList
}


export default schemaReducer
