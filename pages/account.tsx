import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from '../components/Layout/Header';
import Details from '../components/Account/Details';
import withAuth from '../components/withAuth';

const Account = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <Head>
        <title>Popper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container py-4">
        <Details address={router.query.address || 'qhemdoneiwndmwwnx'} />
      </div>
    </div>
  );
};

export default withAuth(Account);
