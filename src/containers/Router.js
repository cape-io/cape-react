import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
// Top level "router". Heh.
import * as routeIndex from './RouteComponents'

// It just uses a specific component given a prop value.
// Less declaritive perhaps but really easy to reason about.
// You can use this concept anywhere!

function Router(props) {
  // Define the prop that defines what component to render.
  const { loading, route: { id } } = props
  if (loading) {
    return <routeIndex.loading />
  }
  // Select your component from the routeIndex defined above.
  // console.log('routeId', id)
  // Provide default Component if there is no match.
  const MainElement = get(routeIndex, id, routeIndex.home)
  // Render that component. Send along any props this component got.
  return <MainElement {...props} />
}

Router.propTypes = {
  loading: PropTypes.bool.isRequired,
  route: PropTypes.object.isRequired,
}
function mapStateToProps(state, ownProps) {
  const { route: { isLoading } } = ownProps
  return {
    loading: isFunction(isLoading) && isLoading(state),
  }
}
export default connect(mapStateToProps)(Router)
