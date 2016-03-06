import api from '../../config/api'
import Firebase from 'firebase'

import {requestFetch, resolveFetch} from 'actions'

const firebase = new Firebase(api.firebaseUrl)

export function fetchPeopleList(url) {
  return dispatch => {
    dispatch(requestFetch())

    let status = 0
    return fetch(url ? url :`${api.baseUrl}/people/`, {
      headers: api.requestHeaders,
      method: 'GET'
    }).then(response => {
      status = response.status
      return response.json()
    }).then(data => {
      dispatch(setPeopleListNext(data.next))
      if (!data.next && data.previous) dispatch(endPeopleList())
      return retrieveLikeDislike(data.results)
    }).then(people => {
      dispatch(setPeopleList(people))
      dispatch(resolveFetch(status))
    })
  }
}

export function fetchCurrentPerson(url) {
  return dispatch => {
    dispatch(requestFetch())

    let status = 0
    return fetch(url, {
      headers: api.requestHeaders,
      method: 'GET'
    }).then(response => {
      status = response.status
      return response.json()
    }).then(data => {
      return retrieveLikeDislike([data])
    }).then(people => {
      dispatch(setCurrentPerson(people[0]))
      dispatch(resolveFetch(status))
    })
  }
}

export function fetchLikePerson(url, likeCount) {
  return dispatch => {
    dispatch(likePerson(url))
    saveLike(url, likeCount)
  }
}

export function fetchDislikePerson(url, dislikeCount) {
  return dispatch => {
    dispatch(dislikePerson(url))
    saveDislike(url, dislikeCount)
  }
}

export const SET_PEOPLE_LIST = 'SET_PEOPLE_LIST'

export function setPeopleList(people) {
  return {
    type: SET_PEOPLE_LIST,
    people
  }
}

export const SET_PEOPLE_LIST_NEXT = 'SET_PEOPLE_LIST_NEXT'

export function setPeopleListNext(next) {
  return {
    type: SET_PEOPLE_LIST_NEXT,
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

export const SET_CURRENT_PERSON = 'SET_CURRENT_PERSON'

export function setCurrentPerson(person) {
  return {
    type: SET_CURRENT_PERSON,
    person
  }
}

export const RESET_CURRENT_PERSON = 'RESET_CURRENT_PERSON'

export function resetCurrentPerson() {
  return {type: RESET_CURRENT_PERSON}
}

export const LIKE_PERSON = 'LIKE_PERSON'

export function likePerson(url) {
  return {
    type: LIKE_PERSON,
    url
  }
}

export const DISLIKE_PERSON = 'DISLIKE_PERSON'

export function dislikePerson(url) {
  return {
    type: DISLIKE_PERSON,
    url
  }
}

function getIdFromUrl(url) {
  let urlSplit = url.split('/')
  return urlSplit[urlSplit.length - 2]
}

function saveLike(url, likeCount) {
    firebase.child(`people/${getIdFromUrl(url)}/like`).set(likeCount + 1)
}

function saveDislike(url, dislikeCount) {
    firebase.child(`people/${getIdFromUrl(url)}/dislike`).set(dislikeCount + 1)
}

function retrieveLikeDislike(people) {
  return new Promise((resolve, reject) => {
    firebase.child('people').once('value', snapshot => {
      let data = snapshot.val()
      resolve(people.map(person => {
        if (!data) {
          person.like = 0
          person.dislike = 0
        } else {
          let likeDislike = data[getIdFromUrl(person.url)]
          person.like = (likeDislike && likeDislike.like) ? likeDislike.like : 0
          person.dislike = (likeDislike && likeDislike.dislike) ? likeDislike.dislike : 0
        }
        return person
      }))
    })
  })
}
