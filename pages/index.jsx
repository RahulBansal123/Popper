import Web3Container from '../lib/Web3Container';
import Main from '../containers/home';
import withAuth from '../components/withAuth';
import PostContract from '../abis/PostContract.json';

function Home() {
  return (
    <Web3Container
      contractDefinition={PostContract}
      render={({ account, contract }) => (
        <Main account={account} contract={contract} />
      )}
    />
  );
}
export default withAuth(Home);
