import { actionTypes } from 'redux-form'
const { BLUR, CHANGE } = actionTypes


// Auto fetch embed info when added to a form.
export default store => next => action => {
  switch (action.type) {
    case BLUR:
    case CHANGE:
      const { value, field } = action
      // Check to see if it's an embed.
      if (field.split('.').pop() === 'embed') {
        // console.log(value)
      }
      break
    default:
  }
  return next(action)
}
