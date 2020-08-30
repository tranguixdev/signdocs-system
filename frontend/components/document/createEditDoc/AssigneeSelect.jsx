import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { UserPropTypeShape } from '../../propTypes';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

const options = (users) =>
  users
    .map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    }))
    .sort((a, b) => a.label - b.label);

const AssigneeSelect = ({ users, onChange, value }) => {
  const userOptions = options(users);

  return (
    <Select
      value={value}
      options={userOptions}
      isMulti
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={onChange}
    />
  );
};

AssigneeSelect.propTypes = {
  users: PropTypes.arrayOf(UserPropTypeShape).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(UserPropTypeShape).isRequired,
};

export default AssigneeSelect;
