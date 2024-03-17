/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { name, internet } from 'faker';
import { withRouter } from 'react-router-dom';
import CreateEmployeeForm from './EmployeeForm';
import {
  createUserByAdmin,
  receiveErrors,
} from '../../../../actions/userByAdmin';
import { fetchUsers } from '../../../../actions/user';
import { getErrors } from '../../../../reducers/selectors';
import { BreadCrumbs } from '../../../helperComponents';

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
class CreateEmployeeContainer extends Component {
  componentDidMount() {
    // const { fetchAllUsers } = this.props;
    // fetchAllUsers();
  }

  render() {
    const history = [
      {
        to: '/employees',
        title: 'Employees',
      },
      {
        to: '/employees/new',
        title: 'Create',
      },
    ];
    return (
      <>
        <BreadCrumbs history={history} />
        <CreateEmployeeForm {...this.props} />
      </>
    );
  }
}

CreateEmployeeContainer.propTypes = {
  userState: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  processForm: PropTypes.func.isRequired,
  receiveErrors: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  generateDemo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userState: {
    email: '',
    firstName: '',
    lastName: '',
  },
  errors: getErrors(state, 'users'),
  formType: 'Create Employee',
  generateDemo,
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (formData) => dispatch(createUserByAdmin(formData)),
  receiveErrors: (err) => dispatch(receiveErrors(err)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateEmployeeContainer),
);
