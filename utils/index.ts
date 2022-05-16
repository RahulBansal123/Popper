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

export function decodeMultihash(multihash: string) {
  const base16Multihash = bs58.decode(multihash);
  return {
    digest: `0x${base16Multihash.slice(2).toString('hex')}`,
    hashFn: parseInt(base16Multihash[0] as unknown as string),
    size: parseInt(base16Multihash[1] as unknown as string),
  };
}

export function encodeMultihash(multihashDigest: string) {
  // the 1220 is from reconstructing the hashFn and size with digest, the opposite of decodeMultihash
  // since IPFS CIDv0 has a fixed hashFn and size, the first two values are always 12 and 20
  // concat them together with digest and encode back to base58
  const digestStr = `1220${multihashDigest.replace('0x', '')}`;
  // convert digestStr from hex to base 58
  return bs58.encode(Buffer.from(digestStr, 'hex'));
}

export async function storePost(
  img: File,
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
