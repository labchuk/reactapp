import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Quiz from './container/Quiz/Quiz'
import Auth from './container/Auth/Auth'
import QuizCreator from './container/QuizCreator/QuizCreator'
import QuizList from './container/QuizList/QuizList'
import { connect } from 'react-redux'
import { autoLogin } from './store/actions/actionAuth'
import Logout from './components/Logout/Logout'

class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return <Layout>{routes}</Layout>
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
