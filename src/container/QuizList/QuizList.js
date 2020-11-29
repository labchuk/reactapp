import classes from './QuizList.module.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/actionsQuiz'
import { Component } from 'react'

class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      )
    })
  }

  componentDidMount() {
    this.props.fetchQuizes()
  }
  render() {
    return (
      <div className={classes.QuizList}>
        <div className={classes.WrapperQuizList}>
          <h1>Список тестов</h1>
          <div className={classes.Link}>
            {this.props.loading && this.props.quizes.length !== 0 ? (
              <Loader />
            ) : (
              <ul>{this.renderQuizes()}</ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
