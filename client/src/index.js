import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import { rootReducer } from './reducers'
import './index.css'
import Root from './components/Root'
import { clearAuthToken } from 'Actions'
import 'bootstrap/dist/css/bootstrap.min.css'

// An interceptor to remove any stored authentication token if the server 
// sends an unauthenticated status
axios.interceptors.response.use(
	(response) => response, 
	(error) => {
    if (401 === error.response.status) {
      store.dispatch(clearAuthToken())
    } else {
      return Promise.reject(error);
    }
	}
)

// An interceptor to add the authentication token, if stored, to all serverrequests
axios.interceptors.request.use(
	(config) => {
  	const {
      token
    } = store.getState().authStore
  	if ( token != null ) {
    	config.headers.Authorization = `Token ${token}`
      console.log("Added token")
  	}
  	return config
	}, 
	(error) => {
  	return Promise.reject(error)
	}
)

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // Allows functions to be dispatched
    loggerMiddleware // Logs redux actions
  )
)

render(
  <Root store={store} />,
  document.getElementById('root')
)
