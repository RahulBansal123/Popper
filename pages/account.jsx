import withAuth from '../components/withAuth';
import Web3Container from '../lib/Web3Container';
import AccountContainer from '../containers/account';

const Account = () => {
  return (
    <Web3Container
      render={({ account, contract }) => (
        <AccountContainer account={account} contract={contract} />
      )}
    />
  );
};

export default withAuth(Account);
