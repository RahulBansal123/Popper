import { getAddress } from '@ethersproject/address';

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

const ETHERSCAN_PREFIXES = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.',
};

export function getEtherscanLink(chainId, data, type) {
  const prefix = `https://${
    ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]
  }etherscan.io`;

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export function getWalletIcon(wallet) {
  switch (wallet) {
    case 'metamask':
      return '/assets/images/metamask.png';
    case 'walletconnect':
      return '/assets/images/walletConnectIcon.svg';
    case 'walletlink':
      return '/assets/images/coinbaseWalletIcon.svg';
    case 'coinbaselink':
      return '/assets/images/coinbaseWalletIcon.svg';
    case 'fortmatic':
      return '/assets/images/fortmaticIcon.png';
    case 'portis':
      return '/assets/images/portisIcon.png';
    case 'injected':
    default:
      return '/assets/images/arrow-right.svg';
  }
}
