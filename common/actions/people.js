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
          if (!data.next && data.previous) dispatch(endPeopleList())
          dispatch(resolveFetch(response.status))
        })
      } else {
        dispatch(resolveFetch(response.status))
      }
    })
  }
}

export function fetchCurrentPerson(url) {
  return dispatch => {
    dispatch(requestFetch())

    fetch(url, {
      headers: api.requestHeaders,
      method: 'GET'
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          dispatch(receiveCurrentPerson(data))
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
    people,
    next
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

export const RECEIVE_CURRENT_PERSON = 'RECEIVE_CURRENT_PERSON'

export function receiveCurrentPerson(person) {
  return {
    type: RECEIVE_CURRENT_PERSON,
    person
  }
}

export const RESET_CURRENT_PERSON = 'RESET_CURRENT_PERSON'

export function resetCurrentPerson() {
  return {type: RESET_CURRENT_PERSON}
}
