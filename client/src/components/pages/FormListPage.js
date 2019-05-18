import React from 'react'
import PropTypes from 'prop-types'
import { PageContainer } from 'Pages'
import { FormList } from 'List'

const FormListPage = (props) =>
  <PageContainer secure={true}>
    <FormList />
  </PageContainer>

FormListPage.propTypes = {
}

export default FormListPage
