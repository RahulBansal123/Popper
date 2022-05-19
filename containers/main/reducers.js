import { FETCH_POSTS } from './constants';

const initialState = { posts: [] };

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export default mainReducer;
