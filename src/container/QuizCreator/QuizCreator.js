import React, { Component, Fragment } from 'react'
import Button from '../../components/UI/Button/Button'
import { createControl, validate, validateForm } from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import classes from './QuizCreator.module.css'
import Select from '../../components/UI/Select/Select'
import { connect } from 'react-redux'
import {
  createQuizQuestion,
  finishCreateQuiz,
} from './../../store/actions/actionCreate'

function createOptionControl(index) {
  return createControl(
    {
      label: `Ответ ${index}`,
      errorMessage: 'Поле не может быть пустым',
      id: index,
    },
    {
      required: true,
    }
  )
}

function createFormControl() {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Поле не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControl(),
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  addQuestionHandler = (event) => {
    event.preventDefault()
    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    }

    this.props.createQuizQuestion(questionItem)

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControl(),
    })
  }

  createQuizHandler = (event) => {
    event.preventDefault()
    console.log('fef')
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControl(),
    })
    this.props.finishCreateQuiz()
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = value
    control.touched = true
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    })
  }

  renderControl() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Fragment key={controlName + index}>
          <Input
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </Fragment>
      )
    })
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    })
  }

  render() {
    const select = (
      <Select
        label="Выберите правельный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    )
    return (
      <div className={classes.QuizCreator}>
        <div className={classes.Wrapper}>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControl()}
            {select}
            <Button
              style={{ marginRight: '10px' }}
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Добавить тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
