import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserInfo.module.css';

export const UserInfo = ({ user }) => {
  if (!user) {
    return (
      <div className={styles.userInfoMessage}>
        <h3>Please, check user to see additional information!</h3>
      </div>
    );
  }

  return (
    <div className={styles.userInfoBlock}>
      <h3>
        Information about {`${user.firstName}`}_{`${user.lastName}`}:
      </h3>

      <ul>
        <li>
          <span>First name:</span>
          {user.firstName}
        </li>
        <li>
          <span>Last name:</span>
          {user.lastName}
        </li>
        <li>
          <span>Email:</span>
          {user.email}
        </li>
        <li>
          <span>Phone:</span>
          {user.phone}
        </li>
        <li>
          <span>Adress:</span>
        </li>
        <ul>
          <li>State: {user.adress.state}</li>
          <li>City: {user.adress.city}</li>
          <li>Street: {user.adress.streetAddress}</li>
          <li>Zip code: {user.adress.zip}</li>
        </ul>
        <li>
          <span>Description:</span>
          {user.firstName}
        </li>
      </ul>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object,
};
