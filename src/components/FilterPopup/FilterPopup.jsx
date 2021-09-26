import React from 'react';
import PropTypes from 'prop-types';
import styles from '../FilterByState/FilterByState.module.css';

export const FilterPopup = ({ states, setFilterByState }) => {
  const handleStateClick = (e) => {
    if (e.target.textContent.length > 2 || e.target.textContent === '') {
      return;
    }
    const state = e.target.textContent;
    setFilterByState(state);
  };

  return (
    <ul onClick={handleStateClick} className={styles.popupBlock}>
      {states.map((state, index) => {
        return <li key={index}>{state}</li>;
      })}
    </ul>
  );
};

FilterPopup.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string),
  setFilterByState: PropTypes.func,
};
