import Main from '../containers/main';

import Web3Container from '../lib/Web3Container';
import withAuth from '../components/withAuth';

function Home() {
  return (
    <Web3Container
      render={({ account, contract }) => (
        <Main account={account} contract={contract} />
      )}
    />
  );
}
export default withAuth(Home);