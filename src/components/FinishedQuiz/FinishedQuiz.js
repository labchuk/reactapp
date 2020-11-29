import React from 'react'
import Button from '../UI/Button/Button'
import classes from './FinishedQuiz.module.css'
import { Link } from 'react-router-dom'

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.result).reduce((total, key) => {
    if (props.result[key] === 'success') {
      total++
    }
    return total
  }, 0)
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fas',
            props.result[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.result[quizItem.id]],
          ]
          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
      </ul>
      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>
      <Button
        style={{ marginRight: '20px' }}
        onClick={props.onRetry}
        type="primary"
      >
        Повторить
      </Button>
      <Link to="/">
        <Button type="success">Список тестов</Button>
      </Link>
    </div>
  )
}

export default FinishedQuiz
