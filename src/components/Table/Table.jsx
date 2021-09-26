import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowButton } from '../ArrowButton/ArrowButton';
import { setSortById, setSortByString, setSortByAdressState } from '../../store/actions/usersActions';
import PropTypes from 'prop-types';
import styles from './Table.module.css';

export const Table = ({ users, showUserInfo, selectedUser }) => {
  const { sortBy } = useSelector((state) => state);
  const [field, order] = sortBy.split(' ');
  const dispatch = useDispatch();

  // sort by id
  const handleSortById = (param) => {
    if (field === param) {
      let newOrder = order === 'asc' ? 'desc' : 'asc';
      dispatch(setSortById(`${field} ${newOrder}`));
    }
    if (field !== param) {
      dispatch(setSortById(`${param} asc`));
    }
  };

  // sort by string field
  const handleSortByString = (param) => {
    if (field === param) {
      let newOrder = order === 'asc' ? 'desc' : 'asc';
      dispatch(setSortByString(`${field} ${newOrder}`));
    }

    if (field !== param) {
      dispatch(setSortByString(`${param} asc`));
    }
  };

  // sort by adress state
  const handleSortByAdressState = (param) => {
    if (field === param) {
      let newOrder = order === 'asc' ? 'desc' : 'asc';
      dispatch(setSortByAdressState(`${field} ${newOrder}`));
    }

    if (field !== param) {
      dispatch(setSortByAdressState(`${param} asc`));
    }
  };

  return (
    <table className={styles.usersTable}>
      <thead>
        <tr>
          <th onClick={() => handleSortById('id')}>
            <span>id</span>
            <ArrowButton className={sortBy === 'id desc' ? 'desc' : ''} />
          </th>
          <th onClick={() => handleSortByString('firstName')}>
            <span>First name</span>
            <ArrowButton className={sortBy === 'firstName asc' ? 'desc' : ''} />
          </th>
          <th onClick={() => handleSortByString('lastName')}>
            <span>Last name</span>
            <ArrowButton className={sortBy === 'lastName asc' ? 'desc' : ''} />
          </th>
          <th onClick={() => handleSortByString('email')}>
            <span>Email</span>
            <ArrowButton className={sortBy === 'email asc' ? 'desc' : ''} />
          </th>
          <th onClick={() => handleSortByString('phone')}>
            <span>Phone</span>
            <ArrowButton className={sortBy === 'phone asc' ? 'desc' : ''} />
          </th>
          <th onClick={() => handleSortByAdressState('state')}>
            <span>State</span>
            <ArrowButton className={sortBy === 'state asc' ? 'desc' : ''} />
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr
              key={`${user.firstName}_${user.lastName}`}
              onClick={() => showUserInfo(user.id, user.firstName)}
              className={
                selectedUser?.id === user.id && selectedUser?.firstName === user.firstName ? `${styles.activeRow}` : ''
              }
            >
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.adress.state}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  showUserInfo: PropTypes.func,
  selectedUser: PropTypes.object,
};
