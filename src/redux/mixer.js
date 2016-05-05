import { onSubmit } from 'redux-field'
import { createObjectPrefix, createSubjectPrefix } from './select/mixer'

// Create a new triple. Predicate is used as default type on backend.
export function createNewField(subjectId, predicate, type) {
  console.log(subjectId, predicate, type)
  return onSubmit(createObjectPrefix(subjectId), { type, predicate })
}
export function createNewSubject(objectId, predicate, type) {
  return onSubmit(createSubjectPrefix(objectId), { type, predicate })
}
