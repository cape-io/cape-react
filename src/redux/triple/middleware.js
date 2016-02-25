import graph, { tripleData } from './graph'
import { DEL, PUT } from './actions'
// Save triple actions to graph database.
export default () => next => action => {
  switch (action.type) {
    case DEL:
      // graph.del(tripleData(action.payload))
      break
    case PUT:
      const vert = tripleData(action.payload)
      console.log(vert)
      // graph.put(vert)
      break
    default:
      break
  }
  next(action)
}
