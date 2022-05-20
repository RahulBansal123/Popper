import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import Header from '../../components/Layout/Header';
import Details from '../../components/Account/Details';
import { UploadImage } from '../../components/UploadImage';
import Levels from '../../components/Levels';
import { getPostsForUser } from '../../containers/main/actions';
import { getLevelsForUser } from '../../containers/account/actions';
import { AddLevel } from '../../components/AddLevel';

const Posts = dynamic(() => import('../../components/Posts'), {
  ssr: false,
});

const AccountContainer = ({
  user,
  posts,
  account,
  contract,
  getPostsForUser,
  getLevelsForUser,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const uId = +user.id;

    getPostsForUser(contract);
    getLevelsForUser(contract, uId);
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
        {router.query.address === account && (
          <>
            <UploadImage
              isOpen={isOpen}
              closeModal={closeModal}
              contract={contract}
              account={account}
            />
            <AddLevel
              isOpen={isLevelOpen}
              closeModal={() => setIsLevelOpen(false)}
              contract={contract}
              account={account}
            />
          </>
        )}
        <Details
          address={router.query.address}
          openModal={openModal}
          openLevelModal={() => setIsLevelOpen(true)}
          myAccount={account}
          contract={contract}
          showLevelAdd={true}
        />
        <div className="ml-3 w-full">
          <ul
            className="flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 w-1/2 mx-auto"
            role="tablist"
          >
            {['Levels', 'Posts'].map((item, index) => (
              <li
                className={`flex-1 mx-2 font-medium text-xs leading-tight uppercase  px-6 py-3 my-2 border-2 border-transparent hover:border-blue-800 hover:text-blue-800 focus:border-transparent text-center cursor-pointer rounded-xl ${
                  activeTab === index ? 'text-blue-800 border-blue-800' : ''
                }`}
                role="presentation"
                onClick={() => setActiveTab(index)}
              >
                {item}
              </li>
            ))}
          </ul>

          {activeTab === 0 ? (
            <Levels
              isOwn={router.query.address === account}
              contract={contract}
              account={account}
            />
          ) : (
            <Posts
              posts={posts}
              contract={contract}
              account={account}
              className="!w-3/5"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.main.posts,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  getPostsForUser: (contract) => dispatch(getPostsForUser(contract)),
  getLevelsForUser: (contract, ownerId) =>
    dispatch(getLevelsForUser(contract, ownerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
