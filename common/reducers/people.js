import {RECEIVE_PEOPLE_LIST, END_PEOPLE_LIST, RESET_PEOPLE_LIST} from 'actions'

const initialState = {
  page: 1,
  list: [],
  eol: false
}

export default function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_PEOPLE_LIST:
      return Object.assign({}, state, {
        list: action.people,
        page: state.page + 1
      })
    case END_PEOPLE_LIST:
      return Object.assign({}, state, {eol: true})
    case RESET_PEOPLE_LIST:
      return Object.assign({}, initialState)
    default:
      return state
  }
}
