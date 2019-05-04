const express = require("express")
const router = express.Router()
const axios = require("axios")

router.route("/record/:schemaId")
	.post((req, res) => {
		const {
			schemaId
		} = req.params

		// post - `http://localhost:3001/${schemaId}
		console.log(`schemaId: ${schemaId}`)

		axios({
        method: "post",
        url: `http://localhost:3001/${schemaId}`,
        data: req.body
      })
      .then(
        response => {
        	res
	  				.status(200)
	  				.json({
	  					message: "Record created" 
	  				})
	  		},
        error => console.log('An error occurred.', error)
      )
	})
	.get((req, res) => {
		const {
			schemaId
		} = req.params

		// get - `http://localhost:3001/${schemaId}
		console.log(`schemaId: ${schemaId}`)
		
		axios({
        method: "get",
        url: `http://localhost:3001/${schemaId}` 
      })
      .then(
        response => {
        	res
	  				.status(200)
	  				.json({
	  					list: response.data,
	  					message: "Record list retrieved" 
	  				})
	  		},
        error => console.log('An error occurred.', error)
      )
	})

router.route("/record/:schemaId/:id")
	.put((req, res) => {
		const {
			schemaId,
			id
		} = req.params

		// put - `http://localhost:3001/${schemaId}/${id}
		console.log(`schemaId: ${schemaId} / id: ${id}`)

		axios({
      method: "put",
      url: `http://localhost:3001/${schemaId}/${id}`,
      data: req.body
    })
    .then(
      response => {
      	res
  				.status(200)
  				.json({
  					message: "Record updated" 
  				})
  		},
      error => console.log('An error occurred.', error)
    )
	})
	.get((req, res) => {
		const {
			schemaId,
			id
		} = req.params

		// get - `http://localhost:3001/${schemaId}/${id}
		console.log(`schemaId: ${schemaId} / id: ${id}`)

	  axios({
      method: "get",
      url: `http://localhost:3001/${schemaId}/${id}` 
    })
    .then(
      response => {
      	res
  				.status(200)
  				.json({
  					record: response.data,
  					message: "Record retrieved" 
  				})
  		},
      error => console.log('An error occurred.', error)
    )
	})

module.exports = router