declare let window: any;
import { useWeb3React } from '@web3-react/core';
import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import PostContract from '../abis/PostContract.json';
import SocialContract from '../abis/Social.json';
import UserContract from '../abis/User.json';
interface DataContextProps {
  account: string;
  contract: any;
  loading: boolean;
  posts: any[];
  postCount: number;
  addPost: () => Promise<void>;
  updatePosts: () => Promise<void>;
  cheerOwner: (id: string, tipAmout: any) => Promise<void>;
  addUser: (id: string, tipAmout: any) => Promise<void>;
  updateUser: (id: string, tipAmout: any) => Promise<void>;
}

const DataContext = createContext<DataContextProps | null>(null);

export const DataProvider: React.FC = ({ children }) => {
  const data = useProviderData();

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext<DataContextProps>(DataContext);

export const useProviderData = () => {
  const { account: currentAccount } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [account, setAccount] = useState('0x0');
  const [contract, setContract] = useState({
    post: null,
    social: null,
    user: null,
  });

  useEffect(() => {
    initialize();
    loadData();
  }, []);

  const initialize = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Eth browser detected. Please consider using MetaMask.');
    }
  };

  const loadData = async () => {
    const web3 = window.web3;
    setAccount(currentAccount);

    try {
      const networkId = await web3.eth.net.getId();
      const postData = PostContract.networks[networkId];
      const userData = UserContract.networks[networkId];
      const socialData = SocialContract.networks[networkId];

      if (!postData || !userData || !socialData) {
        window.alert('Please connect to testnet');
        return;
      }

      if (postData) {
        const postContract = new web3.eth.Contract(
          PostContract.abi,
          postData.address
        );
        setContract((prev) => {
          return { ...prev, post: postContract };
        });

        let count = await postContract.methods.postId().call();
        setPostCount(count);

        let postList = [];
        for (let i = 1; i <= count; i++) {
          const image = await postContract.methods.getPost(i).call();
          postList.push(image);
        }
        postList.reverse();
        setPosts(postList);
      }

      if (userData) {
        const userContract = new web3.eth.Contract(
          UserContract.abi,
          userData.address
        );
        setContract((prev) => {
          return { ...prev, user: userContract };
        });
      }

      if (socialData) {
        const socialContract = new web3.eth.Contract(
          SocialContract.abi,
          socialData.address
        );
        setContract((prev) => {
          return { ...prev, user: socialContract };
        });
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const addPost = async (
    ownerId: string,
    digest: any,
    hash: any,
    size: any
  ) => {
    setLoading(true);
    let postId = -1;
    if (contract.post !== undefined) {
      try {
        postId = await contract.post.methods
          .addPost(ownerId, digest, hash, size)
          .call();
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    return postId;
  };

  const updatePosts = async () => {
    setLoading(true);
    if (contract.post !== undefined) {
      try {
        const count = await contract.post.methods.postId().call();
        setPostCount(count);

        const postList = [];

        for (let i = 1; i <= count; i++) {
          const image = await contract.post.methods.getPost(i).call();
          postList.push(image);
        }
        postList.reverse();
        setPosts(postList);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const addUser = async (name: string, wallet: string) => {
    let userId = -1;
    setLoading(true);

    try {
      userId = await contract.user.methods.createUser(name, wallet);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    return userId;
  };

  const updateUser = async (name: string, wallet: string) => {
    setLoading(true);
    try {
      let res = await contract.user.methods.updateUser(name, wallet);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const cheerOwner = async (id: string, amount: string) => {
    setLoading(true);
    try {
      let res = await contract.post.methods
        .cheerCreator(id)
        .send({ from: account, value: amount });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return {
    account,
    contract,
    loading,
    posts,
    postCount,
    addPost,
    updatePosts,
    cheerOwner,
    addUser,
    updateUser,
  };
};
