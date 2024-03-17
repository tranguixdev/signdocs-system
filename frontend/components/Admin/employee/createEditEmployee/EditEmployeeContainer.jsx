/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { name, internet } from 'faker';

import EmployeeForm from './EmployeeForm';
import {
  updateUserByAdmin,
  receiveErrors as recError,
} from '../../../../actions/userByAdmin';
import { fetchUser } from '../../../../actions/user';
import { getErrors, getUserById } from '../../../../reducers/selectors';
import { BreadCrumbs } from '../../../helperComponents';

class EditEmployeeContainer extends Component {
  render() {
    const { userState } = this.props;

    if (!userState) return null;

    const user = {
      email: userState.email,
      firstName: userState.firstName,
      lastName: userState.lastName,
    };

    const breadCrumbsHistory = [
      {
        to: '/employees',
        title: 'Employees',
      },
      {
        to: `/employees/${user.id}/edit`,
        title: 'Edit',
      },
    ];
    return (
      <>
        <BreadCrumbs history={breadCrumbsHistory} />
        <EmployeeForm {...this.props} />
      </>
    );
  }
}
const generateDemo = () => {
  const firstName = name.firstName();
  const lastName = name.lastName();
  const email = internet.email(firstName, lastName, 'example.org');

  return {
    email,
    firstName,
    lastName,
    password: 'password',
  };
};
EditEmployeeContainer.propTypes = {
  userState: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  processForm: PropTypes.func.isRequired,
  receiveErrors: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  generateDemo: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps.match.params;
  const userState = getUserById(userId)(state);
  return {
    userState,
    errors: getErrors(state, 'users'),
    formType: 'Edit Employee',
    generateDemo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    processForm: (formData) => dispatch(updateUserByAdmin(formData)),
    receiveErrors: (err) => dispatch(recError(err)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditEmployeeContainer),
);
