import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Header from '../../components/Layout/Header';
import Details from '../../components/Account/Details';
import { UploadImage } from '../../components/UploadImage';
const Posts = dynamic(() => import('../../components/Posts'), {
  ssr: false,
});

function Home(props) {
  const [isOpen, setIsOpen] = useState(false);

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
        <Details address={'0xbc12kj1k2kj12jk12j1k'} openModal={openModal} />
        <Posts />
      </div>
    </div>
  );
}
export default Home;
