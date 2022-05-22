export const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
    ],
    name: 'Cheered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'ownerId',
        type: 'uint256',
      },
      { indexed: true, internalType: 'string', name: 'level', type: 'string' },
    ],
    name: 'LevelCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'ownerId',
        type: 'uint256',
      },
      { indexed: true, internalType: 'string', name: 'level', type: 'string' },
    ],
    name: 'LevelUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'postId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'ownerId',
        type: 'uint256',
      },
    ],
    name: 'PostCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: true, internalType: 'string', name: 'name', type: 'string' },
      {
        indexed: true,
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'UserCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: true, internalType: 'string', name: 'name', type: 'string' },
      {
        indexed: true,
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'UserUpdated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_ownerId', type: 'uint256' },
      { internalType: 'string', name: '_level', type: 'string' },
      { internalType: 'string', name: '_ipfsHash', type: 'string' },
    ],
    name: 'addLevel',
    outputs: [{ internalType: 'bool', name: 'status', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_postOwnerId', type: 'uint256' },
      { internalType: 'string', name: '_level', type: 'string' },
      { internalType: 'string', name: '_hash', type: 'string' },
    ],
    name: 'addPost',
    outputs: [{ internalType: 'uint256', name: '_postId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_postId', type: 'uint256' }],
    name: 'cheerCreator',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '_name', type: 'string' }],
    name: 'createUser',
    outputs: [{ internalType: 'uint256', name: '_userId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_postId', type: 'uint256' }],
    name: 'getCheeredAmount',
    outputs: [
      { internalType: 'uint256', name: '_cheeredAmount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_ownerId', type: 'uint256' },
      { internalType: 'string', name: '_level', type: 'string' },
    ],
    name: 'getLevel',
    outputs: [{ internalType: 'string', name: '_ipfsHash', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_postId', type: 'uint256' }],
    name: 'getPost',
    outputs: [
      { internalType: 'string', name: 'ipfsHash', type: 'string' },
      { internalType: 'address', name: 'owner', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_ownerId', type: 'uint256' },
      { internalType: 'uint256', name: '_userId', type: 'uint256' },
      { internalType: 'string', name: '_level', type: 'string' },
    ],
    name: 'getPostsForUser',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256[]', name: '_ownerIds', type: 'uint256[]' },
    ],
    name: 'getPublicPosts',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_wallet', type: 'address' }],
    name: 'getUser',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'address', name: 'wallet', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getUserCheeredCreators',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_ownerId', type: 'uint256' },
      { internalType: 'uint256', name: '_userId', type: 'uint256' },
      { internalType: 'string', name: '_level', type: 'string' },
    ],
    name: 'isSubscribed',
    outputs: [{ internalType: 'bool', name: 'subscribed', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'postId',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_ownerId', type: 'uint256' },
      { internalType: 'uint256', name: '_userId', type: 'uint256' },
      { internalType: 'string', name: '_level', type: 'string' },
    ],
    name: 'subscribe',
    outputs: [{ internalType: 'bool', name: 'subscribed', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_ownerId', type: 'uint256' },
      { internalType: 'string', name: '_level', type: 'string' },
      { internalType: 'string', name: '_ipfsHash', type: 'string' },
    ],
    name: 'updateLevel',
    outputs: [{ internalType: 'bool', name: 'updatePerformed', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'address', name: '_wallet', type: 'address' },
    ],
    name: 'updateUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'userId',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
