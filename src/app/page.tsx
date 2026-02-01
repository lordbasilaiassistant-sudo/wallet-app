'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { WalletDashboard } from '@/components/WalletDashboard';
import { BridgePanel } from '@/components/BridgePanel';
import { NetworkStatus } from '@/components/NetworkStatus';
import { TransactionHistory } from '@/components/TransactionHistory';
import { thryx } from '@/lib/wagmi';

export default function Home() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  return (
    <main className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-black/50 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm">
              <a href="https://crispy-goggles-v6jg77gvqwqv3pxpg-5100.app.github.dev" target="_blank" className="text-purple-300/70 hover:text-purple-300 transition">Explorer</a>
              <a href="https://mysocial-thryx.vercel.app" target="_blank" className="text-purple-300/70 hover:text-purple-300 transition">MySocial</a>
              <span className="text-purple-400 font-medium">Wallet & Bridge</span>
              <a href="https://github.com/lordbasilaiassistant-sudo/thryx-chain" target="_blank" className="text-purple-300/70 hover:text-purple-300 transition">GitHub</a>
              <a href="https://www.npmjs.com/package/@thryx/sdk" target="_blank" className="text-purple-300/70 hover:text-purple-300 transition">SDK</a>
            </div>
            <div className="text-xs text-purple-400/60">
              Alpha v0.1
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="border-b border-thryx-border bg-thryx-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-thryx-primary to-thryx-secondary rounded-xl flex items-center justify-center font-bold text-xl">
              T
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">THRYX</h1>
              <p className="text-xs text-gray-500">AI-Native Blockchain</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <NetworkStatus />
            <ConnectButton 
              showBalance={false}
              chainStatus="icon"
              accountStatus="avatar"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!isConnected ? (
          // Not connected state
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-thryx-primary to-thryx-secondary rounded-2xl flex items-center justify-center text-4xl font-bold mb-8 pulse-glow">
              T
            </div>
            <h2 className="text-4xl font-bold mb-4 gradient-text">Welcome to THRYX</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Connect your wallet to manage your assets on the AI-native blockchain
            </p>
            <ConnectButton />
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
              <FeatureCard 
                icon="⚡" 
                title="AI-Powered" 
                description="19+ autonomous agents managing the network 24/7"
              />
              <FeatureCard 
                icon="🔗" 
                title="Bridge to Base" 
                description="Seamlessly move assets between Base and THRYX"
              />
              <FeatureCard 
                icon="🛡️" 
                title="Secure" 
                description="Multi-layer security with real-time monitoring"
              />
            </div>
          </div>
        ) : (
          // Connected state
          <div className="space-y-8">
            {/* Network info - show current chain */}
            {chainId !== thryx.id && chainId !== 8453 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-semibold text-yellow-400">Unsupported Network</p>
                    <p className="text-sm text-gray-400">Switch to THRYX or Base</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => switchChain?.({ chainId: thryx.id })}
                    className="btn-primary"
                  >
                    THRYX
                  </button>
                  <button 
                    onClick={() => switchChain?.({ chainId: 8453 })}
                    className="btn-secondary"
                  >
                    Base
                  </button>
                </div>
              </div>
            )}

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Wallet */}
              <div className="lg:col-span-2 space-y-6">
                <WalletDashboard />
                <TransactionHistory />
              </div>
              
              {/* Right Column - Bridge & Stats */}
              <div className="space-y-6">
                <BridgePanel />
                <AgentStatusPanel />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-thryx-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left mb-8">
            <div>
              <h4 className="text-purple-400 font-semibold mb-3">THRYX Ecosystem</h4>
              <div className="space-y-2 text-sm">
                <a href="https://mysocial-thryx.vercel.app" target="_blank" className="block text-gray-500 hover:text-gray-300 transition">MySocial - Creator Coins</a>
                <span className="block text-gray-400">Wallet & Bridge (You are here)</span>
                <a href="https://crispy-goggles-v6jg77gvqwqv3pxpg-5100.app.github.dev" target="_blank" className="block text-gray-500 hover:text-gray-300 transition">Block Explorer</a>
              </div>
            </div>
            <div>
              <h4 className="text-purple-400 font-semibold mb-3">Developers</h4>
              <div className="space-y-2 text-sm">
                <a href="https://github.com/lordbasilaiassistant-sudo/thryx-chain" target="_blank" className="block text-gray-500 hover:text-gray-300 transition">GitHub</a>
                <a href="https://www.npmjs.com/package/@thryx/sdk" target="_blank" className="block text-gray-500 hover:text-gray-300 transition">@thryx/sdk</a>
                <a href="https://github.com/lordbasilaiassistant-sudo/thryx-chain#readme" target="_blank" className="block text-gray-500 hover:text-gray-300 transition">Documentation</a>
              </div>
            </div>
            <div>
              <h4 className="text-purple-400 font-semibold mb-3">Network</h4>
              <div className="space-y-2 text-sm text-gray-500">
                <p>Chain ID: 77777</p>
                <p>Bridge: Base ↔ THRYX</p>
                <p className="text-purple-400">Alpha v0.1</p>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-600 text-sm">
            <p>THRYX - The AI-Native Blockchain</p>
            <p className="mt-1">Built by autonomous AI agents for humans and machines</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="card text-center hover:border-thryx-primary transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function AgentStatusPanel() {
  const agents = [
    { name: 'Oracle', status: 'active', txCount: 156 },
    { name: 'Arbitrage', status: 'active', txCount: 89 },
    { name: 'Liquidity', status: 'active', txCount: 45 },
    { name: 'Security', status: 'active', txCount: 234 },
    { name: 'Monitor', status: 'active', txCount: 567 },
    { name: 'Bridge', status: 'active', txCount: 12 },
  ];

  return (
    <div className="card">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <span className="text-xl">🤖</span>
        AI Agents
      </h3>
      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.name} className="flex items-center justify-between py-2 border-b border-thryx-border last:border-0">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-sm">{agent.name}</span>
            </div>
            <span className="text-xs text-gray-500">{agent.txCount} txs</span>
          </div>
        ))}
      </div>
    </div>
  );
}
