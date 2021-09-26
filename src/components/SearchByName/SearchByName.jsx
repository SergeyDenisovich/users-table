import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchByName.module.css';

export const SearchByName = (props) => {
  return (
    <div className={styles.searchBlock}>
      <img src='/image/search.svg' alt='Search' />
      <input {...props} />
    </div>
  );
};

SearchByName.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
