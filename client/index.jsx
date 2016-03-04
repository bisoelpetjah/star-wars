import React from 'react'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import {Router} from 'react-router'

import 'babel-polyfill'
import 'isomorphic-fetch'
import injectTapEventPlugin from 'react-tap-event-plugin'

import routes from 'routes'
import reducers from 'reducers'

injectTapEventPlugin()

const history = createBrowserHistory()
const store = applyMiddleware(thunkMiddleware)(createStore)(reducers, window.__INITIAL_STATE__)

render((
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>
), document.getElementById('app-view'))
