import { combineReducers } from 'redux'
import authReducer from './reducerAuth'
import createReducer from './reducerCreator'
import quizReducer from './reducerQuiz'

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer,
})
