import React from 'react'
import { render } from 'react-dom'
// Describe what babel polyfill does.
import 'babel-polyfill'

// Root React component.
import Root from './containers/Root'
import configureStore from './redux/configureStore'

// Define our inital state object. This could be a fetch() to an API endpoint.
const initialState = window.__data || {}
// Configure and create our Redux store.
const store = configureStore(initialState)

// Define our destination where we insert our root react component.
const destEl = document.getElementById('root')
// The root component only needs the Redux store as a prop.
render(<Root store={store} />, destEl)
