import { FETCH_LEVELS } from './constants';

const initialState = { levels: [] };

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEVELS:
      return { ...state, levels: action.payload };

    default:
      return state;
  }
};

export default mainReducer;
