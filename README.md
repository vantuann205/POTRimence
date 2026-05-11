# POTRimence 🔗

**Next.js + React blockchain explorer & DApp platform for the [Portaldot](https://portaldot-dev.readthedocs.io/en/latest) network.**

Portaldot is a Layer-0 public chain built on Substrate with 10,000+ TPS, ZKP privacy, and AI-driven smart contracts.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 14** (App Router) |
| UI | **React 18** + CSS Modules |
| Blockchain | **@polkadot/api** (WebSocket) |
| Wallet | **@polkadot/extension-dapp** |
| State | **Zustand** |
| Data Fetching | **React Query (@tanstack)** |
| Language | **TypeScript** |

---

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (fonts, providers, navbar)
│   ├── page.tsx              # Homepage (dashboard)
│   ├── globals.css           # Global design system (CSS variables, components)
│   │
│   ├── explorer/             # Block explorer
│   │   ├── page.tsx
│   │   ├── blocks/
│   │   └── block/[number]/
│   │
│   ├── accounts/             # Account viewer
│   │   ├── page.tsx
│   │   └── [address]/
│   │       ├── page.tsx
│   │       └── AccountPageClient.tsx
│   │
│   ├── staking/              # Staking (LAO NPoS)
│   │   └── page.tsx
│   │
│   ├── contracts/            # ink! contracts
│   │   └── page.tsx
│   │
│   ├── transfer/             # POT transfer
│   │   └── page.tsx
│   │
│   └── api/                  # REST API routes (server-side proxies)
│       ├── balance/[address]/route.ts
│       ├── chain/stats/route.ts
│       ├── blocks/[blockId]/route.ts
│       └── staking/info/route.ts
│
├── components/               # Reusable React components
│   ├── providers/
│   │   ├── Providers.tsx     # Root providers (RQ + theme + blockchain)
│   │   └── BlockchainProvider.tsx  # WS connection + block subscription
│   ├── layout/
│   │   ├── Navbar.tsx        # Sticky navbar with chain status
│   │   ├── Navbar.module.css
│   │   └── Footer.tsx
│   └── home/
│       ├── HeroSection.tsx
│       ├── HeroSection.module.css
│       ├── ChainStatsSection.tsx
│       ├── RecentBlocksSection.tsx
│       └── QuickSearchSection.tsx
│
├── config/
│   └── chain.ts              # Chain constants, SS58, token decimals, helpers
│
├── lib/
│   ├── api/
│   │   ├── client.ts         # Singleton ApiPromise (Polkadot.js)
│   │   ├── balance.ts        # balances module queries
│   │   ├── chain.ts          # system/chain/RPC queries
│   │   ├── staking.ts        # staking module queries
│   │   └── contracts.ts      # ink! contract interactions
│   └── wallet/
│       └── extension.ts      # Polkadot{.js} extension integration
│
├── hooks/                    # React Query hooks
│   ├── index.ts
│   ├── useBalance.ts
│   ├── useChain.ts
│   ├── useStaking.ts
│   └── useBlocks.ts
│
├── store/
│   └── blockchainStore.ts    # Zustand global state
│
├── types/
│   └── blockchain.ts         # TypeScript type definitions
│
└── utils/
    └── format.ts             # Utility functions (format, shorten, etc.)
```

---

## Chain Info

| Key | Value |
|-----|-------|
| **WebSocket** | `wss://mainnet.portaldot.io` |
| **SS58 Format** | `42` |
| **Token** | `POT` |
| **Decimals** | `14` |
| **Consensus** | LAO NPoS |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env.local
# Edit .env.local if needed — defaults point to mainnet
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm start
```

---

## API Reference

### REST Endpoints (Next.js API Routes)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/chain/stats` | Chain stats (block height, peers, runtime) |
| `GET` | `/api/balance/:address` | Account balance for SS58 address |
| `GET` | `/api/blocks/:blockId` | Block by number or hash |
| `GET` | `/api/staking/info` | Staking era and bond info |

---

## Key Modules (Portaldot Substrate)

| Module | Description |
|--------|-------------|
| `balances` | Free/reserved balances, transfers |
| `staking` | LAO NPoS validator/nominator management |
| `system` | Account info, events |
| `contracts` | ink! smart contract deploy & call |
| `assets` | Custom fungible assets |
| `identity` | On-chain identity registry |
| `multisig` | Multi-signature accounts |
| `proxy` | Proxy accounts |
| `treasury` | On-chain treasury |
| `bounties` | Bounty proposals |
| `vesting` | Token vesting schedules |

---

## 📖 Resources

- [Portaldot Developer Docs](https://portaldot-dev.readthedocs.io/en/latest)
- [Chain Info](https://portaldot-dev.readthedocs.io/en/latest/chain-info.html)
- [Module Interface](https://portaldot-dev.readthedocs.io/en/latest/module-interface/index.html)
- [Polkadot.js Docs](https://polkadot.js.org/docs/)

---

## 📄 License

MIT © POTRimence Team
