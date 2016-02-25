import identity from 'lodash/identity'
import isError from 'lodash/isError'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import isObject from 'lodash/isObject'
import pickBy from 'lodash/pickBy'


export function createAction(type, payloadCreator) {
  const getPayload = isFunction(payloadCreator) ? payloadCreator : identity
  return function actionCreator(arg1, arg2, arg3) {
    const payload = getPayload(arg1)
    const hasError = arg2 === true
    const meta = isObject(arg2) ? arg2 : arg3
    const action = {
      type,
    }
    if (isError(payload)) {
      action.error = true
      action.payload = pickBy(payload, (val) => identity(val) && !isFunction(val))
    } else if (hasError) {
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
