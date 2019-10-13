import React from 'react'
import IdleTimer from 'react-idle-timer'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { actionLogOut } from '../../modules/login';

import Home from '../home'
import About from '../about'
import Login from '../login'

const App = ({
  isLoggedIn,
  location,
  actionLogOut,
  history
}) => {

  if (!isLoggedIn && location.pathname !== '/login') {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <main>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
        </Switch>
      </main>

      <IdleTimer onIdle={() => {
        if (isLoggedIn) {
          alert("You've been idle for a couple of minutes. We're signing you out now.")
          actionLogOut({ history });
        }
      }} timeout={1000 * 60 * 5}/> {/* 5 MINUTES IDLE */}
    </div>
  )
}

export default connect(state => ({
  isLoggedIn: state.login.isLoggedIn,
  location: state.router.location
}), 
dispatch => bindActionCreators({
  actionLogOut
}, dispatch))(App)
