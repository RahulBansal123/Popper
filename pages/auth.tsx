import { useWeb3React } from '@web3-react/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Account from '../containers/auth';

const Auth = () => {
  const { account } = useWeb3React();
  const Router = useRouter();

  if (account) {
    Router.replace('/');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <Head>
        <title>Popper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container py-4">
        <Account />
      </div>
    </div>
  );
};

export default Auth;
