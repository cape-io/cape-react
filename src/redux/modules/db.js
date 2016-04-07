const UPDATE_TITLE = 'db/UPDATE_TITLE'

const defaultState = {
  title: 'Default Title',
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return { ...state, title: action.payload }
    default:
      return state
  }
}

export function updateTitle(value) {
  return {
    type: UPDATE_TITLE,
    payload: value,
  }
}
