import React, { PropTypes } from 'react'

// Top level "router". Heh.

// It just uses a specific component given a prop value.
// Less declaritive perhaps but really easy to reason about.
// You can use this concept anywhere!

// Import all possible component options.
import Home from './Home'

// Create a nice object with key as matching prop value.
const routeIndex = {
  // routeId `home` will render the `Home` component.
  home: Home,
}

// You could also use a function with switch (or whatever) if you prefer.
// How fancy is that?!
// function getRouteComponent(id) {
//   switch (id) {
//     case 'home':
//       return Home
//     default:
//       return Home
//   }
// }

function Router(props) {
  // Define the prop that defines what component to render.
  const { routeId } = props
  // Select your component from the routeIndex defined above.
  // Provide default Component if there is no match.
  const MainElement = routeIndex[routeId] || Home
  // Render that component. Send along any props this component got.
  return <MainElement {...props} />
}

Router.propTypes = {
  routeId: PropTypes.string.isRequired,
}
export default Router
