import React from 'react'
import { render } from 'react-dom'
// Add the latest es2016+ stuff that we love.
import 'babel-polyfill'
// Simple bindings to keep react-router and redux in sync.
import { syncReduxAndRouter } from 'redux-simple-router'
// Easily manage session history.
import { createHistory } from 'history'
// Enhance your history object with a scroll behavior.
// https://github.com/rackt/scroll-behavior
// Attempts to imitate native browser scroll behavior.
import useScroll from 'scroll-behavior/lib/useStandardScroll'
// Init our history object for use by router.
const history = useScroll(createHistory)()

// Define our inital state object. This could be a fetch() to an API endpoint.
const initialState = window.__data || {}
// Configure and create our Redux store.
const store = configureStore(initialState)

// Save the current URL string to redux state and keep it updated.
syncReduxAndRouter(history, store)

// Root React component.
import Root from './containers/Root'
import configureStore from './redux/configureStore'

// Define our destination where we insert our root react component.
const destEl = document.getElementById('root')

// The root component needs the Redux `store` and router history as props.
render(<Root store={store} history={history} />, destEl)
