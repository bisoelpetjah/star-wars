import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from 'components/app'
import Home from 'components/home'
import Person from 'components/person'

import NotFound from 'components/app/404'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="person/:id" component={Person} />
    <Route path="*" component={NotFound} />
  </Route>
)
