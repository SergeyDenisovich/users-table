import React from 'react';
import { getUsersFromAPI, setCurrentUserData, setUserInfo, filterByFirstName } from './store/actions/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from './components/Table/Table';
import { UserInfo } from './components/UserInfo/UserInfo';
import { SearchByName } from './components/SearchByName/SearchByName';
import { FilterByState } from './components/FilterByState/FilterByState';
import { Pagination } from './components/pagination/Pagination';

const App = () => {
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    dispatch(filterByFirstName(searchValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const dispatch = useDispatch();
  const { isLoading, currentUsersData, selectedUser, totalPages } = useSelector((state) => state);

  React.useEffect(() => {
    dispatch(getUsersFromAPI());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showUserInfo = (id, name) => {
    dispatch(setUserInfo(id, name));
  };

  const changePage = (page) => {
    setPage(page);
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
      <div className='fields'>
        <SearchByName
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search by user...'
        />
        <FilterByState />
      </div>
      <Table users={currentUsersData} showUserInfo={showUserInfo} selectedUser={selectedUser} />

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />

      <UserInfo user={selectedUser} />
    </div>
  );
};

export default App;
