import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Component from '../components/Home'
import { isAuthenticated } from '../redux/auth'

const homeSelector = createSelector(
  isAuthenticated,
  authenticated => ({ authenticated })
)

export default connect(homeSelector)(Component)
