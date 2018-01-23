import { createSelector } from 'reselect';

const selectMultiForm = (key = 'multiForm') => (state) => state.get(key)

const makeSelectMessage = (reducerKey) => createSelector(
  selectMultiForm(reducerKey),
  (multiFormState) => multiFormState.get('message')
);

const makeSelectSubmitForms = (reducerKey) => createSelector(
  selectMultiForm(reducerKey),
  (multiFormState) => multiFormState.get('submitForms')
);

const makeSelectFormLoading = (reducerKey) => createSelector(
  selectMultiForm(reducerKey),
  (multiFormState) => multiFormState.get('formLoading')
);

const makeSelectSubmittingDisabled = (reducerKey) => createSelector(
  selectMultiForm(reducerKey),
  (multiFormState) => multiFormState.get('submittingDisabled')
);

const makeSelectFormStatus = (reducerKey) => createSelector(
  selectMultiForm(reducerKey),
  (multiFormState) => multiFormState.get('formStatus')
);

export { 
  selectMultiForm, 
  makeSelectMessage,
  makeSelectSubmitForms, 
  makeSelectFormLoading,
  makeSelectSubmittingDisabled,
  makeSelectFormStatus
};
