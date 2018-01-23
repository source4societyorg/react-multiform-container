import utilities from '@source4society/scepter-utility-lib'
import { put, select } from 'redux-saga/effects';
import { setMultiFormMessage } from './actions'
import { mapValuesToRecord } from 'containers/FormContainer/utilities'

export function* multiFormHandler(reducerKey, action, callback) {
  try {    
    yield* callback(action)
  } catch (err) {
    yield put(setMultiFormMessage(reducerKey, {message: err.message || 'An unexpected error', type: 'error'}));
  }
}

const stillWaitingForSubmittingForms = (formStatus, forms) => {
  return forms.some ( propertyToCheck => {
    return !utilities.valueOrDefault(formStatus.get(propertyToCheck[0]), propertyToCheck[1]) 
  })
}

const notAllFormsValid = (formStatus, formProperties) => {
   return formProperties.some ( propertiesToCheck => {
    return !utilities.valueOrDefault(formStatus.getIn([propertiesToCheck[0], 'isValid']), propertiesToCheck[1]) 
  }) 
}

export function* getFormValues(formsToCheck, formStatus) {
  let values = []
  for (let index = 0; index < formsToCheck.length; index++) {
    const fieldData = yield select(formsToCheck[index][2]())
    values.push(mapValuesToRecord(formStatus.getIn([formsToCheck[index][0], 'formValues', formsToCheck[index][0]]).toJS(), fieldData))
  }
  return values
}

export function* multiForm(submittingDisabled, formStatus, formsToCheck) {  
  if (submittingDisabled) { return }
  if (stillWaitingForSubmittingForms(formStatus, formsToCheck) || notAllFormsValid(formStatus, formsToCheck)) { return }
  const values = yield* getFormValues(formsToCheck, formStatus)
  return Object.assign(...values)
}
