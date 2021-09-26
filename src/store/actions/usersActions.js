import {
  SET_USERS,
  SET_ERROR,
  SET_IS_LOADING,
  SET_USER_INFO,
  SET_CURRENT_USER_DATA,
  FILTER_BY_STATE,
  FILTER_BY_FIRST_NAME,
  SET_SORT_BY_ID,
  SET_SORT_BY_STRING,
  SET_SORT_BY_ADRESS_STATE,
  SHOW_ALL_STATES,
} from '../types';
import fetchUsers from '../../api/fetchUsers';

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setIsLoading = (loading) => ({
  type: SET_IS_LOADING,
  payload: loading,
});

export const setUserInfo = (id, name) => ({
  type: SET_USER_INFO,
  payload: { id, name },
});

export const setCurrentUserData = (range) => ({
  type: SET_CURRENT_USER_DATA,
  payload: range,
});

// sort by id
export const setSortById = (sortByField) => ({
  type: SET_SORT_BY_ID,
  payload: sortByField,
});

// sort by string fields
export const setSortByString = (sortByStringField) => ({
  type: SET_SORT_BY_STRING,
  payload: sortByStringField,
});

// sort by adress state
export const setSortByAdressState = (sortByAdressState) => ({
  type: SET_SORT_BY_ADRESS_STATE,
  payload: sortByAdressState,
});

// filter by state
export const filterByState = (state) => ({
  type: FILTER_BY_STATE,
  payload: state,
});

export const filterByFirstName = (fname) => ({
  type: FILTER_BY_FIRST_NAME,
  payload: fname,
});

export const showAllStates = () => ({
  type: SHOW_ALL_STATES,
});

// thunk creator
export const getUsersFromAPI = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await fetchUsers.getUsers();
    const users = await response.json();
    dispatch(setUsers(users));
    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setIsLoading(false));
  }
};
