import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';

import Header from '../../components/Layout/Header';
import Details from '../../components/Account/Details';
import { UploadImage } from '../../components/UploadImage';
import { getPublicPostsForUser } from './actions';

const Posts = dynamic(() => import('../../components/Posts'), {
  ssr: false,
});

const Home = ({ posts, account, contract, getPublicPostsForUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getPublicPostsForUser(contract);
  }, []);

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
        <UploadImage
          isOpen={isOpen}
          closeModal={closeModal}
          contract={contract}
          account={account}
        />
        <Details
          myAccount={account}
          address={account}
          openModal={openModal}
          contract={contract}
          account={account}
        />
        <Posts posts={posts} contract={contract} account={account} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.main.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPublicPostsForUser: (contract) =>
    dispatch(getPublicPostsForUser(contract)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
