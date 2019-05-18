import { matchPath } from 'react-router'
import { findNestedByAttribute } from 'DataUtil'

const navItem = (id, label, linkValue, linkIsOverride, menu, pages) => {
  return {
    id: id,
    label: label,
    link: { 
      value: linkValue, 
      isOverride: linkIsOverride 
    },
    menu: menu,
    pages: pages
  }
}

const navData = {
  label: 'Content',
  id: 'home',
  variant: 'default',
  pages: [
    navItem('home', 'Home', '/', false, true, null),
    navItem('formList', 'Form List', '/form-list', false, true, [
      navItem('formListHelp', 'Form List Help', false, true, null)
    ]),
    navItem('dataList', 'Record List', '/record-list/:schemaId/:listId', false, false, null),
    navItem('formNew', 'New Record', '/form/:schemaId/:dataId/:instruction', false, false, null),
    navItem('form', 'Record', '/form/:schemaId/:dataId', false, false, null),
    navItem('notFound', 'Resource Not Found', '*', true, false, null),
    navItem('login', 'Login', '/login', false, false, null),
    navItem('signup', 'Sign Up', '/signup', false, false, null)
  ]  
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
