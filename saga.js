import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SUBMITTED_MULTIFORM_FORM } from './constants';
import { postMultiFormForm } from './actions';
import { fromJS, Map as ImmutableMap } from 'immutable';
import utilities from '@source4society/scepter-utility-lib';
import { makeSelectSubmittingDisabled, makeSelectFormStatus } from './selectors';
import { multiFormHandler, multiForm } from 'models/multiFormSaga'

export const collectMultiFormData = (reducerKey) => (function* (action) {
  yield* multiFormHandler(action, function* (action) {
    const submittingDisabled = yield select ( makeSelectSubmittingDisabled(reducerKey) );     
    const formStatus = yield select( makeSelectFormStatus() );
    const formData = yield* multiForm(submittingDisabled, formStatus, action.formProperties)
     console.log(formData) 
    yield put(postMultiFormForm(reducerKey, formData))
  })
})

export default function* multiFormData(props) {
  yield takeLatest(SUBMITTED_MULTIFORM_FORM, collectMultiFormData(props.reducerKey || 'multiForm'))
}
