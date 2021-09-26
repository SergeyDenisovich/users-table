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

const initialState = {
  allUsers: [],
  filteredUsers: [],
  isLoading: false,
  error: false,
  currentUsersData: [],
  usersAdressStates: [],
  selectedUser: null,
  pageLimit: 20,
  currentPage: 1,
  totalPages: null,
  sortBy: 'id asc',
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        usersAdressStates: [...new Set(action.payload.map((user) => user.adress.state))],
        allUsers: action.payload.sort((a, b) => a.id - b.id),
        filteredUsers: action.payload.sort((a, b) => a.id - b.id),
        currentUsersData: action.payload.slice(0, 20),
        totalPages: Math.ceil(action.payload.length / state.pageLimit),
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case SET_CURRENT_USER_DATA: {
      const start = action.payload === 1 ? 0 : (action.payload - 1) * state.pageLimit + 1;
      const end = action.payload * state.pageLimit + 1;

      return {
        ...state,
        currentPage: action.payload,
        selectedUser: null,
        currentUsersData: state.filteredUsers.slice(start, end),
      };
    }

    case SET_USER_INFO: {
      return {
        ...state,
        selectedUser: state.currentUsersData.find(
          (user) => user.id === action.payload.id && user.firstName === action.payload.name
        ),
      };
    }

    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case FILTER_BY_STATE: {
      return {
        ...state,
        selectedUser: null,
        filterByState: action.payload,
        currentPage: 1,
        filteredUsers: state.allUsers.filter((user) => user.adress.state === action.payload),
        currentUsersData: state.allUsers.filter((user) => user.adress.state === action.payload),
      };
    }

    case FILTER_BY_FIRST_NAME: {
      return {
        ...state,
        currentPage: 1,
        filteredUsers: state.allUsers.filter((user) =>
          user.firstName.toLowerCase().includes(action.payload.toLowerCase())
        ),
        currentUsersData: state.allUsers
          .filter((user) => user.firstName.toLowerCase().includes(action.payload.toLowerCase()))
          .slice(0, 20),
      };
    }

    case SET_SORT_BY_ID: {
      const [field, order] = action.payload.split(' ');
      const start = state.currentPage === 1 ? 0 : (state.currentPage - 1) * state.pageLimit + 1;
      const end =
        state.currentPage === 1 ? state.currentPage * state.pageLimit : state.currentPage * state.pageLimit + 1;

      return {
        ...state,
        sortBy: action.payload,
        filteredUsers:
          order === 'asc'
            ? state.filteredUsers.sort((a, b) => a[field] - b[field])
            : state.filteredUsers.sort((a, b) => b[field] - a[field]),
        currentUsersData:
          order === 'asc'
            ? state.filteredUsers.sort((a, b) => a[field] - b[field]).slice(start, end)
            : state.filteredUsers.sort((a, b) => b[field] - a[field]).slice(start, end),
      };
    }

    case SET_SORT_BY_STRING: {
      const [field, order] = action.payload.split(' ');
      const start = state.currentPage === 1 ? 0 : (state.currentPage - 1) * state.pageLimit + 1;
      const end =
        state.currentPage === 1 ? state.currentPage * state.pageLimit : state.currentPage * state.pageLimit + 1;
      return {
        ...state,
        sortBy: action.payload,
        filteredUsers:
          order === 'asc'
            ? state.filteredUsers.sort((a, b) => {
                if (b[field] > a[field]) {
                  return 1;
                }
                if (b[field] < a[field]) {
                  return -1;
                }
                return 0;
              })
            : state.filteredUsers.sort((a, b) => {
                if (a[field] > b[field]) {
                  return 1;
                }
                if (a[field] < b[field]) {
                  return -1;
                }
                return 0;
              }),

        currentUsersData:
          order === 'asc'
            ? state.filteredUsers
                .sort((a, b) => {
                  if (b[field] > a[field]) {
                    return 1;
                  }
                  if (b[field] < a[field]) {
                    return -1;
                  }
                  return 0;
                })
                .slice(start, end)
            : state.filteredUsers
                .sort((a, b) => {
                  if (a[field] > b[field]) {
                    return 1;
                  }
                  if (a[field] < b[field]) {
                    return -1;
                  }
                  return 0;
                })
                .slice(start, end),
      };
    }

    case SET_SORT_BY_ADRESS_STATE: {
      const [field, order] = action.payload.split(' ');
      const start = state.currentPage === 1 ? 0 : (state.currentPage - 1) * state.pageLimit + 1;
      const end =
        state.currentPage === 1 ? state.currentPage * state.pageLimit : state.currentPage * state.pageLimit + 1;

      return {
        ...state,
        sortBy: action.payload,
        filteredUsers:
          order === 'asc'
            ? state.filteredUsers.sort((a, b) => {
                if (b['adress'][field] > a['adress'][field]) {
                  return 1;
                }
                if (b['adress'][field] < a['adress'][field]) {
                  return -1;
                }
                return 0;
              })
            : state.filteredUsers.sort((a, b) => {
                if (a['adress'][field] > b['adress'][field]) {
                  return 1;
                }
                if (a['adress'][field] < b['adress'][field]) {
                  return -1;
                }
                return 0;
              }),
        currentUsersData:
          order === 'asc'
            ? state.filteredUsers
                .sort((a, b) => {
                  if (b['adress'][field] > a['adress'][field]) {
                    return 1;
                  }
                  if (b['adress'][field] < a['adress'][field]) {
                    return -1;
                  }
                  return 0;
                })
                .slice(start, end)
            : state.filteredUsers
                .sort((a, b) => {
                  if (a['adress'][field] > b['adress'][field]) {
                    return 1;
                  }
                  if (a['adress'][field] < b['adress'][field]) {
                    return -1;
                  }
                  return 0;
                })
                .slice(start, end),
      };
    }

    case SHOW_ALL_STATES: {
      return {
        ...state,
        filteredUsers: state.allUsers,
        currentPage: 1,
        selectedUser: null,
        currentUsersData: state.allUsers.slice(0, 20),
      };
    }

    default:
      return state;
  }
};
