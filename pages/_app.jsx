import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import '../global.css';

import { wrapper } from '../store';
import { ToastContainer } from 'react-toastify';
import { Web3ReactProvider } from '@web3-react/core';
import dynamic from 'next/dynamic';
const Web3ReactProviderDefault = dynamic(
  () => import('../components/defaultprovider'),
  { ssr: false }
);

import getLibrary from '../utils/getLibrary';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ReactProviderDefault getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ReactProviderDefault>
      </Web3ReactProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={true}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default wrapper.withRedux(MyApp);
