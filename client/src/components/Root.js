import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import socketIOClient from "socket.io-client"

import PageRoutes from './navigation/PageRoutes'

class Root extends Component {
	constructor() {
    super()
    this.state = {
      endpoint: "http://127.0.0.1:4001"
    }
  }

  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", (data) => {
			// do something with data
			console.log(data)
    });
  }

  render() { 
  	const {
  		store 
  	} = this.props
  	return (
	  	<Provider store={store}>
	    	<Router>
	      	<PageRoutes />
	    	</Router>
	  	</Provider>
  	)
	}
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root