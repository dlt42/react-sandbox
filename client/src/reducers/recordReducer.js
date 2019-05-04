import {
  SAVE_RECORD,
  SAVED_RECORD,
  REQUEST_RECORD,
  RECEIVE_RECORD,
  REQUEST_RECORD_LIST,
  RECEIVE_RECORD_LIST
} from 'Actions'

import { anyDifference } from 'DataUtil'
import RequestDetails from 'RequestDetails'

const initialRecordState = {
  recordMap: {},
  requesting: []
}

function recordReducer (state = initialRecordState, action) {
  var requestDetails
  switch (action.type) {
    case REQUEST_RECORD_LIST:
      requestDetails = new RequestDetails({
        schemaId: action.schemaId,
        listId: action.listId,
        type: 'listRecord'
      })
      return {
        ...state,
        requesting: [
          ...state.requesting.filter(item => !item.equals(requestDetails)),
          requestDetails
        ]
      }
    case RECEIVE_RECORD_LIST:
      requestDetails = new RequestDetails({
        schemaId: action.schemaId,
        listId: action.listId,
        type: 'listRecord'
      })
      return {
        ...state,
        recordMap: {
          ...state.recordMap,
          [action.schemaId]: {
            ...state.recordMap[action.schemaId],
            [action.listId]: action.list || []
          }
        },
        requesting: state.requesting.filter(item => !item.equals(requestDetails))
      }
    case REQUEST_RECORD:
      requestDetails = new RequestDetails({
        schemaId: action.schemaId,
        id: action.id,
        type: 'record'
      })
      return {
        ...state,
        recordMap: {
          ...state.recordMap,
          [action.schemaId]: state.recordMap[action.schemaId]
            ? state.recordMap[action.schemaId]
            : {}
        },
        requesting: [
          ...state.requesting.filter(item => !item.equals(requestDetails)),
          requestDetails
        ]
      }
    case RECEIVE_RECORD:
      requestDetails = new RequestDetails({
        schemaId: action.schemaId,
        id: action.id,
        type: 'record'
      })
      return {
        ...state,
        recordMap: {
          ...state.recordMap,
          [action.schemaId]: {
            ...state.recordMap[action.schemaId],
            'record': [
              ...state.recordMap[action.schemaId].record
                ? state.recordMap[action.schemaId].record.filter(item => item.id !== action.id)
                : [],
              action.record
            ]
          }
        },
        requesting: state.requesting.filter(item => !item.equals(requestDetails))
      }
    case SAVE_RECORD:
      requestDetails = new RequestDetails({
        schemaId: action.schemaId,
        id: action.id,
        type: 'saveRecord'
      })
      return {
        ...state,
        recordMap: {
          [action.schemaId]: {
            'record': [
              ...state.recordMap[action.schemaId].record
                ? state.recordMap[action.schemaId].record.filter(item => item.id !== action.id)
                : [],
              action.record
            ]
          }
        },
        requesting: [
          ...state.requesting.filter(item => !item.equals(requestDetails)),
          requestDetails
        ]
      }
    case SAVED_RECORD:
      requestDetails = new RequestDetails({
        schemaId: action.schemaId,
        id: action.id,
        type: 'saveRecord'
      })
      return {
        ...state,
        requesting: state.requesting.filter(item => !item.equals(requestDetails))
      }
    default:
      return state
  }
}

export const isRequestingRecord = (requesting, schemaId, id) => {
  const requestDetails = new RequestDetails({ schemaId: schemaId, id: id, type: 'record' })
  const result = requesting.filter(item => item.equals(requestDetails))
  return result && result.length > 0
}

export const isRequestingRecordList = (requesting, schemaId, listId) => {
  const requestDetails = new RequestDetails({ schemaId: schemaId, listId: listId, type: 'listRecord' })
  const result = requesting.filter(item => item === schemaId)
  return result && result.length > 0
}

export const getRecord = (recordMap, schemaId, id) => {
  const result = recordMap[schemaId] && recordMap[schemaId].record ? recordMap[schemaId].record.filter(item => item.id === id) : null
  return result && result.length > 0 ? result[0] : null
}

export const isRecordDifferent = (recordMap, schemaId, id,  recordMapB) => {
  return anyDifference(recordMap, recordMapB, [schemaId], (a, b) => {
    a = a && a.record ? a.record.filter(item => item.id === id) : null
    b = b && b.record ? b.record.filter(item => item.id === id) : null
    return (a && a.length > 0 ? a[0] : null) !== (b && b.length > 0 ? b[0] : null)
  })
}

export const isRecordListDifferent = (recordList, otherRecordList) => {
  return recordList !== otherRecordList
}

export const getRecordList = (recordMap, schemaId, listId) => {
  return recordMap[schemaId] ? recordMap[schemaId][listId] : null
}

export default recordReducer
