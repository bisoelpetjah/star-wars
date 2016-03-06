import {SET_PEOPLE_LIST, SET_PEOPLE_LIST_NEXT, END_PEOPLE_LIST, RESET_PEOPLE_LIST, SET_CURRENT_PERSON, RESET_CURRENT_PERSON, LIKE_PERSON, DISLIKE_PERSON} from 'actions'

const initialState = {
  list: [],
  next: null,
  eol: false,
  currentPerson: null
}

export default function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PEOPLE_LIST:
      return Object.assign({}, state, {list: state.list.concat(action.people)})
    case SET_PEOPLE_LIST_NEXT:
      return Object.assign({}, state, {next: action.next})
    case END_PEOPLE_LIST:
      return Object.assign({}, state, {eol: true})
    case RESET_PEOPLE_LIST:
      return Object.assign({}, initialState)
    case SET_CURRENT_PERSON:
      return Object.assign({}, state, {currentPerson: action.person})
    case RESET_CURRENT_PERSON:
      return Object.assign({}, state, {currentPerson: null})
    case LIKE_PERSON:
      return Object.assign({}, state, {list: state.list.map(person => {
        if (person.url == action.url) person.like++
        return person
      })})
    case DISLIKE_PERSON:
      return Object.assign({}, state, {list: state.list.map(person => {
        if (person.url == action.url) person.dislike++
        return person
      })})
    default:
      return state
  }
}
