import { fromJS, Map as immutableMap } from 'immutable';
import {
  CHANGE_FIELD,
} from 'containers/FormContainer/constants'
import {
  SET_MULTIFORM_MESSAGE,
  SUBMIT_MULTIFORM_FORMS,
  SUBMITTED_MULTIFORM_FORM,
} from './constants';

const initialState = fromJS({
  message: {},
  submitForms: false,
  formsLoading: false,
  formStatus: {}
})

const setMultiFormMessage = (state = initialState, action, reducerKey) => {
  if( action.reducerKey !== reducerKey ) { return state }
  return state.set('message', fromJS(action.message))    
}

const submitMultiFormFormsReducer = (state = initialState, action, reducerKey) => {
  if (action.reducerKey !== reducerKey) { return state }
  return state.set('submitForms', true)
}

const submittedMultiFormFormsReducer = (state = initialState, action, reducerKey) => {
  if ( action.reducerKey !== reducerKey ) { return state }
  let formName = action.formValues.keySeq().toJS()[0]
  return state
    .set('submitForms', false)
    .setIn(['formStatus', formName], immutableMap({ isValid: action.isValid, formValues: action.formValues }))
}

const changeFieldMultiFormReducer = (state = initialState, action, reducerKey) => {
  return state
    .set('message', initialState.get('message'))
}

const multiFormReducer = (reducerKey) => ( state = initialState, action ) => {
  switch(action.type) {
    case SET_MULTIFORM_MESSAGE:
      return setMultiFormMessage(state, action, reducerKey)
    case SUBMIT_MULTIFORM_FORMS:
      return submitMultiFormFormsReducer(state, action, reducerKey)        
    case SUBMITTED_MULTIFORM_FORM:   
      return submittedMultiFormFormsReducer(state, action, reducerKey)
    case CHANGE_FIELD:
      return changeFieldMultiFormReducer(state, action, reducerKey)
    default:
      return state
  }
}

export default multiFormReducer;
