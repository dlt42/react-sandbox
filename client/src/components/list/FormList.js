import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PageContainer } from 'Pages'
import { fetchSchemaList } from 'Actions'
import { anyDifference } from 'DataUtil'
import { isRequestingSchemaList } from 'Reducers'

class FormList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requesting: true
    }
  }

  componentDidMount () {
    const {
      schemaList,
      fetchSchemaList,
      requesting
    } = this.props
    if (!requesting && !(schemaList && schemaList.length)) {
      fetchSchemaList()
    } else {
      this.setState({
        schemaList: schemaList,
        requesting: requesting
      })
    }
  }

  componentDidUpdate (prevProps) {
    if (anyDifference(this.props, prevProps, ['schemaList'])) {
      const {
        schemaList,
        requesting
      } = this.props
      this.setState({
        schemaList: schemaList,
        requesting: requesting
      })
    }
  }

  render () {
    const {
      schemaList,
      requesting
    } = this.state
    return (
      <div className="form-list">
        { 
          (requesting || !schemaList) ? (
            <p>Loading</p>
          ) : schemaList.map((schema, index) => {
            return (
              <p key={index}>
                <Link to={`record-list/${schema.id}/${schema.id}List`}>
                  {schema.name}
                </Link>
              </p>
            )
          })
        }
      </div>
    )
  }
}

FormList.propTypes = {
}

const mapStateToProps = state => {
  return {
    schemaList: state.schemaStore.schemaList,
    requesting: isRequestingSchemaList(state.schemaStore.requesting)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSchemaList: () => dispatch(fetchSchemaList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormList)
