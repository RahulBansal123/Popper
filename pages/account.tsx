import Head from 'next/head';
import { useRouter } from 'next/router';
import withAuth from '../components/withAuth';

import Header from '../components/Layout/Header';
import Details from '../components/Account/Details';
import Levels from '../components/Levels';
import { UploadImage } from '../components/UploadImage';
import { useState } from 'react';

const Account = () => {
  const router = useRouter();

  let [isOpen, setIsOpen] = useState(false);
  // const { loading } = useData();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <Head>
        <title>Popper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container py-4 flex">
        <UploadImage isOpen={isOpen} closeModal={closeModal} />
        <Details address={router.query.address} openModal={openModal} />
        <div className="ml-3 w-full">
          <Levels />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Account);
