import bs58 from 'bs58';

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
