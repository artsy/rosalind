import { combineReducers } from 'redux'
import { REQUEST_TOAST } from '../actions'

export const toast = (state = [], action) => {
  switch (action.type) {
    case REQUEST_TOAST:
      return ({
        toppings: action.toppings
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  toast
})

export default rootReducer
