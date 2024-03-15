import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import EmployeeIndexTable from './EmployeeIndexTable';
import { UserPropTypeShape } from '../../../propTypes';

const sortedDocs = (employees) =>
  employees.sort((a, b) => a.updatedAt < b.updatedAt);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmployeeIndex = ({ employees }) => {
  const _query = useQuery();

  return (
    <div className="Employee-index">
      <EmployeeIndexTable employees={employees} />
    </div>
  );
};

EmployeeIndex.propTypes = {
  employees: PropTypes.arrayOf(UserPropTypeShape),
  // currentUser: UserPropTypeShape,
};

EmployeeIndex.defaultProps = {
  employees: [],
  // currentUser: {},
};

export default EmployeeIndex;
