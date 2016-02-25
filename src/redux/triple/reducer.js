import get from 'lodash/get'
import set from 'lodash/set'
import { DEL, PUT } from './actions'
const defaultState = {
  spo: {},
  sop: {},
  osp: {},
  ops: {},
  pos: {},
  pso: {},
}

// function addSPO(state, subj) {
// Use lodash forEach here instead of for in.
//   for (var subject in subj) {
//     if (subj.hasOwnProperty(subject)) {
//       var pred = subj[subject];
//       for (var predicate in pred) {
//         if (pred.hasOwnProperty(predicate)) {
//           var obj = pred[predicate];
//           for (var object in obj) {
//             if (obj.hasOwnProperty(object)) {
//               var val = obj[object];
//               add(state, [subject, predicate, object, val]);
//             }
//           }
//         }
//       }
//     }
//   }
// }

function del(state, triple) {
  const [ sub, pred, obj ] = triple
  // Check if this is a valid triple.
  const isValid = get(state.spo, [ sub, pred, obj ], false)
  if (isValid) {
    // @TODO Cleanup the tree if it's without a third level.
    delete this.spo[sub][pred][obj]
    delete this.sop[sub][obj][pred]
    delete this.pso[pred][sub][obj]
    delete this.pos[pred][obj][sub]
    delete this.osp[obj][sub][pred]
    delete this.ops[obj][pred][sub]
  }
  return {
    ...state,
  }
}

function put(state, triple) {
  const [ sub, pred, obj ] = triple.id
  // Store the full triple obj on the spo.
  set(state.spo, [ sub, pred, obj ], triple)
  // Everything else is just an index.
  set(state.sop, [ sub, obj, pred ], true)
  set(state.osp, [ obj, sub, pred ], true)
  set(state.ops, [ obj, pred, sub ], true)
  set(state.pos, [ pred, obj, sub ], true)
  set(state.pso, [ pred, sub, obj ], true)
  return {
    ...state,
  }
}
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case DEL:
      return del(state, action.payload)
    case PUT:
      return put(state, action.payload)
    default:
      return state
  }
}
