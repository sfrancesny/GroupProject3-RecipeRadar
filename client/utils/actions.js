// client\utils\actions.js

export const UPDATE_AUTH_STATUS = 'UPDATE_AUTH_STATUS';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const ADD_RECIPE = 'ADD_RECIPE';

export const updateAuthStatus = (isLoggedIn) => ({
  type: UPDATE_AUTH_STATUS, // Use the constant instead of a string
  payload: isLoggedIn,
});

export const setUserDetails = (username, email, userId) => ({
  type: SET_USER_DETAILS, // Use the constant instead of a string
  payload: { username, email, userId },
});

export const addRecipe = (recipe) => ({
  type: ADD_RECIPE, // Use the constant instead of a string
  payload: { recipe },
});
