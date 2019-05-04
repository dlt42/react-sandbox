import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import { rootReducer } from './reducers'
import './index.css'
import Root from './components/Root'

import 'bootstrap/dist/css/bootstrap.min.css'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // allows functions to be dispatched
    loggerMiddleware // logs actions
  )
)

render(
  <Root store={store} />,
  document.getElementById('root')
)
