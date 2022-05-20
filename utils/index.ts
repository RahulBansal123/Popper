import bs58 from 'bs58';
import { CIDString, Web3Storage } from 'web3.storage';

export function getWalletIcon(wallet: string) {
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

export async function storePost(
  img: File,
  name: string,
  title: string,
  description: string,
  owner: string
) {
  // The name for our upload includes a prefix we can use to identify our files later
  const uploadName = ['POST', title].join('|');

  // We store some metadata about the image alongside the image file.
  // The metadata includes the file path, which we can use to generate
  // a URL to the full image.
  const obj = {
    path: img.name,
    name,
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

  return { cid };
}

export async function getPostMetadata(cid: CIDString) {
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
}

export async function storeLevel(
  name: string,
  title: string,
  description: string,
  owner: string,
  features: string[]
) {
  // The name for our upload includes a prefix we can use to identify our files later
  const uploadName = ['LEVEL', title].join('|');

  const obj = {
    name,
    title,
    description,
    owner,
    features,
  };

  const metadataFile = new File([JSON.stringify(obj)], 'metadata.json');

  const token = process.env.NEXT_PUBLIC_POPPER_STORAGE;

  const web3storage = new Web3Storage({ token });

  const cid = await web3storage.put([metadataFile], {
    name: uploadName,
  });

  return { cid };
}

export async function getLevelMetadata(cid: CIDString) {
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
  return { ...metadata };
}
