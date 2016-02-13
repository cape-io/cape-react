import React from 'react'
import { render } from 'react-dom'
// Add the latest es2016+ stuff that we love.
import 'babel-polyfill'

import configureStore from './redux/configureStore'
// Root React component.
import Root from './containers/Root'

// Define our inital state object. This could be a fetch() to an API endpoint.
const initialState = window.__data || {}
// Configure and create our Redux store.
const store = configureStore(initialState)

// Define our destination where we insert our root react component.
const destEl = document.getElementById('root')

// The root component needs the Redux `store`.
render(<Root store={store} />, destEl)
