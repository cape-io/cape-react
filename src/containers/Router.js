import React, { PropTypes } from 'react'

// Top level "router". Heh.
import * as routeIndex from './RouteComponents'

// It just uses a specific component given a prop value.
// Less declaritive perhaps but really easy to reason about.
// You can use this concept anywhere!

function Router(props) {
  // Define the prop that defines what component to render.
  const { route: { id } } = props
  // Select your component from the routeIndex defined above.
  // console.log('routeId', id)
  // Provide default Component if there is no match.
  const MainElement = routeIndex[id] || routeIndex['home']
  // Render that component. Send along any props this component got.
  return <MainElement {...props} />
}

Router.propTypes = {
  history: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}
export default Router
