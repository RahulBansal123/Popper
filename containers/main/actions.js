import { FETCH_CHEERS, FETCH_POSTS } from './constants';

export const getPost = async (id, contract) => {
  try {
    const post = await contract.methods.getPost(id).call();
    return post;
  } catch (error) {
    console.error(error);
  }
};

export const getPublicPostsForUser = (contract) => {
  return async (dispatch) => {
    try {
      let postIds = [];
      postIds = await contract.methods.getPublicPosts([1]).call();

      postIds = postIds.filter(Number);

      let temp = [];
      for (let i = 0; i < postIds.length; i++) {
        if (postIds[i] == '0') continue;
        const postHash = await getPost(postIds[i], contract);
        temp = [...temp, { id: postIds[i], hash: postHash }];
      }
      dispatch({ type: FETCH_POSTS, payload: temp });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCheersForUser = (userId, contract) => {
  return async (dispatch) => {
    try {
      let userIds = [];
      userIds = await contract.methods.getUserCheeredCreators(userId).call();
      userIds = userIds.filter(Number);

      dispatch({ type: FETCH_CHEERS, payload: userIds });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPostsForUser = (contract, ownerId, userId, level) => {
  return async () => {
    try {
      let postIds = [];
      postIds = await contract.methods
        .getPostsForUser(ownerId, userId, level)
        .call();

      postIds = postIds.filter(Number);

      let temp = [];
      for (let i = 0; i < postIds.length; i++) {
        if (postIds[i] == '0') continue;
        const postHash = await getPost(postIds[i], contract);
        temp = [...temp, { id: postIds[i], hash: postHash }];
      }

      return temp;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
};
