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
        temp = [...temp, { ...levelDetails }];
      }
      dispatch({ type: FETCH_LEVELS, payload: temp });
    } catch (err) {
      console.log(err);
    }
  };
};
