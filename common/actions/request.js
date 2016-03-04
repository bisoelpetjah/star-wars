export const REQUEST_FETCH = 'REQUEST_FETCH'

export function requestFetch() {
  return {type: REQUEST_FETCH}
}

export const RESOLVE_FETCH = 'RESOLVE_FETCH'

export function resolveFetch(status) {
  return {
    type: RESOLVE_FETCH,
    status
  }
}

export const RESET_FETCH_STATUS = 'RESET_FETCH_STATUS'

export function resetFetchStatus() {
  return {type: RESET_FETCH_STATUS}
}
