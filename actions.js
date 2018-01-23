import {
  SUBMIT_MULTIFORM_FORMS,
  SUBMITTED_MULTIFORM_FORM,
  POST_MULTIFORM_FORM,
  SET_MULTIFORM_MESSAGE,
} from './constants'

export function setMultiFormMessage(reducerKey, message) {
  return {
    type: SET_MULTIFORM_MESSAGE,
    reducerKey,
    message
  }
}

export function submitMultiFormForms(reducerKey) {
  return {
    type: SUBMIT_MULTIFORM_FORMS,  
    reducerKey,
  }
}

export function submittedMultiFormForm(reducerKey, isValid, formValues, history, formProperties) {
  return {
    type: SUBMITTED_MULTIFORM_FORM,
    reducerKey,
    isValid,
    formValues,
    history,
    formProperties,
  }
}

export function postMultiFormForm(reducerKey, formData) {
  return {
    type: POST_MULTIFORM_FORM,
    reducerKey,
    formData
  }
}
