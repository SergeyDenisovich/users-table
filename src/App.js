import React from 'react';
import { getUsersFromAPI, setCurrentUserData, setUserInfo, filterByFirstName } from './store/actions/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from './components/Table/Table';

import { UserInfo } from './components/UserInfo/UserInfo';
import { SearchByName } from './components/SearchByName/SearchByName';
import { FilterByState } from './components/FilterByState/FilterByState';
import { Pagination } from './components/pagination/Pagination';

const App = () => {
  const { isLoading, currentUsersData, selectedUser, totalPages, currentPage, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    dispatch(filterByFirstName(searchValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  React.useEffect(() => {
    dispatch(getUsersFromAPI());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showUserInfo = (id, name) => {
    dispatch(setUserInfo(id, name));
  };

  const changePage = (page) => {
    dispatch(setCurrentUserData(page));
  };

  if (isLoading) {
    return (
      <div className='loading-block'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='wrapper'>
      {error ? (
        <>
          <h1>Failed load data...</h1>
          <p>{`${error}`}</p>
        </>
      ) : (
        <>
          <div className='fields'>
            <SearchByName
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search by user...'
            />
            <FilterByState />
          </div>
          <Table users={currentUsersData} showUserInfo={showUserInfo} selectedUser={selectedUser} />

          <Pagination page={currentPage} changePage={changePage} totalPages={totalPages} />

          <UserInfo user={selectedUser} />
        </>
      )}
    </div>
  );
};

export default App;
