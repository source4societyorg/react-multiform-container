import utilities from '@source4society/scepter-utility-lib';
import React from 'react';
import PropTypes from 'prop-types';
import { 
  makeSelectMessage,
  makeSelectFormLoading,
  makeSelectSubmitForms,
  makeSelectSubmittingDisabled,
} from './selectors';
import {
  submitMultiFormForms,
  submittedMultiFormForm,
} from './actions'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import SubmitButton from 'components/Form/SubmitButton';
import Alert from 'components/Alert';
import saga from './saga';

export class MultiForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  renderChildren(children) {
    this.formValueProps = []
		return React.Children.map(children, child => {
      switch (child.type) {
        case SubmitButton:
          return React.cloneElement(child, { 
            onClick: (evt) => this.props.submitAll(evt, this.props.reducerKey), 
            submittingDisabled: this.props.submittingDisabled 
          })
        case 'div':
          let subChildren = React.Children.map(child.props.children, subChild => {
            if(utilities.isNotEmpty(subChild.props.id)) {
              this.formValueProps.push([subChild.props.id, subChild.props.dontSubmitFlag, subChild.props.fieldDataSelector])
            }
            return React.cloneElement(subChild, {
              callbackAction: (isValid, formValues, reducerKey) => this.props.submitCallback(isValid, formValues, reducerKey, this.formValueProps),
              submitForm: this.props.submitForms	
            })
          })  
          return React.cloneElement(child, { children: subChildren })     
        case Alert:
          return this.renderMessage(this.props.message)       
      }
		})
	}

  renderMessage(message) {
    if (typeof message.get('message') !== 'undefined' ) {
      return <Alert alertType={message.get('type')}>{this.props.labels(message.get('message'))}</Alert>
    }
  }

  render () {
    return (
      <div className={'multiform ' + this.props.className}> 
        <div className={'two-columns'}> 
          {this.renderChildren(this.props.children)}     
        </div>
      </div>
    )
  }
}

MultiForm.defaultProps = {
  reducerKey: 'multiForm',
  className: ''
}

MultiForm.propTypes = {
  formUrl: PropTypes.string,
  message: PropTypes.object,
  reducerKey: PropTypes.string
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitCallback: (isValid, formValues, reducerKey, formProperties) => submittedMultiFormForm(reducerKey, isValid, formValues, ownProps.history, formProperties),
  submitAll: (evt, reducerKey) => dispatch(submitMultiFormForms(reducerKey)),
})

const mapStateToProps = (state, ownProps) => (
  createStructuredSelector({
    message: makeSelectMessage(ownProps.reducerKey),
    submitForms: makeSelectSubmitForms(ownProps.reducerKey),
    formLoading: makeSelectFormLoading(ownProps.reducerKey),
    submittingDisabled: makeSelectSubmittingDisabled(ownProps.reducerKey),
  })
)

const withReducer = injectReducer({ key: 'multiForm', reducer, isNamespaced: true });
const withSaga = injectSaga({ key: 'multiForm', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MultiForm); 
