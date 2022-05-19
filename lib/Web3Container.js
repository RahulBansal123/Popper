import React from 'react';
import getWeb3 from './getWeb3';
import getContract from './getContract';
import PostContract from '../abis/PostContract.json';

export default class Web3Container extends React.Component {
  state = { web3: null, account: null, contract: null };

  async componentDidMount() {
    try {
      const web3 = await getWeb3();
      const account = await web3.eth.getAccounts();
      const contract = await getContract(web3, PostContract);
      this.setState({ web3, account: account[0], contract });
    } catch (error) {
      alert(
        `Failed to load web3, account, or contract. Check console for details.`
      );
      console.log(error);
    }
  }

  render() {
    const { web3, account, contract } = this.state;
    return web3 && account ? (
      this.props.render({ web3, account, contract })
    ) : (
      <div className="w-full h-screen grid" style={{ placeItems: 'center' }}>
        <img src="/assets/loader.svg" alt="loader" />
      </div>
    );
  }
}
