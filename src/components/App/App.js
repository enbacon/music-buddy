import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Pieces from '../Pieces/Pieces'
import Piece from '../Pieces/Piece'
import CreatePiece from '../Pieces/CreatePiece'
import EditPiece from '../Pieces/EditPiece'

import Performs from '../Performs/Performs'
import Perform from '../Performs/Perform'
import CreatePerform from '../Performs/CreatePerform'
import EditPerform from '../Performs/EditPerform'

class App extends Component {
  // constructor () {
  //   super()
    // this.state = {
    state = {
      user: null,
      alerts: []
    }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute
            user={user}
            exact path='/pieces'
            render={() => (
              <Pieces
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/pieces/:id'
            render={() => (
              <Piece
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/create-piece'
            render={() => (
              <CreatePiece
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/pieces/:id/edit'
            render={() => (
              <EditPiece
                user={user}
                alert={this.alert}
              />
            )}
          />

          <AuthenticatedRoute
            user={user}
            exact path='/performances'
            render={() => (
              <Performs
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/performances/:id'
            render={() => (
              <Perform
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/create-performance'
            render={() => (
              <CreatePerform
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/performances/:id/edit'
            render={() => (
              <EditPerform
                user={user}
                alert={this.alert}
              />
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
