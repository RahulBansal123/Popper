import { FETCH_CHEERS, FETCH_POSTS } from './constants';

const initialState = { posts: [], cheers: [] };

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload };

    case FETCH_CHEERS:
      return { ...state, cheers: action.payload };
    default:
      return state;
  }
};

export default mainReducer;
