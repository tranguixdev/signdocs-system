import React from 'react';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import isEqual from 'lodash/isEqual';
import EmployeeIndexTable from './EmployeeIndexTable';
// import NoDocsCallToCreate from '../shared/NoDocsCallToCreate';
// import { fetchUsers } from '../../../../actions/user';
// import { getAllUsers } from '../../../../reducers/selectors';

const EmployeeIndexContainer = () => {
  // const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();

  // const employees = useSelector(getAllUsers, isEqual);
  // useEffect(() => {
  //   (async function getUsers() {
  //     setLoading(true);
  //     dispatch(fetchUsers()).done(() => setLoading(false));
  //   })();
  // }, []);

  // const employeeArray =
  //   employees && Object.keys(employees) ? Object.values(employees) : [];

  // const currentUser = useSelector(getCurrentUser, shallowEqual);

  // const EmployeeIndexOrNoDocs = () =>
  //   employeeArray.length > 0 ? (
  //     // <EmployeeIndex employees={employeeArray} />
  //     <EmployeeIndex />
  //   ) : (
  //     <div>No Employee Data</div>
  //   );

  return (
    <div id="index-container">
      <div className="index-inbox">
        <div className="search-bar">
          <h2>Employees</h2>
        </div>
        {/* {loading ? <div>Loading...</div> : <EmployeeIndexOrNoDocs />} */}
        <EmployeeIndexTable />
      </div>
    </div>
  );
};

export default EmployeeIndexContainer;
