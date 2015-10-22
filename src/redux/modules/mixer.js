const LOAD = 'mixer/LOAD';
const LOAD_SUCCESS = 'mixer/LOAD_SUCCESS';
const LOAD_FAIL = 'mixer/LOAD_FAIL';

const initialState = {
  loaded: false,
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadInfo'),
  };
}

const UPDATE = 'mixer/UPDATE';
const UPDATE_SUCCESS = 'mixer/UPDATE_SUCCESS';
const UPDATE_FAIL = 'mixer/UPDATE_FAIL';

export function updateMe(id, data) {
  const url = `http://kc.l:3031/api/content/me/${id}`;
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.put(url).send(data),
  };
}
