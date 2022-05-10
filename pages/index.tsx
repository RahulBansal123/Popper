import Head from 'next/head';
import dynamic from 'next/dynamic';
import withAuth from '../components/withAuth';

import Header from '../components/Layout/Header';
import Details from '../components/Account/Details';
const Posts = dynamic(() => import('../components/Posts'), {
  ssr: false,
});

function Home() {
  // const { loading } = useData();
  const loading = false;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <Head>
        <title>Popper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container py-4 flex">
        <Details address={'0xbc12kj1k2kj12jk12j1k'} openModal={() => {}} />
        <Posts />
      </div>
    </div>
  );
}
export default withAuth(Home);
