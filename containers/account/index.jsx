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
import {
  getLevelsForUser,
  getSubscriptionsForUser,
} from '../../containers/account/actions';
import { AddLevel } from '../../components/AddLevel';
import { fetchUserId } from '../auth/actions';

const Posts = dynamic(() => import('../../components/Posts'), {
  ssr: false,
});

const AccountContainer = ({
  user,
  posts,
  account,
  contract,
  getLevelsForUser,
  getPosts,
  getSubscriptions,
  fetchUserId,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [oId, setOId] = useState(0);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const myId = +user.id;
      const temp = [];
      const uId = await fetchUserId(contract, router.query.address);
      setOId(uId);

      let subscriptions = ['public', 'gold', 'diamond'];
      if (router.query.address !== account)
        subscriptions = await getSubscriptions(contract, uId, myId);

      for (let i = 0; i < subscriptions.length; i++) {
        const posts = await getPosts(contract, uId, myId, subscriptions[i]);
        temp.concat(posts);
      }
    };
    fetchUserPosts();
  }, [router.query.address]);

  useEffect(() => {
    const fetchLevels = async () => {
      const uId = await fetchUserId(contract, router.query.address);
      await getLevelsForUser(contract, uId);
    };
    fetchLevels();
  }, [router.query.address]);

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
                key={index}
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
              oId={oId}
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
  getPosts: (contract, ownerId, userId, level) =>
    dispatch(getPostsForUser(contract, ownerId, userId, level)),
  getLevelsForUser: (contract, ownerId) =>
    dispatch(getLevelsForUser(contract, ownerId)),
  getSubscriptions: (contract, ownerId, userId) =>
    dispatch(getSubscriptionsForUser(contract, ownerId, userId)),
  fetchUserId: (contract, wallet) => dispatch(fetchUserId(contract, wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
