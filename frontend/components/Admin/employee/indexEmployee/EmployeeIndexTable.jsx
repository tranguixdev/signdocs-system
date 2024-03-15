import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { getAllUserRoles } from '../../../../reducers/selectors';
import { fetchUserRoles } from '../../../../actions/userRole';

const columns = [
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'firstName', label: 'Fist Name', minWidth: 100 },
  {
    id: 'lastName',
    label: 'Last Name',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'userRoleId',
    label: 'Role',
    minWidth: 170,
    align: 'right',
  },
];

export default function EmployeeIndexTable({ employees }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const userRoles = useSelector(getAllUserRoles, isEqual);
  useEffect(() => {
    (async function getUserRoles() {
      dispatch(fetchUserRoles()).done(() => setLoading(false));
    })();
  }, []);

  return (
    <Paper sx={{ width: '98%', overflow: 'hidden', margin: 'auto' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
