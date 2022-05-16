declare let window: any;
import { createContext, useContext, useEffect, useState } from 'react';
import { CIDString, Web3Storage } from 'web3.storage';
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
  addPost: (ownerId: number, hash: string) => Promise<number>;
  updatePosts: () => Promise<void>;
  getPost: (id: number) => Promise<void>;
  cheerOwner: (id: number, amount: number) => Promise<void>;
  addUser: (name: string, wallet: string) => Promise<number>;
  updateUser: (name: string, wallet: string) => Promise<void>;
  getUser: (wallet: string) => Promise<number>;
  addLevel: (ownerId: number, level: string, hash: string) => Promise<boolean>;
  updateLevel: (
    ownerId: number,
    level: string,
    hash: string
  ) => Promise<boolean>;
  getLevel: (ownerId: number, level: string) => Promise<any>;
  subscribe: (
    ownerId: number,
    userId: number,
    level: string
  ) => Promise<boolean>;
  storePost: (
    img: File,
    title: string,
    description: string,
    owner: string
  ) => Promise<{
    cid: CIDString;
    metadataGatewayURL: string;
    imageGatewayURL: string;
    imageURI: string;
    metadataURI: string;
  }>;
  getPostMetadata: (hash: CIDString) => Promise<void>;
}

const DataContext = createContext<DataContextProps | null>(null);

export const DataProvider: React.FC = ({ children }) => {
  const data = useProviderData();

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext<DataContextProps>(DataContext);

export const useProviderData = () => {
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
    const allAccounts = await web3.eth.getAccounts();
    setAccount(allAccounts[0]);

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
          const post = await postContract.methods.getPost(i).call();
          postList.push(post);
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

  // PostContract
  const addPost = async (ownerId: number, hash: string) => {
    setLoading(true);
    let postId = -1;
    if (contract.post !== undefined) {
      console.log(contract);
      try {
        postId = await contract.post.methods
          .addPost(ownerId, hash)
          .send({ from: account, gasLimit: 100000 });
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
          const post = await contract.post.methods.getPost(i).call();
          if (post?.owner !== '0x0000000000000000000000000000000000000000')
            postList.push(post);
        }
        postList.reverse();
        setPosts(postList);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const getPost = async (id: number) => {
    setLoading(true);
    try {
      const post = await contract.post.methods.getPost(id).call();
      setLoading(false);
      return post;
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const cheerOwner = async (id: number, amount: number) => {
    setLoading(true);
    try {
      let res = await contract.post.methods
        .cheerCreator(id)
        .send({ from: account, value: amount, gasLimit: 100000 });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // UserContract
  const addUser = async (name: string, wallet: string) => {
    let userId = -1;
    setLoading(true);

    try {
      console.log(contract);
      userId = await contract.user.methods
        .createUser(name, wallet)
        .send({ from: account, gasLimit: 100000 });
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

  const getUser = async (wallet: string) => {
    let userId = -1;
    setLoading(true);

    if (contract.user) {
      console.log('getUser'), contract.user;
      try {
        userId = await contract.user.methods.getUser(wallet).call();
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
    return userId;
  };

  // SocialContract
  const addLevel = async (ownerId: number, level: string, hash: string) => {
    let status = false;
    setLoading(true);

    try {
      status = await contract.social.methods.addLevel(ownerId, level, hash);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    return status;
  };

  const updateLevel = async (ownerId: number, level: string, hash: string) => {
    let status = false;
    setLoading(true);

    try {
      status = await contract.social.methods.updateLevel(ownerId, level, hash);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    return status;
  };

  const getLevel = async (ownerId: number, level: string) => {
    let _level: any;
    setLoading(true);
    try {
      _level = await contract.social.methods.getLevel(ownerId, level);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    return _level;
  };

  const subscribe = async (ownerId: number, userId: number, level: string) => {
    let status = false;
    setLoading(true);
    try {
      status = await contract.social.methods.subscribe(ownerId, userId, level);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    return status;
  };

  const storePost = async (
    img: File,
    title: string,
    description: string,
    owner: string
  ) => {
    // The name for our upload includes a prefix we can use to identify our files later
    const uploadName = ['POST', title].join('|');

    // We store some metadata about the image alongside the image file.
    // The metadata includes the file path, which we can use to generate
    // a URL to the full image.
    const obj = {
      path: img.name,
      title,
      description,
      owner,
    };
    const metadataFile = new File([JSON.stringify(obj)], 'metadata.json');

    const token = process.env.NEXT_PUBLIC_POPPER_STORAGE;

    const web3storage = new Web3Storage({ token });

    const cid = await web3storage.put([img, metadataFile], {
      name: uploadName,
    });

    const metadataGatewayURL = `https://${cid}.ipfs.dweb.link/${encodeURIComponent(
      'metadata.json'
    )}`;
    const imageGatewayURL = `https://${cid}.ipfs.dweb.link/${encodeURIComponent(
      img.name
    )}`;
    const imageURI = `ipfs://${cid}/${img.name}`;
    const metadataURI = `ipfs://${cid}/metadata.json`;
    return { cid, metadataGatewayURL, imageGatewayURL, imageURI, metadataURI };
  };

  const getPostMetadata = async (cid: CIDString) => {
    const url = `https://${cid}.ipfs.dweb.link/${encodeURIComponent(
      'metadata.json'
    )}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `error fetching post metadata: [${res.status}] ${res.statusText}`
      );
    }
    const metadata = await res.json();
    const gatewayURL = `https://${cid}.ipfs.dweb.link/${encodeURIComponent(
      metadata.path
    )}`;
    const uri = `ipfs://${cid}/${metadata.path}`;
    return { ...metadata, cid, gatewayURL, uri };
  };

  return {
    account,
    contract,
    loading,
    posts,
    postCount,
    addPost,
    updatePosts,
    getPost,
    cheerOwner,
    addUser,
    updateUser,
    getUser,
    addLevel,
    updateLevel,
    getLevel,
    subscribe,
    storePost,
    getPostMetadata,
  };
};
