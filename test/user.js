const { assert } = require('chai');

const User = artifacts.require('User');

require('chai').use(require('chai-as-promised')).should();

contract('User', ([deployer, creator, newUser]) => {
  let user;
  before(async () => {
    user = await User.deployed();
  });

  describe('deployment', () => {
    it('should be an instance of User', async () => {
      const address = await user.address;
      assert.notEqual(address, null);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, undefined);
    });
  });

  describe('Users', () => {
    let result;
    let userCount;
    let name = 'Rahul';
    before(async () => {
      result = await user.createUser(name, {
        from: creator,
      });
      userCount = (await user.userId()) - 1;
    });

    it('Create User', async () => {
      let _user = await user.getUser(creator);
      assert.equal(userCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.id, 1);
      assert.equal(event.name, name);
      assert.equal(event.wallet, creator);
    });

    it('Get User', async () => {
      let _user = await user.getUser(creator);
      assert.equal(userCount, 1);
      assert.equal(_user.id, 1);
      assert.equal(_user.name, name);
      assert.equal(_user.wallet, creator);
    });

    it('Update User', async () => {
      let oldUserWallet = creator;
      let newUserWallet = newUser;

      res = await user.updateUser(name, newUserWallet, { from: oldUserWallet });

      const events = res.logs[0].args;
      assert.equal(events.id, 1);
      assert.equal(events.name, name);
      assert.equal(events.wallet, newUserWallet);

      res = await user.getUser(oldUserWallet);
      assert.equal(res.id, 0);

      res = await user.getUser(newUserWallet);
      assert.equal(res.id, 1);
    });
  });
});
