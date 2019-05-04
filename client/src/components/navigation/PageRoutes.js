import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

import { MenuContainer } from 'Menu'
import {
  HomePage,
  FormListPage,
  FormListHelpPage,
  RecordListPage,
  FormPage,
  Error404Page
} from 'Pages'

import './PageRoutes.scss'

const PageRoutes = (props) =>
  <div className='view'>
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/form-list' exact component={FormListPage} />
      <Route path='/form-list/help' component={FormListHelpPage} />
      <Route path='/record-list/:schemaId/:listId' component={RecordListPage} />
      <Route path='/form/:schemaId/:id/:instruction' component={FormPage} />
      <Route path='/form/:schemaId/:id' component={FormPage} />
      <Route component={Error404Page} />
    </Switch>
    <Route path='*' component={MenuContainer} />
  </div>

PageRoutes.propTypes = {}

export default PageRoutes
