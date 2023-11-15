// client\utils\reducers.js
import { UPDATE_AUTH_STATUS, SET_USER_DETAILS, ADD_RECIPE } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_AUTH_STATUS:
      console.log('UPDATE_AUTH_STATUS dispatched');
      return {
        ...state,
        isLoggedIn: action.payload, // Use action.payload for consistency
      };
    case SET_USER_DETAILS:
      console.log('SET_USER_DETAILS dispatched');
      return {
        ...state,
        user: {
          username: action.payload.username,
          email: action.payload.email,
          _id: action.payload.userId, // Use action.payload.userId for consistency
        },
      };
    case ADD_RECIPE:
      console.log('ADD_RECIPE dispatched');
      return {
        ...state,
        recipes: [...state.recipes, action.payload.recipe], // Use action.payload.recipe for consistency
      };
    default:
      return state;
  }
};
