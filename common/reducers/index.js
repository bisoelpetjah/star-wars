import {combineReducers} from 'redux'
import requestReducer from 'reducers/request'

export default combineReducers({
  request: requestReducer
})
