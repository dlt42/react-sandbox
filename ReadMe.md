## About

The intention of this project is to provide an example architecture for delivering a form based application in which:

* Schema define the structure of each form
* Forms can show related records
* Fields can link to configured records
* CRUD operations can be performed on records
* Navigation is managed by application configuration and form schema
* Permissions are managed by a combination of role, ownership, and data driven rules
* Real time updates are displayed
* Visualisations present pertinent information
* The database is not directly accessible by the client

The client is developed using React in which:
* Style and presentatin is delivered via Sass, Bootstrap and React Icons
* State is managed by Redux and Redux Thunk
* Visualisations are created using D3
* Forms are rendered using react-jsonschema-form
* The client is delivered using Webpack
* Babel is used to convert ES6 for cross browser compatibility
* Socket.io Client for websocket updates from the server
* Axios for REST communication with the server

The server is comprised of Node.js running:
* Express as the web application framework
* Socket.io for websocket updates to the client
* Axios for REST communication with the database
* Cors to allow the client to access the server

The database is provided by JSON Server


[JSON Schema](https://json-schema.org/) will be used for form definition and [react-jsonschema-form](https://react-jsonschema-form.readthedocs.io/en/latest/) with template customisation will be used for form generation.


## Prerequisites

Requires the installation of:
* [Node.js with bundled npm](https://nodejs.org/en/)

Navigate to the client and server directories in turn and run:

### `npm install`


## Client Scripts

From the client directory the following can be run:

### `npm start`

Runs the client application in development mode, which can be accessed at [http://localhost:3000](http://localhost:3000).

## Server Scripts

### `npm start`

Runs the Node server on port 4001

### `npm run data`

Runs [JSON Server](https://github.com/typicode/json-server) on port 3001 against the file `data/data.json`, providing a JSON store for application data.

