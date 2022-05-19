import Post from './post';

const Posts = ({ posts, account, contract }) => {
  return (
    <div className="w-1/2 flex flex-col mx-auto">
      {posts?.length > 0 &&
        posts.map((post, index) => (
          <Post key={index} post={post} account={account} contract={contract} />
        ))}
    </div>
  );
};

export default Posts;
