import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ArrowButton } from '../ArrowButton/ArrowButton';
import { FilterPopup } from '../FilterPopup/FilterPopup';
import { filterByState } from '../../store/actions/usersActions';
import styles from './FilterByState.module.css';

export const FilterByState = () => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const { allUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  const allStatesFromAllUsers = allUsers.map((user) => {
    return user.adress.state;
  });

  const statesArray = [...new Set(allStatesFromAllUsers)];

  const handleClickPopup = () => {
    setVisiblePopup((value) => !value);
  };

  const setFilterByState = (state) => {
    setVisiblePopup(false);
    dispatch(filterByState(state));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterBlock} onClick={handleClickPopup}>
        <span>Filter by state</span>
        <ArrowButton className={visiblePopup ? 'asc' : 'desc'} color='#fff' />
      </div>

      {visiblePopup && <FilterPopup states={statesArray} setFilterByState={setFilterByState} />}
    </div>
  );
};
