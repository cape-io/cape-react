const LOAD = 'mixer/LOAD';
const LOAD_SUCCESS = 'mixer/LOAD_SUCCESS';
const LOAD_FAIL = 'mixer/LOAD_FAIL';
const UPDATE = 'mixer/UPDATE';

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
    case UPDATE:
      let groupState = state[action.meta.groupId] || {};
      groupState = {
        ...groupState,
        [action.meta.typeId]: action.payload,
      };
      return {
        ...state,
        [action.meta.groupId]: groupState,
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

function handleUpdateMe({data, groupId, typeId}) {
  return {
    type: UPDATE,
    payload: data,
    meta: {groupId, typeId},
  };
}

export function updateMe(groupId, typeId, data) {
  return (dispatch, getState) => {
    // Dispatch route update?
    // dispatch({type: SEND_TOKEN});
    const record = {
      ...data,
      userId: getState().auth.user.name,
    };
    // Run async call.
    const options = {
      method: 'put',
      body: JSON.stringify(record),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    function handleResponse(resp) {
      return dispatch(handleUpdateMe({record, groupId, typeId, resp}));
    }
    fetch(`http://kc.l:3031/api/content/me/${groupId}/${typeId}`, options)
      .then((response) => response.json())
      .then(handleResponse)
      .catch(handleResponse);
  };
}
