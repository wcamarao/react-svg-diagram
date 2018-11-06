import {createStore} from 'redux'
import {combineReducers} from 'redux'
import svg from './modules/svg'

const rootReducer = combineReducers({
  svg,
})

export default createStore(rootReducer)
