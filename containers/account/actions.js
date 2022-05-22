import { FETCH_LEVELS } from './constants';
import { getLevelMetadata } from '../../utils';

export const getLevelsForUser = (contract, ownerId) => {
  return async (dispatch) => {
    try {
      let levelHashes = [];

      levelHashes[0] = await contract.methods
        .getLevel(ownerId, 'public')
        .call();
      levelHashes[1] = await contract.methods.getLevel(ownerId, 'gold').call();
      levelHashes[2] = await contract.methods
        .getLevel(ownerId, 'diamond')
        .call();

      levelHashes = levelHashes.filter(Boolean);

      let temp = [];
      for (let i = 0; i < levelHashes.length; i++) {
        const levelDetails = await getLevelMetadata(levelHashes[i]);
        if (levelDetails) temp = [...temp, { ...levelDetails }];
      }
      dispatch({ type: FETCH_LEVELS, payload: temp });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getSubscriptionsForUser = (contract, ownerId, userId) => {
  return async () => {
    try {
      const subscriptions = [];

      if (await contract.methods.isSubscribed(ownerId, userId, 'public').call())
        subscriptions.push('public');

      if (await contract.methods.isSubscribed(ownerId, userId, 'gold').call())
        subscriptions.push('gold');

      if (
        await contract.methods.isSubscribed(ownerId, userId, 'diamond').call()
      )
        subscriptions.push('diamond');

      return subscriptions;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
};
