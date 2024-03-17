import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HelperText } from '../../../helperComponents';
import { getErrors } from '../../../../reducers/selectors';

const EmployeeFormFields = ({ handleChange, state }) => {
  const { firstName, lastName } = state;

  return (
    <>
      <label htmlFor="firstName">
        First Name
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          required={true}
          onChange={handleChange}
          pattern="[a-zA-Z0-9]+"
          minLength={1}
        />
      </label>
      <HelperText path="session.first_name" field="first_name" />
      <label htmlFor="lastName">
        Last Name
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          required={true}
          onChange={handleChange}
          pattern="[a-zA-Z0-9]+"
          minLength={3}
        />
      </label>
      <HelperText path="session.last_name" field="last_name" />
    </>
  );
};

EmployeeFormFields.propTypes = {
  handleChange: PropTypes.func.isRequired,
  state: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

EmployeeFormFields.defaultProps = {};

const mapStateToProps = (state) => ({
  errors: getErrors(state),
});

export default connect(mapStateToProps)(EmployeeFormFields);
