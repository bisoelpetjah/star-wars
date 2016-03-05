import {RECEIVE_PEOPLE_LIST, END_PEOPLE_LIST, RESET_PEOPLE_LIST, RECEIVE_CURRENT_PERSON, RESET_CURRENT_PERSON} from 'actions'

const initialState = {
  list: [],
  next: null,
  eol: false,
  currentPerson: null
}

export default function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_PEOPLE_LIST:
      return Object.assign({}, state, {
        list: state.list.concat(action.people),
        next: action.next
      })
    case END_PEOPLE_LIST:
      return Object.assign({}, state, {eol: true})
    case RESET_PEOPLE_LIST:
      return Object.assign({}, initialState)
    case RECEIVE_CURRENT_PERSON:
      return Object.assign({}, state, {currentPerson: action.person})
    case RESET_CURRENT_PERSON:
      return Object.assign({}, state, {currentPerson: null})
    default:
      return state
  }
}
