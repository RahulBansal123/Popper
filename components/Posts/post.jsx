import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Identicon from 'identicon.js';

import toast from '../../utils/alert';
import { getPostMetadata } from '../../utils';
import { getCheersForUser } from '../../containers/main/actions';
import { useRouter } from 'next/router';

const Post = ({ post, account, contract }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isSend, setIsSend] = useState(false);
  const [cheerValue, setCheerValue] = useState('0.0001');
  const [details, setDetails] = useState({
    owner: '0x0000000000000000000000000000000000000000',
    title: '',
    description: '',
    cheers: 0,
    gatewayURL: '/assets/images/placeholder.jpeg',
  });

  const data = new Identicon(details.owner, 200).toString();

  useEffect(() => {
    const getMetadata = async () => {
      const res = await getPostMetadata(post.hash.ipfsHash);
      if (!res) return;
      const { owner, title, description, gatewayURL } = res;

      setDetails({
        owner,
        title,
        description,
        gatewayURL,
      });
    };

    const getCheers = async () => {
      let cheers = await contract.methods.getCheeredAmount(post.id).call();
      cheers = web3.utils.fromWei(`${cheers}`, 'ether');
      setDetails((prev) => ({ ...prev, cheers: cheers ?? 0 }));
    };

    if (post?.hash?.ipfsHash?.length > 0) {
      getMetadata();
      getCheers();
    }
  }, [post.hash.ipfsHash]);

  const cheerOwner = async (amount) => {
    try {
      await contract.methods.cheerCreator(post.id).send({
        from: account,
        value: amount,
        gasLimit: 100000,
      });
      toast({
        type: 'success',
        message: 'Cheered creator',
      });
      setIsSend(false);
      await dispatch(getCheersForUser(account, contract));
    } catch (error) {
      toast({
        type: 'error',
        message: 'Please try again',
      });
      console.error(error);
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white mb-10">
      <div className="w-full h-fit">
        <img src={details.gatewayURL} className="w-full h-full" />
      </div>
      <div className="px-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg mt-2 font-semibold">{details.title}</h3>
          <h3 className="text-lg mt-2 font-semibold text-gray-500">
            {details.cheers} MATIC
          </h3>
        </div>
        <p className="text-base font-normal text-gray-700 my-2">
          {details.description?.length > 0
            ? details.description
            : 'Fetching Details...'}
        </p>
        <div className="flex items-center my-4">
          <div className="flex-1 flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={`data:image/png;base64, ${data}`}
            />
            <p
              onClick={() => {
                router.push({
                  pathname: '/account',
                  query: { address: details.owner },
                });
              }}
              className="cursor-pointer text-gray-800 leading-none text-base font-medium hover:text-black"
            >
              {details.owner.slice(0, 20)}...
            </p>
          </div>
          {isSend && (
            <input
              className="appearance-none border border-blue-800 rounded-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="cheer value(MATIC)"
              value={cheerValue}
              onChange={(e) => setCheerValue(e.target.value)}
            />
          )}

          <button
            className="btn !rounded-full bg-blue-800 text-white hover:bg-[#004c81e6]"
            onClick={() => {
              if (isSend) {
                cheerOwner(cheerValue);
              } else {
                setIsSend(true);
              }
            }}
          >
            {isSend ? 'Send' : 'Cheer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
