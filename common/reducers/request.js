import {REQUEST_FETCH, RESOLVE_FETCH, RESET_FETCH_STATUS} from 'actions'

export default function requestReducer(state = {
  isFetching: false,
  status: null
}, action) {
  switch (action.type) {
    case REQUEST_FETCH:
      return Object.assign({}, state, {
        isFetching: true,
        status: null
      })
    case RESOLVE_FETCH:
      return Object.assign({}, state, {
        isFetching: false,
        status: action.status
      })
    case RESET_FETCH_STATUS:
      return {
        isFetching: false,
        status: null
      }
    default:
      return state
  }
}
