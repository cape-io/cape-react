import tape from 'tape'
import reducer, { setUserId } from '../src/redux/auth'

tape('setUserId action', assert => {
  const state = reducer(undefined, setUserId('kai-curry'))
  assert.equals(state.user.userId, 'kai-curry', 'userId is set correctly')
  assert.end()
})
