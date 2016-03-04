import {combineReducers} from 'redux'
import requestReducer from 'reducers/request'
import peopleReducer from 'reducers/people'

export default combineReducers({
  request: requestReducer,
  people: peopleReducer
})
