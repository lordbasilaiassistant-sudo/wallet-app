import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { defineChain } from 'viem';

// Define THRYX Mainnet chain
export const thryx = defineChain({
  id: 77777,
  name: 'THRYX Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'THRYX ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_THRYX_RPC || 'http://localhost:8545'],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_THRYX_RPC || 'http://localhost:8545'],
    },
  },
  blockExplorers: {
    default: { 
      name: 'THRYX Explorer', 
      url: process.env.NEXT_PUBLIC_THRYX_EXPLORER || 'http://localhost:5100' 
    },
  },
});

export const config = getDefaultConfig({
  appName: 'THRYX Wallet',
  projectId: 'c691d01c72b0b3e656af1fabd9ed0304',
  chains: [thryx, base],
  transports: {
    [thryx.id]: http(process.env.NEXT_PUBLIC_THRYX_RPC || 'http://localhost:8545'),
    [base.id]: http('https://mainnet.base.org'),
  },
  ssr: true,
});

// Contract addresses (Chain ID: 77777)
export const CONTRACTS = {
  USDC: process.env.NEXT_PUBLIC_USDC_ADDRESS || '0x5f3f1dBD7B74C6B46e8c44f98792A1dAf8d69154',
  WETH: process.env.NEXT_PUBLIC_WETH_ADDRESS || '0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575',
  AMM: process.env.NEXT_PUBLIC_AMM_ADDRESS || '0x2bdCC0de6bE1f7D2ee689a0342D76F52E8EFABa3',
  BridgeBonus: process.env.NEXT_PUBLIC_BRIDGE_BONUS || '0xFD471836031dc5108809D173A067e8486B9047A3',
};

// Bridge wallet address on Base (trim to remove any accidental whitespace)
export const BRIDGE_WALLET = (process.env.NEXT_PUBLIC_BRIDGE_WALLET || '0x338304e35841d2Fa6849EF855f6beBD8988C65B8').trim();
