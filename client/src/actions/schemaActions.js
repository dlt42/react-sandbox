import React from 'react'
import axios from 'axios'

export const REQUEST_SCHEMA = 'REQUEST_SCHEMA'
function requestSchema (schemaId) {
  return {
    type: REQUEST_SCHEMA,
    schemaId
  }
}

export const RECEIVE_SCHEMA = 'RECEIVE_SCHEMA'
function receiveSchema (schemaId, json) {
  return {
    type: RECEIVE_SCHEMA,
    schemaId,
    schema: json
  }
}

export function fetchSchema (schemaId) {
  return function (dispatch) {
    dispatch(requestSchema())
    return axios.get(`/data/schema/${schemaId}.json`)
      .then(
        response => dispatch(receiveSchema(schemaId, response.data)),
        error => console.log('An error occurred.', error)
      )
  }
}

export const REQUEST_SCHEMA_LIST = 'REQUEST_SCHEMA_LIST'
function requestSchemaList () {
  return {
    type: REQUEST_SCHEMA_LIST
  }
}

export const RECEIVE_SCHEMA_LIST = 'RECEIVE_SCHEMA_LIST'
function receiveSchemaList (json) {
  return {
    type: RECEIVE_SCHEMA_LIST,
    schemaList: json.schemaList
  }
}

export function fetchSchemaList () {
  return function (dispatch) {
    dispatch(requestSchemaList())
    return axios.get(`/data/schemaList.json`)
      .then(
        response => dispatch(receiveSchemaList(response.data)),
        error => console.log('An error occurred.', error)
      )
  }
}
