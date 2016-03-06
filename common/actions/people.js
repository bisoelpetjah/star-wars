import api from '../../config/api'
import Firebase from 'firebase'

import {requestFetch, resolveFetch} from 'actions'

const firebase = new Firebase(api.firebaseUrl)

export function fetchPeopleList(url) {
  return dispatch => {
    dispatch(requestFetch())

    fetch(url ? url :`${api.baseUrl}/people/`, {
      headers: api.requestHeaders,
      method: 'GET'
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          retrieveLikeDislike(data.results, people => {
            dispatch(receivePeopleList(people, data.next))
            if (!data.next && data.previous) dispatch(endPeopleList())
            dispatch(resolveFetch(response.status))
          })
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
          retrieveLikeDislike([data], people => {
            data.like = people[0].like ? people[0].like : 0
            data.dislike = people[0].dislike ? people[0].dislike : 0
            dispatch(receiveCurrentPerson(data))
            dispatch(resolveFetch(response.status))
          })
        })
      } else {
        dispatch(resolveFetch(response.status))
      }
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

function retrieveLikeDislike(people, callback) {
  firebase.child('people').once('value', snapshot => {
    let data = snapshot.val()
    callback(people.map(person => {
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
}
