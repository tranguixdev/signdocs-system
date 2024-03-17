/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import EmployeeFormFields from './EmployeeFormFields';
import PasswordFields from '../../../session/PasswordFields';
import DemoButton from '../../../session/DemoButton';

import { HelperText } from '../../../helperComponents';
// import { Button } from '@mui/material';
import { deleteUserByAdmin } from '../../../../actions/userByAdmin';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../../actions/user';

const EmployeeForm = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    userState,
    history,
    processForm,
    receiveErrors,
    formType,
    generateDemo,
  } = props;
  const [state, setState] = useState({
    id: userState.id || '',
    email: userState.email || '',
    password: '',
    firstName: userState.firstName || '',
    lastName: userState.lastName || '',
  });
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  let buttonText = 'Register';
  let buttonTextSubmitting = 'On registering...';
  // let helmetText = 'SignDocs - Register Employee';

  const { email } = state;

  useEffect(() => {
    return () => {
      // clearErrors();
    };
  }, []);

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setState({ ...state, [name]: value });
  };

  const clearPassword = () =>
    setState((oldState) => ({ ...oldState, password: '' }));

  const handleSubmit = (e, user = state) => {
    e.preventDefault();
    setSubmitting(true);
    processForm(user)
      .then(() => {
        history.push('/employees');
      })
      .fail(() => {
        setSubmitting(false);
        clearPassword();
      });
  };
  const handleDemoUser = (e) => {
    setSubmitting(true);
    e.preventDefault();
    e.persist();
    const demo = generateDemo();
    setState({ ...demo });
    setTimeout(() => handleSubmit(e, demo), 750);
  };
  const onDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this employee?',
    );
    if (confirmed) {
      dispatch(deleteUserByAdmin(state.id))
        .then(() => {
          history.push('/employees');
        })
        .fail(() => {});
    }
  };

  return (
    <div className="session-form">
      <Helmet>
        <title>
          {formType == 'Create Employee'
            ? 'SignDocs - Register Employee'
            : 'SignDocs - Edit Employee'}
        </title>
      </Helmet>
      {/* {headerText} */}
      <h1>
        {formType == 'Create Employee' ? 'Register Employee' : 'Edit Employee'}
      </h1>
      <form onSubmit={handleSubmit}>
        <EmployeeFormFields
          state={state}
          handleChange={handleChange}
          HelperText={HelperText}
        />
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <HelperText field="email" path="session.password" />
        {formType === 'Create Employee' && (
          <PasswordFields
            handleChange={handleChange}
            state={state}
            isSignUp={true}
            receiveErrors={receiveErrors}
          />
        )}
        <button type="submit" disabled={submitting}>
          {submitting
            ? buttonTextSubmitting
            : formType == 'Create Employee'
            ? buttonText
            : 'Update'}
        </button>

        {formType === 'Create Employee' ? (
          <DemoButton
            isSignUp={true}
            handleSubmit={handleDemoUser}
            submitting={submitting}
          />
        ) : (
          <button onClick={onDelete}>Delete</button>
        )}
      </form>
    </div>
  );
};

export default EmployeeForm;
