import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Header from '../../components/Layout/Header';
import Details from '../../components/Account/Details';
import { UploadImage } from '../../components/UploadImage';
import { useSelector } from 'react-redux';

const Posts = dynamic(() => import('../../components/Posts'), {
  ssr: false,
});

interface Props {
  account: string;
  contract: any;
}

const Home: React.FC<Props> = ({ account, contract }) => {
  const user = useSelector((state: any) => state.auth.user);

  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPostsForUser();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const getPost = async (id: number) => {
    try {
      const post = await contract.post.methods.getPost(id).call();
      return post;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostsForUser = async () => {
    const uId: number = +user.id;
    setLoading(true);

    const postIds = await contract.methods
      .addPost(uId, 'basic')
      .send({ from: account, gasLimit: 6021975 });

    let temp = [];
    for (let i = 0; i < postIds.length; i++) {
      const post = await getPost(postIds[i]);
      temp = [...temp, post];
    }
    setPosts(temp);
    setLoading(false);
  };

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
          address={account}
          openModal={openModal}
          // contract={contract}
          // account={account}
        />
        <Posts posts={posts} contract={contract} account={account} />
      </div>
    </div>
  );
};
export default Home;
