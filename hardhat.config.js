require("@matterlabs/hardhat-zksync-solc");
require("@nomicfoundation/hardhat-ignition-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
/* trunk-ignore(trufflehog/Alchemy) */
// If not set, it uses ours Alchemy's default URL from https://github.com/scaffold-eth/se-2-challenges/blob/base-challenge-template/packages/hardhat/hardhat.config.ts
// You can get your own at https://dashboard.alchemyapi.io
const nodeProviderUrl = process.env.NODE_PROVIDER_URL || "https://eth-sepolia.g.alchemy.com/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF"
// If not set, it uses the hardhat account 0 private key. Help to deposit fund to 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 if your want reuse it
const deployerPrivateKey =
  process.env.DEPLOYER_PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      chainId: 280,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
    sepolia: {
      url: nodeProviderUrl,
      accounts: [deployerPrivateKey],
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
