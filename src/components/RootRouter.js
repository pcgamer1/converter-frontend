import React, { useState } from 'react'
import { Menu, Row, Col, PageHeader } from 'antd';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

import {innerRoutes} from '../constants/routes'
import {NotFound404Screen} from './404.js/404.screen';
import {ScreenWrapper} from './ScreenWrapper'

export const RootRouter = function () {
    return (
        <Router>
          <Switch>
            <Route path='/'>
              <ScreenWrapper routes={innerRoutes} />               
            </Route> 
            <Route path='*'>
              <NotFound404Screen />
            </Route>
          </Switch>
        </Router>
    )
}