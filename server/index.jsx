import express from 'express'
import path from 'path'
import React from 'react'
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import {match, RoutingContext} from 'react-router'
import {renderToString} from 'react-dom/server'

import routes from 'routes'
import reducers from 'reducers'

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use((req, res, next) => {
  GLOBAL.navigator = {userAgent: req.headers['user-agent']}
  next()
})

app.use((req, res, next) => {
  const store = applyMiddleware(thunkMiddleware)(createStore)(reducers)

  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) res.status(500).end('Internal server error.')

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

export default app
