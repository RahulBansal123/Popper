import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import withAuth from '../components/withAuth';

import Header from '../components/Layout/Header';
import Details from '../components/Account/Details';
import Levels from '../components/Levels';
import { UploadImage } from '../components/UploadImage';
import Web3Container from '../lib/Web3Container';

const Account = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <Web3Container
      render={({ account, contract }) => (
        <div className="flex flex-col items-center justify-start min-h-screen py-2">
          <Head>
            <title>Popper</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <div className="container py-4 flex">
            <Details
              address={router.query.address}
              openModal={openModal}
              account={account}
              contract={contract}
            />
            <div className="ml-3 w-full">
              <Levels />
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default withAuth(Account);
