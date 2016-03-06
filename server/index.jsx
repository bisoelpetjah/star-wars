import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import React from 'react'
import createLocation from 'history/lib/createLocation'
import {match, RoutingContext} from 'react-router'
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server'

import routes from 'routes'
import reducers from 'reducers'

const app = express()

app.use(favicon(path.join(__dirname, '..', 'public', 'images', 'favicon.ico')))
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use((req, res, next) => {
  GLOBAL.navigator = {userAgent: req.headers['user-agent']}
  next()
})

app.use((req, res, next) => {
  const location = createLocation(req.url)

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (error) res.status(500).end('Internal server error.')

    const store = applyMiddleware(thunkMiddleware)(createStore)(reducers)

    const component = renderProps.components[renderProps.components.length - 1]
    const promise = component.getInitialData ? component.getInitialData(store.dispatch, renderProps.params) : Promise.resolve()
    promise.then(() => {
      const componentHtml = renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      )
      const initialState = store.getState()

      const HTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Star Wars Portal</title>

            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            <script type="application/javascript">
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            </script>
          </head>
          <body style="margin: 0px; padding: 0px;">
            <div id="app-view">${componentHtml}</div>

            <script type="application/javascript" src="/dist/bundle.min.js"></script>
          </body>
        </html>
      `
      res.end(HTML)
    })
  })
})

export default app
