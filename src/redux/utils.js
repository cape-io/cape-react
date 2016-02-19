import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import isObject from 'lodash/isObject'

export function createAction(type) {
  return function actionCreator(payload, isError, meta) {
    const action = {
      type,
    }
    if (isError) {
      action.error = true
      action.payload = isString(payload) ? { message: payload } : payload
    }
    else if (!isUndefined(payload)) action.payload = payload
    if (isObject(meta)) {
      action.meta = meta
    }
    return action
  }
}
