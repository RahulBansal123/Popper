import { useEffect, useLayoutEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useRouter } from 'next/router';

import getContract from './getContract';
import { injected } from '../components/connectors';
import PostContract from '../abis/PostContract.json';

const Web3Container = (props) => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const router = useRouter();
  const { account, library, activate, active, error } = useWeb3React();

  useLayoutEffect(() => {
    injected
      ?.isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !active && !error) {
          activate(injected);
        }
      })
      .catch(() => {
        showAlert(
          'Please try switching the browser or try after sometime',
          'error'
        );
      });
  }, [activate, active, error]);

  useLayoutEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3(library.provider);
        const contract = await getContract(web3, PostContract);
        setState({ web3, contract });
      } catch (error) {
        alert(`Failed to connect, Please try again.`);
        console.log(error);
      }
    };
    if (account && library) init();
  }, [library, account]);

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !error) {
      const handleConnect = () => {
        activate(injected);
      };

      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          activate(injected);
        }
      };

      ethereum?.on('connect', handleConnect);
      ethereum?.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  const { web3, contract } = state;

  console.log('Web3Container', web3, contract);

  if (router.pathname === '/auth') {
    return props.render({ web3: null, account: null, contract: null });
  }

  if (web3 && account) {
    return props.render({ web3, account, contract });
  }

  router.push('/auth');
  return null;
};

export default Web3Container;
