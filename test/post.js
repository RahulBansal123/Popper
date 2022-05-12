const { assert } = require('chai');

const Post = artifacts.require('PostContract');

require('chai').use(require('chai-as-promised')).should();

contract('Post', ([deployer, creator, cheerer]) => {
  let post;
  before(async () => {
    post = await Post.deployed();
  });

  describe('deployment', () => {
    it('should be an instance of Post', async () => {
      const address = await post.address;
      assert.notEqual(address, null);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, undefined);
    });
  });

  describe('Posts', () => {
    let result;
    let postCount;
    const ownerId = 1;
    const digest = 'qwery';
    const hashFn = 1;
    const size = 1;
    before(async () => {
      result = await post.addPost(ownerId, digest, hashFn, size, {
        from: creator,
      });
      postCount = (await post.postId()) - 1;
    });

    it('Create Post', async () => {
      let _post = await post.getPost(1);
      assert.equal(postCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.postId, 1);
      assert.equal(event.ownerId, ownerId);
    });

    it('Retrieve Post', async () => {
      let _post = await post.getPost(1);
      assert.equal(postCount, 1);
      assert.equal(_post.multihashDigest, digest);
      assert.equal(_post.multihashHashFn, hashFn);
      assert.equal(_post.multihashSize, size);
      assert.equal(_post.owner, creator);
    });

    it('Allow users to cheer the creator', async () => {
      let oldCreatorBalance;
      oldCreatorBalance = await web3.eth.getBalance(creator);
      oldCreatorBalance = new web3.utils.BN(oldCreatorBalance);

      result = await post.cheerCreator(postCount, {
        from: cheerer,
        value: web3.utils.toWei('1', 'Ether'),
      });

      const event = result.logs[0].args;

      let newCreatorBalance;
      newCreatorBalance = await web3.eth.getBalance(creator);
      newCreatorBalance = new web3.utils.BN(newCreatorBalance);

      let cheerOwner;
      cheerOwner = web3.utils.toWei('1', 'Ether');
      cheerOwner = new web3.utils.BN(cheerOwner);

      const expactedBalance = oldCreatorBalance.add(cheerOwner);
      assert.equal(newCreatorBalance.toString(), expactedBalance.toString());
    });
  });
});
