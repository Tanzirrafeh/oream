import { createPublicClient, http, defineChain } from 'viem';

// Arc Testnet Chain Definition according to Arc Docs
export const arcTestnet = defineChain({
  id: 50401,
  name: 'Arc Testnet',
  nativeCurrency: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.arc.io'],
    },
    public: {
      http: ['https://rpc.testnet.arc.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'ArcScan',
      url: 'https://testnet.arcscan.app',
    },
  },
  contracts: {
    usdc: {
      address: '0x3600000000000000000000000000000000000000',
    },
    oream: {
      address: '0x8888888888888888888888888888888888888888',
    },
  },
});

export const publicClient = createPublicClient({
  chain: arcTestnet,
  transport: http(),
});

export const ARC_CONTRACT_ADDRESSES = {
  usdc: '0x3600000000000000000000000000000000000000',
  cctpTokenMessenger: '0x9900000000000000000000000000000000000001',
  oreamVault: '0x8888888888888888888888888888888888888888',
};
