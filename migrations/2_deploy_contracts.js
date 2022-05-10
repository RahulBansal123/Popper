const Post = artifacts.require('PostContract');
const User = artifacts.require('User');
const Social = artifacts.require('Social');

module.exports = function (deployer) {
  deployer.deploy(Post);
  deployer.deploy(User);
  deployer.deploy(Social);
};
