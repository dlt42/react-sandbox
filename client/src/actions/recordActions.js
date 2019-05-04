import React from 'react'
import axios from 'axios'

export const SAVE_RECORD = 'SAVE_RECORD'
const saveRecord = (schemaId, id, record) => ({
  type: SAVE_RECORD,
  schemaId,
  id,
  record
})

export const SAVED_RECORD = 'SAVED_RECORD'
const savedRecord = (schemaId, id) => ({
  type: SAVED_RECORD,
  schemaId,
  id
})

export function createRecord (schemaId, id, record) {
  return persistRecord(schemaId, id, record, "post", `http://localhost:4001/record/${schemaId}`)
}

export function updateRecord (schemaId, id, record) {
  return persistRecord(schemaId, id, record, "put", `http://localhost:4001/record/${schemaId}/${id}`)
}

function persistRecord (schemaId, id, record, method, url) {
  return function (dispatch) {
    dispatch(saveRecord(schemaId, id, record))
    return axios({
        method: method,
        url: url,
        data: JSON.stringify(record),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        } 
      })
      .then(
        response => dispatch(savedRecord(schemaId, id)),
        error => console.log('An error occurred.', error)
      )
  }
}

export const REQUEST_RECORD = 'REQUEST_RECORD'
function requestRecord (schemaId, id) {
  return {
    type: REQUEST_RECORD,
    schemaId,
    id
  }
}

export const RECEIVE_RECORD = 'RECEIVE_RECORD'
export function receiveRecord (schemaId, id, json) {
  return {
    type: RECEIVE_RECORD,
    schemaId,
    id,
    record: (json || { id: id, schemaId: schemaId, label: 'Record not found' })
  }
}

export function fetchRecord (schemaId, id) {
  return function (dispatch) {
    dispatch(requestRecord(schemaId, id))
    return axios({
        method: "get",
        url: `http://localhost:4001/record/${schemaId}/${id}` 
      })
      .then(
        response => dispatch(receiveRecord(schemaId, id, response.data.record)),
        error => console.log('An error occurred.', error)
      )
  }
}

export const REQUEST_RECORD_LIST = 'REQUEST_RECORD_LIST'
function requestRecordList (schemaId, listId) {
  return {
    type: REQUEST_RECORD_LIST,
    schemaId,
    listId
  }
}

export const RECEIVE_RECORD_LIST = 'RECEIVE_RECORD_LIST'
function receiveRecordList (schemaId, listId, json) {
  return {
    type: RECEIVE_RECORD_LIST,
    list: json || [],
    schemaId,
    listId
  }
}

export function fetchRecordList (schemaId, listId) {
  return function (dispatch) {
    dispatch(requestRecordList(schemaId, listId))
    return axios({
        method: "get",
        url: `http://localhost:4001/record/${schemaId}` 
      })
      .then(
        response => dispatch(receiveRecordList(schemaId, listId, response.data.list)),
        error => console.log('An error occurred.', error)
      )
  }
}
