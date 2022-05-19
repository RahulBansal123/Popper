import { useEffect, useState } from 'react';
import Identicon from 'identicon.js';
import toast from '../../utils/alert';
import { getPostMetadata } from '../../utils';

const Post = ({ post, account, contract }) => {
  const [details, setDetails] = useState({
    owner: '0x0000000000000000000000000000000000000000',
    title: '',
    description: '',
    cheers: 0,
    gatewayURL: 'https://via.placeholder.com/200',
  });

  useEffect(() => {
    const getMetadata = async () => {
      console.log('post', post);
      const res = await getPostMetadata(post.hash.ipfsHash);
      console.log('res', res);
      const { owner, title, description, cheers, gatewayURL } = res;

      console.log('details', owner, title, description, cheers, gatewayURL);
      setDetails({
        owner,
        title,
        description,
        gatewayURL,
      });
    };

    const getCheers = async () => {
      const cheers = await contract.methods.getCheeredAmount(post.id).call();
      console.log('cheers', cheers);
      setDetails((prev) => ({ ...prev, cheers }));
    };

    if (post?.hash?.ipfsHash?.length > 0) getMetadata();
    getCheers();
  }, [post]);

  const data = new Identicon(details.owner, 200).toString();

  const cheerOwner = async (amount) => {
    try {
      await contract.methods
        .cheerCreator(post.id)
        .send({ from: account, value: `${amount} GWei`, gasLimit: 100000 });
      toast({
        type: 'success',
        message: 'Cheered creator',
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white mb-10">
      <div className="w-full h-fit">
        <img src={details.gatewayURL} className="w-full h-full" />
      </div>
      <div className="px-3">
        <h3 className="text-lg mt-2 font-semibold">{details.title}</h3>
        <p className="text-base font-normal text-gray-700 my-2">
          {details.description}
        </p>
        <div className="flex items-center my-4">
          <div className="flex-1 flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={`data:image/png;base64, ${data}`}
            />
            <p
              onClick={() => {
                navigator.clipboard.writeText(owner);
                toast({
                  type: 'success',
                  message: 'Copied to clipboard',
                });
              }}
              className="cursor-pointer text-gray-800 leading-none text-base font-medium hover:text-black"
            >
              {details.owner.slice(0, 20)}...
            </p>
          </div>
          <button
            className="btn !rounded-2xl bg-blue-800 text-white hover:bg-[#004c81e6]"
            onClick={() => cheerOwner(100)}
          >
            Cheer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
