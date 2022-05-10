import Identicon from 'identicon.js';
// import { ethers } from 'ethers';
import toast from '../../utils/alert';

const Posts = () => {
  // const { images } = useData();
  return (
    <div className="w-1/2 flex flex-col mx-auto">
      {/* {images.length > 0 &&
        images.map((image, index) => ( */}
      <Post
        // key={index}
        // totalTips={image.tipAmount}
        // address={image.author}
        // description={image.description}
        // hash={image.hash}
        // id={image.id}
        address={'0xbc4cf0a3a38328bf1c3b65befa8c5665d620a0f4'}
        title={'Title of my new post'}
        description={
          'This is a test image This is a test image This is a test image This is a test image'
        }
        totalTips={'0'}
        hash={'QmW8JiY9Y7VTErtP9JtjJhk2mT9VFhLfD8Jt6VYXnhW8Y'}
        id={'0'}
      />
      <Post
        // key={index}
        // totalTips={image.tipAmount}
        // address={image.author}
        // description={image.description}
        // hash={image.hash}
        // id={image.id}
        address={'0xbc4cf0a3a38328bf1c3b65befa8c5665d620a0f4'}
        title={'Title of my new post'}
        description={
          'This is a test image This is a test image This is a test image This is a test image'
        }
        totalTips={'0'}
        hash={'QmW8JiY9Y7VTErtP9JtjJhk2mT9VFhLfD8Jt6VYXnhW8Y'}
        id={'0'}
      />
      <Post
        // key={index}
        // totalTips={image.tipAmount}
        // address={image.author}
        // description={image.description}
        // hash={image.hash}
        // id={image.id}
        address={'0xbc4cf0a3a38328bf1c3b65befa8c5665d620a0f4'}
        title={'Title of my new post'}
        description={
          'This is a test image This is a test image This is a test image This is a test image'
        }
        totalTips={'0'}
        hash={'QmW8JiY9Y7VTErtP9JtjJhk2mT9VFhLfD8Jt6VYXnhW8Y'}
        id={'0'}
      />

      {/* ))} */}
    </div>
  );
};

const Post = ({ address, title, description, totalTips, hash, id }) => {
  //   const { tipImageOwner, updateImages } = useData();
  var data = new Identicon(address, 200).toString();
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white mb-10">
      <div className="w-full h-80">
        <img
          src="http://source.unsplash.com/ugo3jZ_qtKo/604x253"
          className="w-full h-full"
        />
      </div>
      <div className="px-3">
        <h3 className="text-lg mt-2 font-semibold">{title}</h3>
        <p className="text-base font-normal text-gray-700 my-2">
          {description}
        </p>
        <div className="flex items-center my-4">
          <div className="flex-1 flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={`data:image/png;base64, ${data}`}
            />
            <p
              onClick={() => {
                navigator.clipboard.writeText(address);
                toast({
                  type: 'success',
                  message: 'Copied to clipboard',
                });
              }}
              className="cursor-pointer text-gray-800 leading-none text-base font-medium hover:text-black"
            >
              {address.slice(0, 20)}...
            </p>
          </div>
          <button className="btn !rounded-2xl bg-blue-800 text-white hover:bg-[#004c81e6]">
            Cheer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
