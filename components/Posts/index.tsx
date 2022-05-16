import Identicon from 'identicon.js';
import toast from '../../utils/alert';

const Posts = ({ posts, account, contract }) => {
  const cheerOwner = async (id: number, amount: number) => {
    try {
      await contract.methods
        .cheerCreator(id)
        .send({ from: account, value: amount, gasLimit: 100000 });
      toast({
        type: 'success',
        message: 'Cheered creator',
      });
    } catch (error) {
      console.error(error);
    }
  };
  // const {
  //   cheerOwner,
  //   postCount,
  //   posts: tPosts,
  //   addPost,
  //   updatePosts,
  // } = useData();
  // const add = async () => {
  //   try {
  //     await addPost(1, 'qwqwqw');
  //     await updatePosts();
  //     toast({
  //       type: 'success',
  //       message: 'Post added',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       type: 'error',
  //       message: 'Please try again',
  //     });
  //   }
  // };

  // const cheer = async (postId: number, amount: number) => {
  //   try {
  //     await cheerOwner(postId, amount);
  //     await updatePosts();
  //     toast({
  //       type: 'success',
  //       message: 'Post cheered',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       type: 'error',
  //       message: 'Please try again',
  //     });
  //   }
  // };

  return (
    <div className="w-1/2 flex flex-col mx-auto">
      {posts.length > 0 &&
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            cheers={post.cheers}
            title={post.title}
            address={post.address}
            description={post.description}
            hash={post.hash}
            cheer={cheerOwner}
          />
        ))}
    </div>
  );
};

const Post = ({ address, title, description, cheers, hash, id, cheer }) => {
  var data = new Identicon(address, 200).toString();
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white mb-10">
      <div className="w-full h-80">
        <img
          src={`https://ipfs.infura.io/ipfs/${hash}`}
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
          <button
            className="btn !rounded-2xl bg-blue-800 text-white hover:bg-[#004c81e6]"
            onClick={() => cheer()}
            // onClick={() => cheer(id, 1)}
          >
            Cheer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
