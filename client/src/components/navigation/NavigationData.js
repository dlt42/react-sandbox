import { matchPath } from 'react-router'

import { findNestedByAttribute } from 'DataUtil'

const navData = {
  pages: [{
    id: 'home',
    label: 'Home',
    link: { value: '/', isOverride: false },
    menu: true
  }, {
    id: 'formList',
    label: 'Form List',
    link: { value: '/form-list', isOverride: false },
    menu: true,
    pages: [{
      id: 'formListHelp',
      label: 'Form List Help',
      link: { value: '/form-list/help', isOverride: false },
      menu: true
    }]
  }, {
    id: 'dataList',
    label: 'Record List',
    link: { value: '/record-list/:schemaId/:listId', isOverride: false },
    menu: false
  }, {
    id: 'formNew',
    label: 'New Record',
    link: { value: '/form/:schemaId/:dataId/:instruction', isOverride: false },
    menu: false
  }, {
    id: 'form',
    label: 'Record',
    link: { value: '/form/:schemaId/:dataId', isOverride: false },
    menu: false
  }, {
    id: 'notFound',
    label: 'Resource Not Found',
    link: { value: '*', isOverride: true },
    menu: false
  }],
  label: 'Content',
  id: 'home',
  variant: 'default'
}

class NavigationData {
  constructor (data = navData) {
    this.data = data
  }

  getPage (link, override) {
    return findNestedByAttribute(this.data, link, 'pages', 'link', (value, link) => {
      return (!link.isOverride ||  override === link.value) && matchPath(value, {
        path: link.value,
        exact: true,
        strict: false
      }) 
    })
  }

  getPages () {
    return this.data.pages
  }

  getMenuLabel () {
    return this.data.label
  }

  getMenuVariant () {
    return this.data.variant
  }
}

export default new NavigationData()
