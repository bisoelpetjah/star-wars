import api from '../../config/api'

import {requestFetch, resolveFetch} from 'actions'

export function fetchPeopleList(url) {
  return dispatch => {
    dispatch(requestFetch())

    fetch(url ? url :`${api.baseUrl}/people/`, {
      headers: api.requestHeaders,
      method: 'GET'
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          dispatch(receivePeopleList(data.results, data.next))
          dispatch(resolveFetch(response.status))
        })
      } else {
        dispatch(resolveFetch(response.status))
      }
    })
  }
}

export const RECEIVE_PEOPLE_LIST = 'RECEIVE_PEOPLE_LIST'

export function receivePeopleList(people, next) {
  return {
    type: RECEIVE_PEOPLE_LIST,
    people
  }
}

export const END_PEOPLE_LIST = 'END_PEOPLE_LIST'

export function endPeopleList() {
  return {type: END_PEOPLE_LIST}
}

export const RESET_PEOPLE_LIST = 'RESET_PEOPLE_LIST'

export function resetPeopleList() {
  return {type: RESET_PEOPLE_LIST}
}
