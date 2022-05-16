import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect, useDispatch } from 'react-redux';

import UserContract from '../../abis/User.json';
import Web3Container from '../../lib/Web3Container';
import { setUser } from './actions';

const Wrapper = ({ children, user, account, contract }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (account && account !== '0x0' && !user) {
        let fetchedUser;

        if (contract) {
          try {
            fetchedUser = await contract.methods.getUser(account).call();
          } catch (error) {
            console.error(error);
          }
        }

        if (
          fetchedUser &&
          fetchedUser.id !== 0 &&
          fetchedUser.name &&
          contract
        ) {
          dispatch(setUser(fetchedUser));
        } else {
          try {
            await contract.methods
              .createUser('John Doe')
              .send({ from: account, gasLimit: 100000 });
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    fetchUser();
  }, [router.pathname]);

  return <>{children}</>;
};

function Web3Wrapper({ user, children }) {
  return (
    <Web3Container
      contractDefinition={UserContract}
      render={({ account, contract }) => (
        <Wrapper account={account} contract={contract} user={user}>
          {children}
        </Wrapper>
      )}
    />
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Web3Wrapper);
