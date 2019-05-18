import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import socketIOClient from "socket.io-client"
import PageRoutes from './navigation/PageRoutes'
import config from 'Config'

class Root extends Component {
  componentDidMount() {
    const socket = socketIOClient(config.endpoint);
    socket.on("FromAPI", (data) => {
			// TODO: Do something with data
			// console.log(data)
    })
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