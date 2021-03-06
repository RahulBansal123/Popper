import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import Identicon from 'identicon.js';

function Header() {
  const router = useRouter();
  const { account } = useWeb3React();
  const [data, setData] = React.useState();

  useEffect(() => {
    if (account && account !== '0x0') {
      setData(new Identicon(account || '0x0000000000000000', 200).toString());
    }
  }, [account]);
  return (
    <div className="container items-center w-11/12 md:w-full">
      <div className="mx-auto flex flex-col md:flex-row items-center md:justify-between border py-3 px-5 rounded-xl">
        <div className="flex flex-row space-x-2 items-center">
          <a
            href="/"
            className="font-mono text-xl font-bold text-blue-800 cursor-pointer"
          >
            Popper
          </a>
        </div>
        <div
          className="flex flex-row space-x-2 items-center cursor-pointer"
          onClick={() =>
            router.push({ pathname: '/account', query: { address: account } })
          }
        >
          <span className="font-mono overflow-ellipsis overflow-hidden">
            {account?.slice(0, 12)}...
          </span>
          {account && data && (
            <img
              width={35}
              height={35}
              src={`data:image/png;base64, ${data}`}
              className="rounded-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
